# Deployment Guide - SecureKey Password Generator

## Deploy to Vercel (Recommended)

### Method 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy from the project directory**:
```bash
cd password_generator
vercel
```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **securekey-password-generator** (or your choice)
   - In which directory is your code located? **./**
   - Want to override settings? **N**

5. **Deploy to production**:
```bash
vercel --prod
```

### Method 2: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit - SecureKey Password Generator"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Go to [Vercel Dashboard](https://vercel.com/new)**

3. **Import your GitHub repository**

4. **Configure project**:
   - Framework Preset: **Vite**
   - Root Directory: **password_generator** (if repo contains multiple folders)
   - Build Command: **npm run build** (auto-detected)
   - Output Directory: **dist** (auto-detected)
   - Install Command: **npm install** (auto-detected)

5. **Click "Deploy"**

### Method 3: Deploy via Git Integration

1. **Connect your repository to Vercel**
2. **Vercel will automatically**:
   - Detect it's a Vite project
   - Run `npm install`
   - Run `npm run build`
   - Deploy the `dist` folder
   - Set up automatic deployments for every push

## Build Configuration

The project is configured with:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Framework**: Vite + React

## Environment Variables

This project doesn't require any environment variables. All functionality runs client-side.

## Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Vercel Configuration

The `vercel.json` file is already configured to handle React Router:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures all routes (/, /batch, /history, /settings) work correctly.

## Post-Deployment Checklist

- ✅ All pages load correctly
- ✅ Navigation works between pages
- ✅ Password generation works
- ✅ Copy to clipboard works
- ✅ LocalStorage (history & settings) works
- ✅ Responsive design works on mobile
- ✅ Custom prefix feature works
- ✅ Batch generator works

## Troubleshooting

### Build Fails
- Run `npm run build` locally to check for errors
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility

### Routes Don't Work
- Verify `vercel.json` exists with rewrites configuration
- Check that React Router is properly configured

### Styling Issues
- Ensure TailwindCSS is in devDependencies
- Verify `postcss.config.js` and `tailwind.config.js` exist
- Check that `index.css` has Tailwind directives

## Performance Optimization

The build is already optimized with:
- Code splitting
- Tree shaking
- Minification
- Gzip compression

## Analytics (Optional)

To add Vercel Analytics:

1. Go to your project in Vercel Dashboard
2. Click "Analytics" tab
3. Enable Analytics
4. Install the package:
```bash
npm install @vercel/analytics
```

5. Add to your `App.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      {/* Your app content */}
      <Analytics />
    </>
  );
}
```

## Support

For issues with deployment, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Your app is now ready for deployment! 🚀**
