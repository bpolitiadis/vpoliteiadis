# GitHub Repository Setup Guide

## Overview
This guide will walk you through setting up a GitHub repository for your portfolio project and pushing your local changes to the remote repository.

## Prerequisites
- Git installed on your machine ✅
- GitHub account
- Your portfolio project committed locally ✅

## Step-by-Step Process

### 1. Create a New GitHub Repository

1. **Go to GitHub.com** and sign in to your account
2. **Click the "+" icon** in the top-right corner
3. **Select "New repository"**
4. **Fill in the repository details:**
   - **Repository name**: `vpoliteiadis-portfolio` (or your preferred name)
   - **Description**: `Personal portfolio website built with Astro and Tailwind CSS`
   - **Visibility**: Choose Public or Private (recommended: Public for portfolio)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. **Click "Create repository"**

### 2. Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/vpoliteiadis-portfolio.git

# Verify the remote was added
git remote -v

# Push your existing commits to GitHub
git branch -M main
git push -u origin main
```

### 3. Verify the Push

1. **Refresh your GitHub repository page**
2. **You should see all your files** including:
   - `src/` directory with all components
   - `package.json` and `pnpm-lock.yaml`
   - `README.md`
   - Configuration files

### 4. Set Up Repository Settings (Optional but Recommended)

1. **Go to Settings** in your repository
2. **Set up GitHub Pages** (if you want to deploy):
   - Navigate to "Pages" in the left sidebar
   - Source: "Deploy from a branch"
   - Branch: `main`
   - Folder: `/ (root)`
3. **Add topics** for better discoverability:
   - `portfolio`, `astro`, `tailwindcss`, `typescript`, `personal-website`

### 5. Future Development Workflow

For future changes, use this workflow:

```bash
# Make your changes
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: Add new feature description"

# Push to GitHub
git push origin main
```

## Important Notes

### Branch Strategy
- **Main branch**: Production-ready code
- **Feature branches**: For new features (optional for solo projects)
- **Never commit directly to main** in team environments

### Commit Messages
Follow conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring

### Security Considerations
- **Never commit sensitive data** (API keys, passwords)
- **Use environment variables** for configuration
- **Review your commits** before pushing

## Troubleshooting

### If you get authentication errors:
```bash
# Set up SSH keys or use GitHub CLI
gh auth login
```

### If you need to change the remote URL:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/NEW_REPO_NAME.git
```

### If you need to force push (use with caution):
```bash
git push -f origin main
```

## Next Steps

1. **Set up deployment** (Vercel, Netlify, or GitHub Pages)
2. **Add a custom domain** (optional)
3. **Set up CI/CD** for automatic deployments
4. **Add issue templates** for project management
5. **Create a contributing guide** if you plan to open-source

## Repository Structure Overview

Your repository now contains:
- **Astro configuration** with content collections
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **Content management** with MDX support
- **Responsive components** with accessibility features
- **Professional documentation**

This foundation is ready for future enhancements and deployments! 