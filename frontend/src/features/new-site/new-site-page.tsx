import { NewSiteProvider } from "./new-site-provider";

export default function NewSitePage() {
  return (
    <NewSiteProvider>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          margin: 0,
          fontFamily: "var(--v2-fonts-sans)",
          fontSize: "1rem",
          color: "var(--v2-colors-grey60)",
          backgroundColor: "var(--v2-colors-grey10)",
        }}
      >
        new site in progress
      </div>
    </NewSiteProvider>
  );
}
