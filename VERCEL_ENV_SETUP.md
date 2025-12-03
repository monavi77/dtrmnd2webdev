# Vercel Environment Variables - Quick Setup Guide

## Required Variables

### 1. OPENAI_API_KEY ⚠️ REQUIRED
```
sk-your-actual-openai-api-key-here
```
- Get your API key from: https://platform.openai.com/api-keys
- Set for: **Production, Preview, Development**
- ⚠️ Keep this secret! Never commit it to Git.

---

## Frontend Variable

### 2. VITE_TRYON_ENDPOINT ✅ RECOMMENDED
```
/api/try-on
```
- This is a **relative path** that works automatically on all deployments
- Set for: **Production, Preview**
- For Development (local): `http://localhost:3001/api/try-on`

**Why relative path?**
- ✅ Works on production automatically
- ✅ Works on preview deployments automatically  
- ✅ No CORS issues (same-origin request)
- ✅ No need to update when deployment URL changes

---

## Optional Variables (You can delete these if not needed)

### 3. CLIENT_ORIGIN (Optional - can delete)
- Not needed - CORS is handled automatically
- If you want to set it: Your production domain URL
- Can be deleted if not using

### 4. OPENAI_IMAGE_SIZE (Optional)
```
1024x1536
```
- Options: `1024x1024`, `1024x1536`, `1536x1024`
- Can be deleted to use default

### 5. OPENAI_IMAGE_QUALITY (Optional)
```
auto
```
- Options: `auto`, `low`, `medium`, `high`
- Can be deleted to use default

### 6. OPENAI_IMAGE_BACKGROUND (Optional)
```
auto
```
- Options: `auto`, `transparent`, `opaque`
- Can be deleted to use default

### 7. PORT (Not needed - can delete)
- Not used by Vercel serverless functions
- Only needed for local Express server
- **Can be deleted** from Vercel environment variables

---

## Quick Setup Checklist

### ✅ Must Have (Required):
- [ ] `OPENAI_API_KEY` = Your OpenAI API key

### ✅ Should Have (Recommended):
- [ ] `VITE_TRYON_ENDPOINT` = `/api/try-on` (Production, Preview)
- [ ] `VITE_TRYON_ENDPOINT` = `http://localhost:3001/api/try-on` (Development - optional, for local testing)

### ❓ Optional (Can delete if not needed):
- [ ] `CLIENT_ORIGIN` - Can delete (auto-handled)
- [ ] `OPENAI_IMAGE_SIZE` - Can delete or set to `1024x1536`
- [ ] `OPENAI_IMAGE_QUALITY` - Can delete or set to `auto`
- [ ] `OPENAI_IMAGE_BACKGROUND` - Can delete or set to `auto`
- [ ] `PORT` - **Should delete** (not used on Vercel)

---

## Step-by-Step Setup

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables

2. **Set/Update VITE_TRYON_ENDPOINT**:
   - Find `VITE_TRYON_ENDPOINT`
   - Click Edit
   - Set value to: `/api/try-on`
   - Select environments: **Production** and **Preview**
   - Save

3. **For Development (optional)**:
   - Add another entry for `VITE_TRYON_ENDPOINT`
   - Set value to: `http://localhost:3001/api/try-on`
   - Select environment: **Development** only
   - Save

4. **Verify OPENAI_API_KEY**:
   - Make sure `OPENAI_API_KEY` is set with your actual key
   - Should be set for all environments

5. **Clean up (optional)**:
   - Delete `PORT` if present (not needed on Vercel)
   - Delete `CLIENT_ORIGIN` if you want (auto-handled)

6. **Redeploy**:
   - Go to Deployments tab
   - Click "Redeploy" on latest deployment
   - Or make a new commit

---

## Example: What Your Variables Should Look Like

```
OPENAI_API_KEY        = sk-...                    [Production, Preview, Development]
VITE_TRYON_ENDPOINT   = /api/try-on               [Production, Preview]
VITE_TRYON_ENDPOINT   = http://localhost:3001/api/try-on  [Development] (optional)
OPENAI_IMAGE_SIZE     = 1024x1536                 [Production, Preview, Development] (optional)
OPENAI_IMAGE_QUALITY  = auto                      [Production, Preview, Development] (optional)
OPENAI_IMAGE_BACKGROUND = auto                    [Production, Preview, Development] (optional)
```

---

## After Setup

1. ✅ Redeploy your application
2. ✅ Test the try-on feature
3. ✅ Should work without CORS errors
4. ✅ Should work on both production and preview deployments

