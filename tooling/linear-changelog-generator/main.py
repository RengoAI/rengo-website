#!/usr/bin/env python3
"""
Linear Changelog Generator

Fetches completed Linear issues and generates changelog entries using AI.
"""

import math
import os
import re
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

import click
from anthropic import AsyncAnthropic
from dotenv import load_dotenv
from linear_python import LinearClient
from pydantic import BaseModel
from pydantic_ai import Agent
from pydantic_ai.models.anthropic import AnthropicModel
from pydantic_ai.providers.anthropic import AnthropicProvider
from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.table import Table
from slugify import slugify

# Load environment variables
load_dotenv()

console = Console()


class ChangelogSection(BaseModel):
    """A section within a changelog entry."""

    id: str
    title: str
    content: list[str]


class ChangelogEntry(BaseModel):
    """Represents a changelog entry."""

    id: str
    title: str
    date: dict[str, str]  # {day, month, year}
    type: str  # "Release", "Improvement", or "Fix"
    tags: list[str]
    read_time: str
    sections: list[ChangelogSection]


class LinearIssue(BaseModel):
    """Simplified Linear issue representation."""

    id: str
    identifier: str
    title: str
    description: str | None
    state: str
    labels: list[str]
    completed_at: datetime | None
    url: str


class ChangelogGenerator:
    """Generates changelog entries from Linear issues using AI."""

    def __init__(self, linear_api_key: str, anthropic_api_key: str):
        self.linear = LinearClient(linear_api_key)
        # Initialize the Pydantic AI agent with Anthropic
        self.ai_model = AnthropicModel(
            provider=AnthropicProvider(
                anthropic_client=AsyncAnthropic(api_key=anthropic_api_key),
            ),
            model_name="claude-3-5-haiku-latest",
        )

        self.agent = Agent(
            model=self.ai_model,
            output_type=ChangelogEntry,
            system_prompt="""You are a technical writer creating changelog entries for a software product.
            
            Given a Linear issue, generate a well-structured changelog entry that:
            1. Has a clear, user-friendly title
            2. Categorizes the change as "Release" (new features), "Improvement" (enhancements), or "Fix" (bug fixes)
            3. Includes relevant tags based on the issue labels and content
            4. Creates meaningful sections that explain the change to users
            5. Estimates reading time based on content length (approximately 200 words per minute)
            
            The sections should typically include:
            - "What's new?" or "What's improved?" or "What's fixed?" - Main description
            - "Key Features" or "Key Changes" - Bullet points of specific changes
            - "Feedback" - Encouraging users to provide feedback
            
            Write in a professional but friendly tone, focusing on the value to users.
            Generate content that is informative and helps users understand the impact of changes.
            """,
        )

    def fetch_completed_issues(self, days_back: int = 7) -> list[LinearIssue]:
        """Fetch Linear issues completed in the last X days."""
        console.print(
            f"[cyan]Fetching issues completed in the last {days_back} days...[/cyan]"
        )
        # GraphQL query to fetch completed issues
        query = """
        query GetCompletedIssues {
          issues(
            filter: {
              state: { name: { eq: "Done" } }
            }
            first: 50
          ) {
            nodes {
              id
              identifier
              title
              description
              state {
                name
              }
              completedAt
              url
            }
          }
        }
        """

        variables = {}

        # Make the GraphQL request
        response = self.linear._make_request(query, variables)
        print(f"GraphQL Response: {response}")

        # Filter issues created after the cutoff date
        date_threshold = datetime.now(timezone.utc) - timedelta(days=days_back)
        filtered_issues = [
            issue
            for issue in response["data"]["issues"]["nodes"]
            if datetime.fromisoformat(issue["completedAt"].replace("Z", "+00:00"))
            > date_threshold
        ]

        issues = []
        for issue_data in filtered_issues:
            # Parse completed_at date
            completed_at = None
            if issue_data.get("completedAt"):
                completed_at = datetime.fromisoformat(
                    issue_data["completedAt"].replace("Z", "+00:00")
                )

            issues.append(
                LinearIssue(
                    id=issue_data["id"],
                    identifier=issue_data["identifier"],
                    title=issue_data["title"],
                    description=issue_data.get("description"),
                    state=issue_data["state"]["name"]
                    if issue_data["state"]
                    else "Unknown",
                    labels=[],
                    completed_at=completed_at,
                    url=issue_data["url"],
                )
            )

        console.print(f"[green]Found {len(issues)} completed issues[/green]")
        return issues

    def generate_changelog_entry(self, issue: LinearIssue) -> ChangelogEntry | None:
        """Generate a changelog entry for a Linear issue using AI."""
        try:
            # Prepare the issue context
            issue_context = f"""
            Issue: {issue.identifier} - {issue.title}
            Description: {issue.description or "No description provided"}
            Labels: {", ".join(issue.labels) if issue.labels else "None"}
            State: {issue.state}
            Completed: {issue.completed_at.strftime("%Y-%m-%d") if issue.completed_at else "Unknown"}
            """

            # Generate the changelog entry using asyncio.run
            import asyncio

            result = asyncio.run(self.agent.run(issue_context))

            # Add the issue ID and adjust some fields
            entry = result.output
            entry.id = slugify(entry.title)

            # Ensure proper date format
            if issue.completed_at:
                entry.date = {
                    "day": str(issue.completed_at.day),
                    "month": issue.completed_at.strftime("%B"),
                    "year": str(issue.completed_at.year),
                }

            return entry

        except Exception as e:
            console.print(
                f"[red]Error generating changelog for {issue.identifier}: {e}[/red]"
            )
            return None

    def estimate_read_time(self, entry: ChangelogEntry) -> str:
        """Estimate reading time for a changelog entry."""
        total_words = 0

        # Count words in title
        total_words += len(entry.title.split())

        # Count words in all sections
        for section in entry.sections:
            total_words += len(section.title.split())
            for content in section.content:
                total_words += len(content.split())

        # Estimate reading time (200 words per minute)
        minutes = math.ceil(total_words / 200)
        return f"{minutes} minute read" if minutes == 1 else f"{minutes} minutes read"

    def generate_typescript_file(self, entry: ChangelogEntry, output_dir: Path) -> Path:
        """Generate a TypeScript file for the changelog entry."""
        # Create the year/month directory structure
        year_dir = output_dir / entry.date["year"]
        month_dir = year_dir / entry.date["month"]
        month_dir.mkdir(parents=True, exist_ok=True)

        # Generate the TypeScript content
        sections_content = []
        for section in entry.sections:
            content_array = ",\n        ".join(f'"{line}"' for line in section.content)
            sections_content.append(f"""    {{
      id: "{section.id}",
      title: "{section.title}",
      content: [
        {content_array}
      ],
    }}""")

        sections_str = ",\n".join(sections_content)

        tags_str = ", ".join(f'"{tag}"' for tag in entry.tags)

        # Update read time
        entry.read_time = self.estimate_read_time(entry)

        typescript_content = f'''import {{ ChangelogEntryData }} from "@/features/blog/changelog/types";

export const {self.to_pascal_case(entry.id)}: ChangelogEntryData = {{
  id: "{entry.id}",
  date: {{
    day: "{entry.date["day"]}",
    month: "{entry.date["month"]}",
    year: "{entry.date["year"]}",
  }},
  type: "{entry.type}",
  title: "{entry.title}",
  tags: [{tags_str}],
  readTime: "{entry.read_time}",
  sections: [
{sections_str}
  ],
}};
'''

        # Write the file
        file_path = month_dir / f"{entry.id}.tsx"
        file_path.write_text(typescript_content)

        return file_path

    def to_pascal_case(self, kebab_str: str) -> str:
        """Convert kebab-case to PascalCase."""
        return "".join(word.capitalize() for word in kebab_str.split("-"))

    def update_index_files(self, entries: list[ChangelogEntry], output_dir: Path):
        """Update the index files to include new entries."""
        # Group entries by year and month
        entries_by_date = {}
        for entry in entries:
            year = entry.date["year"]
            month = entry.date["month"]

            if year not in entries_by_date:
                entries_by_date[year] = {}
            if month not in entries_by_date[year]:
                entries_by_date[year][month] = []

            entries_by_date[year][month].append(entry)

        # Update month index files
        for year, months in entries_by_date.items():
            for month, month_entries in months.items():
                month_dir = output_dir / year / month
                index_path = month_dir / "index.tsx"

                # Read existing entries if file exists
                existing_entries = set()
                if index_path.exists():
                    content = index_path.read_text()
                    # Extract existing entry names
                    import_pattern = r'import \{ (\w+) \} from "\./([^"]+)"'
                    matches = re.findall(import_pattern, content)
                    existing_entries = {match[1] for match in matches}

                # Add new entries
                all_entries = list(existing_entries)
                for entry in month_entries:
                    if entry.id not in all_entries:
                        all_entries.append(entry.id)

                # Generate index content
                imports = []
                exports = []
                entry_names = []

                for entry_id in sorted(all_entries):
                    pascal_name = self.to_pascal_case(entry_id)
                    imports.append(
                        f'import {{ {pascal_name} }} from "@/features/blog/changelog/entries/{year}/{month}/{entry_id}";'
                    )
                    exports.append(f'export * from "./{entry_id}";')
                    entry_names.append(f"  {pascal_name},")

                index_content = f"""{"".join(f"{imp}\\n" for imp in imports)}import {{ ChangelogEntryData }} from "@/features/blog/changelog/types";

{"".join(f"{exp}\\n" for exp in exports)}
export const {month}: ChangelogEntryData[] = [
{"".join(f"{name}\\n" for name in entry_names)}];
"""

                index_path.write_text(index_content)

        # Update year index files
        for year in entries_by_date.keys():
            year_dir = output_dir / year
            index_path = year_dir / "index.tsx"

            # Get all months in the directory
            months = sorted([d.name for d in year_dir.iterdir() if d.is_dir()])

            # Generate year index content
            imports = [f'import {{ {month} }} from "./{month}";' for month in months]
            spreads = [f"...{month}" for month in months]

            year_content = f"""import {{ ChangelogEntryData }} from "@/features/blog/changelog/types";
{"".join(f"{imp}\\n" for imp in imports)}
export const ChangelogEntries{year}: ChangelogEntryData[] = [{", ".join(spreads)}];
"""

            index_path.write_text(year_content)

        # Update main index file
        main_index_path = output_dir / "index.tsx"

        # Get all years
        years = sorted(
            [d.name for d in output_dir.iterdir() if d.is_dir() and d.name.isdigit()]
        )

        if years:
            imports = [
                f'import {{ ChangelogEntries{year} }} from "./{year}";'
                for year in years
            ]
            spreads = [f"...ChangelogEntries{year}" for year in years]

            main_content = f"""import {{ ChangelogEntryData }} from "@/features/blog/changelog/types";
{"".join(f"{imp}\\n" for imp in imports)}
export const CHANGELOG_DATA: ChangelogEntryData[] = [{", ".join(spreads)}];
"""

            main_index_path.write_text(main_content)


@click.command()
@click.option(
    "--days",
    "-d",
    default=7,
    help="Number of days to look back for completed issues",
    type=int,
)
@click.option(
    "--output-dir",
    "-o",
    type=click.Path(path_type=Path),
    help="Output directory for changelog entries (defaults to frontend changelog entries)",
)
@click.option(
    "--dry-run",
    is_flag=True,
    help="Show what would be generated without creating files",
)
def main(days: int, output_dir: Path | None, dry_run: bool):
    """Generate changelog entries from Linear issues."""

    # Get API keys from environment
    linear_api_key = os.getenv("LINEAR_API_KEY")
    anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")

    if not linear_api_key:
        console.print("[red]Error: LINEAR_API_KEY not found in environment[/red]")
        console.print("Please set it in your .env file or environment variables")
        sys.exit(1)

    if not anthropic_api_key:
        console.print("[red]Error: ANTHROPIC_API_KEY not found in environment[/red]")
        console.print("Please set it in your .env file or environment variables")
        sys.exit(1)

    # Set default output directory
    if not output_dir:
        output_dir = (
            Path(__file__).parent.parent.parent
            / "frontend"
            / "src"
            / "features"
            / "blog"
            / "changelog"
            / "entries"
        )

    console.print("[bold]Linear Changelog Generator[/bold]")
    console.print(f"Looking back {days} days for completed issues")
    console.print(f"Output directory: {output_dir}")

    if dry_run:
        console.print("[yellow]DRY RUN MODE - No files will be created[/yellow]")

    # Initialize generator
    generator = ChangelogGenerator(linear_api_key, anthropic_api_key)

    # Fetch completed issues
    issues = generator.fetch_completed_issues(days)

    if not issues:
        console.print(
            "[yellow]No completed issues found in the specified timeframe[/yellow]"
        )
        return

    # Show issues table
    table = Table(title="Completed Issues")
    table.add_column("ID", style="cyan")
    table.add_column("Title", style="white")
    table.add_column("Labels", style="green")
    table.add_column("Completed", style="yellow")

    for issue in issues:
        table.add_row(
            issue.identifier,
            issue.title[:50] + "..." if len(issue.title) > 50 else issue.title,
            ", ".join(issue.labels[:3]) if issue.labels else "None",
            issue.completed_at.strftime("%Y-%m-%d")
            if issue.completed_at
            else "Unknown",
        )

    console.print(table)

    # Generate changelog entries
    entries = []

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console,
    ) as progress:
        task = progress.add_task("Generating changelog entries...", total=len(issues))

        for issue in issues:
            progress.update(task, description=f"Processing {issue.identifier}...")

            entry = generator.generate_changelog_entry(issue)
            if entry:
                entries.append(entry)

                if not dry_run:
                    # Generate the TypeScript file
                    file_path = generator.generate_typescript_file(entry, output_dir)
                    console.print(
                        f"[green]✓[/green] Created {file_path.relative_to(output_dir.parent.parent.parent.parent.parent)}"
                    )
                else:
                    console.print(
                        f"[yellow]Would create:[/yellow] {entry.date['year']}/{entry.date['month']}/{entry.id}.tsx"
                    )

            progress.advance(task)

    if entries and not dry_run:
        # Update index files
        console.print("\n[cyan]Updating index files...[/cyan]")
        generator.update_index_files(entries, output_dir)
        console.print("[green]✓[/green] Index files updated")

    console.print(
        f"\n[bold green]Successfully generated {len(entries)} changelog entries![/bold green]"
    )


if __name__ == "__main__":
    main()
