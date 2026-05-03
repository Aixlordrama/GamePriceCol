# Git Setup Guide for Cross-Platform Development

## Prerequisites
- Install Git from https://git-scm.com/download/win (Windows)
- Create a GitHub repository at https://github.com/new

## Setup Steps

### 1. Initialize Repository (Run in PowerShell)
```powershell
cd "c:\Users\dpena\Documents\proyectos\scraper"

# Initialize git
git init

# Configure git (use your GitHub email and name)
git config user.name "Your Name"
git config user.email "your.email@github.com"

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Project setup"

# Create and switch to develop branch
git branch develop

# Set develop as default branch
git checkout develop
```

### 2. Connect to GitHub
```powershell
# Add remote repository (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push initial commit to develop
git push -u origin develop

# Set develop as default branch on GitHub (do this in GitHub web UI Settings)
```

### 3. Create Main Branch (Production)
```powershell
# Create main branch from develop
git checkout -b main
git push -u origin main

# Go back to develop
git checkout develop
```

## Branching Strategy

### Branches:
- **main** - Production ready code (stable)
- **develop** - Alpha/Development branch (latest features)
- **feature/*** - Feature branches for new work

### Workflow for Windows ↔ Mac

#### Starting on Windows:
```powershell
# Pull latest changes
git pull origin develop

# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "Description of changes"

# Push to GitHub
git push -u origin feature/feature-name
```

#### Continue on Mac:
```bash
# Pull latest changes
git pull origin develop

# Switch to your feature branch
git checkout feature/feature-name

# Make more changes
git add .
git commit -m "Additional changes"

# Push back
git push origin feature/feature-name
```

#### Merge Feature to Develop:
```bash
# Switch to develop
git checkout develop

# Pull latest develop
git pull origin develop

# Merge feature branch
git merge feature/feature-name

# Push to develop
git push origin develop

# Delete feature branch (optional)
git branch -d feature/feature-name
git push origin --delete feature/feature-name
```

#### Release to Production:
```bash
# Ensure develop is up to date
git checkout develop
git pull origin develop

# Switch to main
git checkout main

# Merge develop to main
git merge develop

# Tag release (optional)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push to main
git push origin main
git push origin --tags
```

## Important Notes ✓

### Why node_modules is in .gitignore:
1. **Platform-specific bindings** - Some packages have native code that compiles differently on Windows vs Mac
2. **Size** - node_modules can be 100MB-1GB+
3. **Lock files** - package-lock.json/yarn.lock preserves exact versions
4. **Regeneration** - Everyone runs `npm install` after pulling

### .env in .gitignore:
- Never commit environment variables, API keys, or secrets
- Use .env.example for documentation of required variables

### After Pulling on Any Device:
```bash
npm install
# This regenerates node_modules from the lock file
```

## Recommended Workflow

1. ✅ Before leaving Windows → Push to feature branch
2. ✅ On Mac → Pull feature branch, continue work, push back
3. ✅ When feature is complete → Merge to develop
4. ✅ When ready for production → Merge develop to main

## Quick Commands Reference

```bash
# Update packages after pulling
npm install

# Check git status
git status

# See all branches
git branch -a

# See commit history
git log --oneline -10

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Switch branches
git checkout develop
git checkout -b feature/new-feature

# Sync with remote
git fetch origin
git pull origin develop
```

---
**Next Steps:**
1. Install Git for Windows
2. Create a GitHub repository
3. Run the initialization commands above
4. Test on both Windows and Mac
