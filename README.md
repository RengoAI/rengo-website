# Rengo AI Landing Page

A modern React SPA landing page built with Vite, TypeScript, and Chakra UI.

## 🚀 Development

```bash
# Install dependencies
pnpm install

# Generate routes and types
pnpm gen

# Start development server
pnpm start
```

## 📦 Deployment

This project uses a two-branch deployment strategy:

### Branches

- **`main`**: Source code and development
- **`production`**: Built artifacts ready for serving

### Automatic Deployment

When you push to the `main` branch, GitHub Actions will:

1. Build the React application
2. Generate optimized production assets
3. Create `404.html` for SPA routing support
4. Copy the `CNAME` file for custom domain
5. Deploy all build artifacts to the `production` branch

### Manual Deployment

You can also trigger deployment manually:

1. Go to the "Actions" tab in your GitHub repository
2. Select "Deploy to Production Branch"
3. Click "Run workflow"

### GitHub Pages Setup

To serve the site:

1. Go to repository Settings → Pages
2. Set source branch to `production`
3. Set folder to `/ (root)`
4. Your site will be available at `https://rengoai.com`

## 🛠 Build Scripts

```bash
# Generate routes and types
pnpm gen

# Build for production
pnpm build production

# Build and prepare for deployment
pnpm deploy
```

## 🏗 Architecture

- **Frontend**: React 18 + TypeScript
- **Styling**: Chakra UI v3
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Package Manager**: pnpm

## 📁 Project Structure

```
src/
├── components/
│   ├── landing/          # Landing page components
│   ├── nav/             # Navigation components
│   └── ui/              # Reusable UI components
├── features/
│   └── landing/         # Landing page feature
├── theme/               # Chakra UI theme configuration
└── app/                 # App configuration and routing
```

## 🌐 Custom Domain

The site is configured to serve from `rengoai.com` via the `CNAME` file. Make sure your DNS is configured to point to GitHub Pages:

```
A records:
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## 🔧 Configuration

- **Node.js**: v23.5.0
- **pnpm**: 9.15.2
- **TypeScript**: ~5.6.3
- **React**: ^18.3.1
