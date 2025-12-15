# 🚀 Deployment Guide

This guide explains how to deploy the LeetCode Company-Wise Problems website.

## ✅ Recommended: GitHub Pages (Automated)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages.

### Setup Instructions

1. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: Select **GitHub Actions**
   - Save the settings

2. **Trigger Deployment**
   - The workflow will automatically run when you:
     - Push to the `main` branch
     - Push to the `copilot/create-website-for-csv-files` branch
     - Manually trigger from Actions tab

3. **Access Your Website**
   - After deployment completes (2-3 minutes), your site will be live at:
   - `https://jitendra-789.github.io/leetcode-company-wise-problems/`

### Check Deployment Status

- Go to **Actions** tab in your repository
- Look for "Deploy to GitHub Pages" workflow
- Click on the latest run to see deployment status

---

## Alternative Deployment Options

### Option 2: Netlify (One-Click)

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure:
   - Branch to deploy: `main` or `copilot/create-website-for-csv-files`
   - Build command: (leave empty)
   - Publish directory: `/`
5. Click "Deploy"

Your site will be live at: `https://your-site-name.netlify.app`

### Option 3: Vercel (One-Click)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Other
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: `./`
5. Click "Deploy"

Your site will be live at: `https://your-project.vercel.app`

### Option 4: Local Development

Run the website locally for testing:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

---

## 📋 Deployment Checklist

- [ ] Enable GitHub Pages in repository settings
- [ ] GitHub Actions workflow is present (`.github/workflows/deploy.yml`)
- [ ] Workflow has required permissions
- [ ] Push code to trigger deployment
- [ ] Wait 2-3 minutes for deployment to complete
- [ ] Visit the deployed URL
- [ ] Test functionality (company selection, filters, search)
- [ ] Verify mobile responsiveness

---

## 🔧 Troubleshooting

### Website not loading?

1. Check GitHub Actions workflow status
2. Ensure GitHub Pages is enabled with "GitHub Actions" as source
3. Clear browser cache and try again
4. Check if index.html is in the root directory

### CSV files not loading?

- The website tries local files first, then GitHub raw content
- Ensure all company folders and CSV files are committed
- Check browser console for any CORS errors

### Need help?

- Check the [GitHub Actions logs](https://github.com/jitendra-789/leetcode-company-wise-problems/actions)
- Review [GitHub Pages documentation](https://docs.github.com/en/pages)
- Open an issue in the repository

---

## 📊 Deployment Comparison

| Feature | GitHub Pages | Netlify | Vercel | Local |
|---------|-------------|---------|--------|-------|
| Cost | Free | Free tier | Free tier | Free |
| Setup Time | 5 minutes | 5 minutes | 5 minutes | 1 minute |
| Auto Deploy | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| Custom Domain | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| HTTPS | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| Best For | GitHub users | Quick deploys | Next.js/React | Testing |

**Recommendation**: Use **GitHub Pages** for this project as it's:
- Free and integrated with your repository
- Automatically deploys on push
- No external account needed
- Perfect for static sites

---

## 🌐 URL Structure

Once deployed, your website will be accessible at:

- **GitHub Pages**: `https://jitendra-789.github.io/leetcode-company-wise-problems/`
- **Netlify**: `https://[your-site-name].netlify.app/`
- **Vercel**: `https://[your-project].vercel.app/`

You can also configure custom domains on any platform.

---

## ✨ What Gets Deployed

The deployment includes:
- `index.html` - Main website
- `styles.css` - Styling
- `script.js` - Functionality
- `companies.json` - Company list
- All company folders with CSV files
- `WEBSITE_README.md` - Documentation

Total: ~2,350 CSV files across 470 companies!

---

**Ready to deploy? Just enable GitHub Pages and push your code! 🚀**
