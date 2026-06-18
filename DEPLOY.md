# KDS Website Deployment Guide

## Architecture
- **Frontend**: Vercel (free) - React app
- **Backend**: Render (free) - Node.js + Express + SQLite

---

## Step 1: Deploy Backend to Render

1. Go to https://dashboard.render.com
2. Sign up/login with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repo (or use "Public Git repository" with your repo URL)
5. Configure:
   - **Name**: `kds-api`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. Click **"Advanced"** and add Environment Variables:
   - `PORT` = `10000`
   - `JWT_SECRET` = (generate a random string)
   - `CORS_ORIGIN` = `*` (or your Vercel URL after step 2)
7. Click **Create Web Service**

**Wait for deploy to complete** - you'll get a URL like `https://kds-api.onrender.com`

---

## Step 2: Update Frontend API URL

Edit `Client/src/config/api.js`:

```javascript
const rawApiBaseUrl = process.env.REACT_APP_API_URL || 'https://kds-api.onrender.com';
```

Replace `kds-api.onrender.com` with your actual Render URL.

---

## Step 3: Deploy Frontend to Vercel

### Option A: CLI (Fastest)

```bash
cd Client
npm i -g vercel
vercel
```

Follow prompts:
- Login with email or `vercel login`
- Set up project: `Y`
- Which scope: (your account)
- Link to existing: `N`
- Project name: `kds-website`
- Directory: `./` (current)

### Option B: Git Integration

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click **"Add New Project"**
4. Import your GitHub repo
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `Client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
6. Click **Deploy**

---

## Step 4: Update CORS (if needed)

After Vercel deploy, get your frontend URL (e.g., `https://kds-website.vercel.app`)

Go back to Render dashboard → your service → Environment → Edit:
- Change `CORS_ORIGIN` from `*` to your Vercel URL
- Redeploy

---

## URLs After Deploy

- **Frontend**: `https://kds-website.vercel.app`
- **Backend API**: `https://kds-api.onrender.com`
- **Admin Panel**: `https://kds-website.vercel.app/admin`
  - Username: `admin`
  - Password: `admin`

---

## Important Notes

1. **Render Free Tier**: Sleeps after 15 min inactivity. First request may take 30-60 seconds to wake up.

2. **Database**: SQLite is file-based and persists on Render's disk. It survives restarts but NOT if you redeploy manually (wiped on fresh deploy).

3. **Images**: Uploaded dog images are stored in `server/images/` on Render's disk. Same persistence rules as database.

4. **Custom Domain**: Both platforms support custom domains on free tiers.

---

## Troubleshooting

**CORS errors**: Check `CORS_ORIGIN` matches your frontend URL exactly

**API not working**: Check Render logs in dashboard

**Images not loading**: Ensure API URL is correct in `api.js`
