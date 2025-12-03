# Fix: Endpoint Error - "/try-on" instead of "/api/try-on"

## Understanding the Error

The error shows:
- ❌ Trying to fetch: `https://dtrmnd2webdev.vercel.app/try-on` (WRONG - missing `/api`)
- ✅ Should fetch: `/api/try-on` (relative path) or `https://dtrmnd2webdev.vercel.app/api/try-on`

**Root Cause**: The `VITE_TRYON_ENDPOINT` environment variable in Vercel is set to the wrong value: `https://dtrmnd2webdev.vercel.app/try-on` (missing the `/api` part).

## Immediate Fix Required

### Step 1: Remove or Fix the Environment Variable in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `dtrmnd2webdev`
3. Go to **Settings** → **Environment Variables**
4. Find `VITE_TRYON_ENDPOINT`
5. **Either delete it completely** (recommended), or **update it**:

   **Option A: Delete it (RECOMMENDED)**
   - Click the trash icon to delete `VITE_TRYON_ENDPOINT`
   - The app will automatically use `/api/try-on` (relative path)
   - This works on all deployments automatically

   **Option B: Fix the value**
   - Click to edit `VITE_TRYON_ENDPOINT`
   - Change from: `https://dtrmnd2webdev.vercel.app/try-on`
   - Change to: `/api/try-on` (relative path - RECOMMENDED)
   - Or: `https://dtrmnd2webdev.vercel.app/api/try-on` (full URL)

### Step 2: Redeploy

After updating the environment variable:

1. Go to **Deployments** tab
2. Click the **three dots** (⋯) on the latest deployment
3. Click **"Redeploy"**
4. Or make a new commit to trigger automatic deployment

**Important**: Environment variables starting with `VITE_` are injected at **build time**, so you must redeploy after changing them.

## Why This Happens

- The `VITE_TRYON_ENDPOINT` is set to the wrong URL
- It's missing `/api` in the path
- The code was using that misconfigured value
- The endpoint doesn't exist at `/try-on`, only at `/api/try-on`

## What I've Fixed in the Code

I've updated `TryOn.jsx` to:

1. ✅ **Always default to relative path** `/api/try-on` if no endpoint is set
2. ✅ **Validate the endpoint** - if it doesn't include `/api/try-on`, it automatically uses the relative path
3. ✅ **Use relative path for same-origin requests** - prevents CORS issues
4. ✅ **Show a warning** in console if endpoint is misconfigured

This means even if the environment variable is wrong, the app will still work using the relative path.

## Recommended Configuration

### For Production/Preview Deployments

**Best Practice**: Don't set `VITE_TRYON_ENDPOINT` at all, or set it to `/api/try-on`

- ✅ Works automatically with any deployment URL
- ✅ No CORS issues (same-origin request)
- ✅ Works on preview deployments automatically

### For Local Development

If you're running the Express server locally:

```env
VITE_TRYON_ENDPOINT=http://localhost:3001/api/try-on
```

### Environment Variable Checklist

After fixing, verify:

- ✅ `VITE_TRYON_ENDPOINT` is either:
  - Not set at all (will use `/api/try-on`)
  - Set to `/api/try-on` (relative path)
  - Set to a full URL that includes `/api/try-on`

- ❌ `VITE_TRYON_ENDPOINT` should NOT be:
  - `https://dtrmnd2webdev.vercel.app/try-on` (missing `/api`)
  - `https://dtrmnd2webdev.vercel.app/try-on` (wrong path)

## Testing After Fix

1. **Check the endpoint**:
   - Open browser DevTools → Console
   - You should see the endpoint being used
   - Should be `/api/try-on` or a full URL with `/api/try-on`

2. **Test the try-on feature**:
   - Go to the try-on page
   - Upload a photo and select a product
   - Click "Generate try-on"
   - Should work without CORS errors

3. **Check the network tab**:
   - Should see a POST request to `/api/try-on`
   - Status should be 200 (or processing)

## Summary

**The Quick Fix**:
1. Delete `VITE_TRYON_ENDPOINT` from Vercel environment variables
2. Redeploy
3. Done! ✅

The code now automatically handles misconfigured endpoints and defaults to the correct relative path.

