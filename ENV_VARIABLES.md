# Environment Variables Reference

This document lists all environment variables needed for the DTRMND web app.

## Required Variables

### `OPENAI_API_KEY`
- **Required**: Yes
- **Description**: Your OpenAI API key for generating try-on images
- **Example**: `sk-...`
- **Where to set**: Vercel Dashboard → Settings → Environment Variables
- **Environments**: Production, Preview, Development

## Optional Server Variables

### `CLIENT_ORIGIN`
- **Required**: No
- **Description**: Allowed CORS origin for API requests
- **Default**: `http://localhost:5173` (local) or `*` (production)
- **Example**: `https://your-project.vercel.app`
- **Note**: For production, set this to your Vercel deployment URL

### `OPENAI_IMAGE_SIZE`
- **Required**: No
- **Description**: Output image size for OpenAI image generation
- **Default**: `1024x1536`
- **Options**: `1024x1024`, `1024x1536`, `1536x1024`
- **Note**: Larger sizes may take longer to generate

### `OPENAI_IMAGE_QUALITY`
- **Required**: No
- **Description**: Image quality setting
- **Default**: `auto`
- **Options**: `auto`, `low`, `medium`, `high`

### `OPENAI_IMAGE_BACKGROUND`
- **Required**: No
- **Description**: Background setting for generated images
- **Default**: `auto`
- **Options**: `auto`, `transparent`, `opaque`

## Frontend Variables (VITE_*)

### `VITE_TRYON_ENDPOINT`
- **Required**: No (app works in mock mode without it)
- **Description**: URL endpoint for the try-on API
- **Local development**: `http://localhost:3001/api/try-on`
- **Vercel production**: `https://your-project.vercel.app/api/try-on`
- **Dynamic (recommended)**: `https://$VERCEL_URL/api/try-on`
- **Note**: Must be set before build time. Variables prefixed with `VITE_` are exposed to the browser.

## Quick Setup for Vercel

### Step 1: Add Required Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add these variables for **Production** environment:

1. **OPENAI_API_KEY**
   - Name: `OPENAI_API_KEY`
   - Value: `sk-your-actual-key-here`
   - Environment: Production, Preview, Development

2. **VITE_TRYON_ENDPOINT**
   - Name: `VITE_TRYON_ENDPOINT`
   - Value: `https://$VERCEL_URL/api/try-on`
   - Environment: Production, Preview

   For Development:
   - Name: `VITE_TRYON_ENDPOINT`
   - Value: `http://localhost:3001/api/try-on`
   - Environment: Development

### Step 2: Add Optional Variables (if needed)

3. **CLIENT_ORIGIN**
   - Name: `CLIENT_ORIGIN`
   - Value: `https://$VERCEL_URL` (or your specific domain)
   - Environment: Production, Preview

### Step 3: Redeploy

After adding environment variables:
1. Go to Deployments tab
2. Click the three dots on the latest deployment
3. Click "Redeploy"
4. Or make a new commit to trigger automatic deployment

## Local Development Setup

Create a `.env.local` file in your project root:

```env
OPENAI_API_KEY=sk-your-key-here
VITE_TRYON_ENDPOINT=http://localhost:3001/api/try-on
CLIENT_ORIGIN=http://localhost:5173
```

**Note**: `.env.local` is gitignored and won't be committed to your repository.

## Environment Variable Priority

1. Vercel Dashboard settings (for deployments)
2. `.env.local` file (for local development)
3. `.env` file (for local development, if exists)
4. Default values (hardcoded in the application)

## Security Notes

- ✅ **Never commit** `.env` files or actual API keys to Git
- ✅ Use Vercel's environment variables for production secrets
- ✅ Variables starting with `VITE_` are exposed to the browser - **never put secrets in these**
- ✅ Keep your OpenAI API key secure and rotate it if exposed

## Verification

After deployment, verify your environment variables are working:

1. **Check API endpoint**: Visit `https://your-project.vercel.app/api/health`
   - Should return: `{"ok":true,"model":"gpt-image-1"}`

2. **Check frontend**: Open browser console on your deployed site
   - The try-on feature should work if `VITE_TRYON_ENDPOINT` is set correctly

3. **Check Vercel logs**: Go to your deployment → Functions tab
   - Check for any errors related to missing environment variables

