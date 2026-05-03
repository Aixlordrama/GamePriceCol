# Development Guide - Cross-Platform Workflow

## 📋 Project Structure

```
scraper/
├── backend/              # Node.js backend API
│   ├── package.json
│   └── src/
│       └── index.js
├── frontend/             # Vite + React frontend
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
├── scraper/              # Web scraper module
│   ├── package.json
│   └── src/
│       ├── index.js
│       ├── ktronix-scraper.js
│       └── supabaseClient.js
├── supabase/             # Database schema
│   └── schema.sql
├── .gitignore            # Git ignore rules
├── .env.example          # Environment variables template
├── package.json          # Root package.json
└── README.md
```

## 🔀 Branching Strategy

### Main Branches
- **main** → Production-ready code
- **develop** → Alpha/Development (default branch)

### Feature Branches
- **feature/auth** → Authentication features
- **feature/scraper** → Scraper improvements
- **feature/ui** → Frontend changes
- etc.

### Branch Rules
```
main ← merge only from develop (production releases)
  ↑
develop ← merge from feature/* branches (alpha testing)
  ↑
feature/* ← branches for active development
```

## 💻 Windows → 🍎 Mac Workflow

### Step 1: Work on Windows
```powershell
cd "c:\Users\dpena\Documents\proyectos\scraper"

# Start fresh
git pull origin develop

# Create feature branch
git checkout -b feature/my-feature

# Make changes
# ... edit files ...

# Commit
git add .
git commit -m "Add: Description of feature"

# Push to GitHub
git push -u origin feature/my-feature
```

### Step 2: Move to Mac
```bash
# Get your feature branch
git fetch origin
git checkout feature/my-feature
git pull origin feature/my-feature

# Install/update dependencies
npm install

# Continue development
# ... edit files ...

# Commit and push
git add .
git commit -m "Refactor: Additional improvements"
git push origin feature/my-feature
```

### Step 3: Merge Back to Develop
```bash
# On either device, when feature is complete
git checkout develop
git pull origin develop
git merge feature/my-feature
git push origin develop

# Optional: Delete feature branch
git push origin --delete feature/my-feature
```

## ⚠️ Critical Rules

### ✓ DO:
- ✅ Create a feature branch for each task
- ✅ Run `npm install` after pulling (regenerates node_modules)
- ✅ Commit lock files (package-lock.json)
- ✅ Test on both Windows and Mac before merging to main
- ✅ Push to feature branch, not directly to develop
- ✅ Write clear commit messages

### ✗ DON'T:
- ❌ Never commit node_modules
- ❌ Never commit .env file
- ❌ Never force push to main or develop
- ❌ Never bypass the feature branch workflow
- ❌ Don't commit .DS_Store or system files

## 📦 Package Management

### Windows Setup
```powershell
# Install dependencies for each workspace
cd backend && npm install
cd ../frontend && npm install
cd ../scraper && npm install
```

### Mac Setup
```bash
# Same commands work on Mac
cd backend && npm install
cd ../frontend && npm install
cd ../scraper && npm install
```

### Why Node Modules Not Committed?
1. **Platform-specific bindings** - Native code compiles differently
2. **Huge size** - Often 500MB-1GB+
3. **Lock files work** - package-lock.json ensures reproducibility
4. **All platforms use npm install** - Regenerates from lock file

## 🔍 Quick Checks

### Before Pushing
```bash
# Check status
git status

# Review changes
git diff

# Verify commit
git log --oneline -5
```

### After Pulling
```bash
# Update all dependencies
npm install

# Verify install worked
npm list

# Run tests (when available)
npm test
```

## 🚀 Releasing to Production

### Release Checklist
1. ✅ Complete all features in develop
2. ✅ Test thoroughly
3. ✅ Update version numbers (if applicable)
4. ✅ Update CHANGELOG (if applicable)

### Release Commands
```bash
# Prepare release
git checkout main
git pull origin main

# Merge from develop
git merge develop

# Tag release
git tag -a v1.0.0 -m "Release v1.0.0"

# Push
git push origin main
git push origin --tags
```

## 🆘 Emergency Fixes

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Discard Changes)
```bash
git reset --hard HEAD~1
```

### Abandon Feature Branch
```bash
git checkout develop
git branch -D feature/abandoned-feature
```

### Sync with Latest Develop
```bash
git fetch origin
git rebase origin/develop
```

## 📝 Commit Message Guidelines

### Format
```
Type: Brief description (50 chars max)

Optional detailed explanation (wrap at 72 chars)
- Bullet points if needed
- Multiple lines OK
```

### Types
- **Add**: New feature
- **Fix**: Bug fix
- **Refactor**: Code reorganization
- **Docs**: Documentation update
- **Test**: Test additions/changes
- **Style**: Formatting/whitespace

### Examples
```
Add: User authentication with JWT
Fix: Prevent infinite loop in scraper
Refactor: Simplify supabase client initialization
Docs: Update setup instructions
```

## 🔗 Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Commit Message Best Practices](https://tbaggery.com/writing-good-commit-messages.html)

---

**Last Updated**: May 2026
**Team**: Windows (Desktop) + macOS (MacBook Air)
**Repository Type**: Full-stack web application with data scraper
