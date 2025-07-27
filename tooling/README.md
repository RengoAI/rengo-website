# Linear Changelog Generator

This tool automatically generates changelog entries from completed Linear issues using AI (Anthropic Claude).

## Features

- Fetches completed Linear issues from the last X days
- Uses AI to analyze issues and generate well-structured changelog entries
- Automatically categorizes changes as Release, Improvement, or Fix
- Generates TypeScript files in the exact format used by the website
- Updates all necessary index files automatically
- Supports dry-run mode to preview without creating files

## Setup

### 1. Install Dependencies

From the `tooling/linear-changelog-generator` directory:

```bash
uv sync
```

### 2. Configure Environment Variables

Create a `.env` file in the `tooling/linear-changelog-generator` directory:

```env
# Linear API Key - Get from https://linear.app/settings/api
LINEAR_API_KEY=your_linear_api_key_here

# Anthropic API Key - Get from https://console.anthropic.com/
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Linear Team ID (optional - will use default team if not provided)
LINEAR_TEAM_ID=your_team_id_here
```

## Usage

### Basic Usage

Generate changelog entries for issues completed in the last 7 days:

```bash
uv run python main.py
```

### Options

- `--days, -d`: Number of days to look back for completed issues (default: 7)
- `--output-dir, -o`: Custom output directory (defaults to frontend changelog entries)
- `--dry-run`: Preview what would be generated without creating files

### Examples

```bash
# Look back 14 days
uv run python main.py --days 14

# Dry run to preview without creating files
uv run python main.py --dry-run

# Custom output directory
uv run python main.py --output-dir /path/to/custom/directory
```

## How It Works

1. **Fetch Issues**: The tool connects to Linear API and fetches all issues that were moved to "Done", "Completed", or "Shipped" states within the specified timeframe.

2. **AI Analysis**: Each issue is analyzed by Claude AI to:

   - Generate a user-friendly title
   - Categorize the change type
   - Extract relevant tags from labels
   - Create meaningful sections explaining the change
   - Estimate reading time

3. **File Generation**: For each issue, the tool:

   - Creates a TypeScript file in the appropriate year/month directory
   - Formats the entry to match the existing changelog structure
   - Uses kebab-case filenames derived from the title

4. **Index Updates**: The tool automatically updates:
   - Month index files to include new entries
   - Year index files to aggregate months
   - Main index file to include all years

## Generated File Structure

```
frontend/src/features/blog/changelog/entries/
├── index.tsx                    # Main index aggregating all years
├── 2025/
│   ├── index.tsx               # Year index aggregating all months
│   ├── January/
│   │   ├── index.tsx           # Month index listing all entries
│   │   ├── new-feature-x.tsx   # Individual changelog entry
│   │   └── bug-fix-y.tsx      # Individual changelog entry
│   └── February/
│       └── ...
└── 2024/
    └── ...
```

## Entry Format

Each generated entry follows this structure:

```typescript
export const EntryName: ChangelogEntryData = {
  id: "entry-id",
  date: {
    day: "15",
    month: "January",
    year: "2025",
  },
  type: "Release", // or "Improvement" or "Fix"
  title: "Entry Title",
  tags: ["Tag1", "Tag2"],
  readTime: "2 minute read",
  sections: [
    {
      id: "whats-new",
      title: "What's new?",
      content: ["Paragraph 1", "Paragraph 2"],
    },
    // ... more sections
  ],
};
```

## AI Behavior

The AI is configured to:

- Write in a professional but friendly tone
- Focus on user value and impact
- Create standard sections (What's new/improved/fixed, Key Features/Changes, Feedback)
- Generate appropriate tags based on Linear labels
- Estimate accurate reading times

## Troubleshooting

### No Issues Found

- Check that your Linear API key has access to the correct workspace
- Verify that issues have been moved to completed states
- Try increasing the `--days` parameter

### API Errors

- Ensure your API keys are valid and have proper permissions
- Check your internet connection
- Verify Linear API status

### Generation Errors

- Some issues may not have enough information for AI to generate meaningful entries
- Check the console output for specific error messages
- Use `--dry-run` to test without creating files
