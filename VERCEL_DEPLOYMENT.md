# Vercel Deployment Guide

This guide will help you deploy your DTRMND web app to Vercel with proper environment variable configuration.

## Prerequisites

- A Vercel account ([sign up here](https://vercel.com/signup))
- Your OpenAI API key
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Push Your Code to Git

Make sure your code is pushed to a Git repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Vercel will auto-detect your project settings

### 3. Configure Environment Variables

In the Vercel project settings, go to **Settings** → **Environment Variables** and add the following:

#### Required Variables

| Variable | Value | Environment |
|----------|-------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key | Production, Preview, Development |

#### Optional Server Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `CLIENT_ORIGIN` | `https://your-domain.vercel.app` | Your Vercel deployment URL (auto-set) |
| `OPENAI_IMAGE_SIZE` | `1024x1536` | Image output size |
| `OPENAI_IMAGE_QUALITY` | `auto` | Image quality setting |
| `OPENAI_IMAGE_BACKGROUND` | `auto` | Background setting |

#### Frontend Variables (VITE_*)

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_TRYON_ENDPOINT` | `https://your-project.vercel.app/api/try-on` | Production, Preview, Development |

**Important Notes:**

- Variables starting with `VITE_` are exposed to the browser
- Never add sensitive keys as `VITE_*` variables
- Replace `your-project.vercel.app` with your actual Vercel deployment URL
- You can use Vercel's environment variable placeholders like `$VERCEL_URL` for dynamic URLs

### 4. Set VITE_TRYON_ENDPOINT Dynamically

Instead of hardcoding the URL, you can use Vercel's built-in environment variables:

1. In Vercel dashboard, go to **Settings** → **Environment Variables**
2. Add a new variable:
   - **Key**: `VITE_TRYON_ENDPOINT`
   - **Value**: `https://$VERCEL_URL/api/try-on`
   - **Environments**: Select all (Production, Preview, Development)

Or, you can set it per environment:
- **Production**: `https://your-project.vercel.app/api/try-on`
- **Preview**: `https://your-project-git-<branch>-your-team.vercel.app/api/try-on`
- **Development**: `http://localhost:3001/api/try-on`

### 5. Configure Build Settings

Vercel should auto-detect your Vite project, but verify these settings:

- **Framework Preset**: Vite
- **Build Command**: `npm run build` (or `yarn build`)
- **Output Directory**: `dist`
- **Install Command**: `npm install` (or `yarn install`)

### 6. Deploy

1. Click **Deploy**
2. Wait for the build to complete
3. Once deployed, your app will be available at `https://your-project.vercel.app`

## Environment Variable Setup Summary

### Production Environment

Add these to Vercel's Production environment:

```
OPENAI_API_KEY=sk-...
CLIENT_ORIGIN=https://your-project.vercel.app
VITE_TRYON_ENDPOINT=https://your-project.vercel.app/api/try-on
```

### Preview Environment

For preview deployments (pull requests):

```
OPENAI_API_KEY=sk-...
CLIENT_ORIGIN=https://your-project-git-<branch>-your-team.vercel.app
VITE_TRYON_ENDPOINT=https://$VERCEL_URL/api/try-on
```

### Development Environment

For local development with `vercel dev`:

```
OPENAI_API_KEY=sk-...
CLIENT_ORIGIN=http://localhost:5173
VITE_TRYON_ENDPOINT=http://localhost:3001/api/try-on
```

## API Routes

Your serverless functions are located in the `/api` directory:

- `/api/health` - Health check endpoint (GET)
- `/api/try-on` - Try-on generation endpoint (POST)

These are automatically deployed as serverless functions on Vercel.

## Troubleshooting

### Environment Variables Not Working

1. Make sure variables are set in the correct environment (Production/Preview/Development)
2. Variables starting with `VITE_` must be set before build time
3. After adding `VITE_*` variables, you need to redeploy

### API Endpoints Not Found

1. Check that your files are in the `/api` directory
2. Verify the route paths match your frontend requests
3. Check Vercel function logs in the dashboard

### CORS Errors

1. Update `CLIENT_ORIGIN` to match your deployment URL
2. Or set it to `*` for development (not recommended for production)

### File Upload Issues

1. Verify `MAX_FILE_SIZE` is appropriate (currently 8MB)
2. Check Vercel function timeout limits (default is 10s, can be increased)
3. Check function logs for specific errors

## Local Testing with Vercel

You can test your Vercel deployment locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run development server with Vercel
vercel dev
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

