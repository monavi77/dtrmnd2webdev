# CORS and Endpoint Fix

## Issues Fixed

### 1. CORS Error
**Problem**: Preview deployments were being blocked by CORS policy because the origin wasn't allowed.

**Solution**: Updated both `/api/health.js` and `/api/try-on.js` to:
- Automatically allow all Vercel deployment origins (anything containing `vercel.app`)
- Allow localhost for local development
- Still respect `CLIENT_ORIGIN` if explicitly set

### 2. Wrong Endpoint Path
**Problem**: The endpoint was trying to fetch from `/try-on` instead of `/api/try-on`.

**Solution**: Updated `TryOn.jsx` to:
- Default to relative path `/api/try-on` if `VITE_TRYON_ENDPOINT` is not set
- Validate that if `VITE_TRYON_ENDPOINT` is set, it contains `/api/try-on`
- Use relative path for same-origin requests (recommended)

## Configuration

### Recommended Setup

**Option 1: Use Relative Path (Recommended)**
- Don't set `VITE_TRYON_ENDPOINT` at all, or set it to `/api/try-on`
- This works automatically with any deployment URL

**Option 2: Set Explicit URL**
- Set `VITE_TRYON_ENDPOINT` to the full URL: `https://your-project.vercel.app/api/try-on`
- Only needed if you want to call the API from a different domain

### For Vercel Deployment

1. **Remove or update `VITE_TRYON_ENDPOINT`** in Vercel environment variables:
   - Either remove it completely (will use relative path `/api/try-on`)
   - Or set it to `/api/try-on` (relative path)
   - Or set it to your full production URL: `https://dtrmnd2webdev.vercel.app/api/try-on`

2. **CORS is now automatic** - no need to configure `CLIENT_ORIGIN` unless you have specific requirements

## What Changed

### Files Modified:

1. **`api/try-on.js`**
   - Enhanced CORS handling to automatically allow Vercel origins
   - Better origin detection

2. **`api/health.js`**
   - Enhanced CORS handling to automatically allow Vercel origins

3. **`src/pages/TryOn.jsx`**
   - Defaults to relative path `/api/try-on`
   - Validates endpoint path before using it

## Next Steps

1. **Remove the incorrect `VITE_TRYON_ENDPOINT`** from Vercel:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Remove or update `VITE_TRYON_ENDPOINT` if it's set to `https://dtrmnd2webdev.vercel.app/try-on`
   - Either delete it (recommended) or change to `/api/try-on`

2. **Redeploy** your application:
   - Make a new commit, or
   - Go to Deployments → Redeploy

3. **Test**:
   - The try-on feature should now work on both production and preview deployments
   - No CORS errors should occur

## Why This Works

- **Relative paths** (`/api/try-on`) automatically use the same origin as your frontend
- **CORS** now automatically allows all Vercel deployments
- **No configuration needed** - works out of the box for same-origin requests

