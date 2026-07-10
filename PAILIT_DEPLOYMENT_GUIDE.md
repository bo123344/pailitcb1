# Pailit - Deployment & Setup Guide

**Pailit** adalah Financial Punishment To-Do List app yang sudah production-ready. Deploy dalam **2 menit** ke Vercel atau platform lainnya.

---

## 📋 Quick Start (Vercel - Recommended)

### Prerequisites
- GitHub account (free)
- Vercel account (free, connect ke GitHub)

### Step 1: Setup Repo (5 minutes)

1. **Create new GitHub repo** bernama `pailit` (kosongkan, jangan init README)

2. **Clone ke lokal:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/pailit.git
   cd pailit
   ```

3. **Copy files structure:**
   ```
   pailit/
   ├── package.json          (dari pailit-package.json)
   ├── .gitignore            (dari pailit-.gitignore)
   ├── public/
   │   └── index.html        (dari pailit-index.html)
   └── src/
       ├── index.js          (dari pailit-index.js)
       ├── App.jsx           (dari pailit-App.jsx)
       └── App.css           (dari pailit-App.css)
   ```

4. **Initialize & push:**
   ```bash
   git add .
   git commit -m "Initial commit: Pailit MVP"
   git push -u origin main
   ```

### Step 2: Deploy to Vercel (1 minute)

1. Go to https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. **Import from Git** → select your `pailit` repo
4. Vercel auto-detects React → Click **Deploy**
5. **Done!** Your app is live at `pailit.vercel.app` (custom domain available)

---

## 🖥️ Alternative: Local Development

Prefer testing locally first before deploying?

### Setup

1. **Install Node.js 16+** from https://nodejs.org/ (if not installed)

2. **Install dependencies:**
   ```bash
   cd pailit
   npm install
   ```

3. **Start dev server:**
   ```bash
   npm start
   ```
   - Opens automatically at `http://localhost:3000`
   - Hot-reload enabled (changes auto-reflect)

4. **Build for production:**
   ```bash
   npm run build
   ```
   - Creates `/build` folder ready to deploy anywhere

---

## 🌐 Other Deployment Options

### Option A: Netlify (Also Free)
1. Go to https://netlify.com
2. Drag-and-drop `/build` folder OR connect GitHub repo
3. Deploy in seconds

### Option B: GitHub Pages (Free, but requires extra config)
1. Add to `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/pailit"
   ```
2. Install & deploy:
   ```bash
   npm install --save-dev gh-pages
   npm run build
   npx gh-pages -d build
   ```

### Option C: Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize: `firebase init hosting`
3. Build & deploy: `npm run build && firebase deploy`

---

## ✨ Features Included

✅ **Dashboard** - Total pailit balance, sarcasm widget  
✅ **Create Tasks** - Auto-calculated fines based on deadline time  
✅ **Today's To-Do** - Chronologically sorted task list  
✅ **Judgment System** - 15-minute grace period after deadline  
✅ **Nightly Report** - 21:00 popup with daily stats  
✅ **Sarcasm Engine** - Dynamic taunts based on balance  
✅ **Local Storage** - All data persists in browser  
✅ **Notifications** - Browser push notifications at judgment time  
✅ **Responsive** - Works on mobile & desktop  

---

## 🔧 Customization

### Change Sarcasm Messages
Edit `getSarcasm()` function in `App.jsx`:
```javascript
const getSarcasm = (balance) => {
  if (balance === 0) {
    return 'Your custom message here';
  }
  // ... more conditions
};
```

### Change Fine Amounts
Edit `getDynamicNominal()` in `App.jsx`:
```javascript
const getDynamicNominal = (time) => {
  const hour = parseInt(time.split(':')[0]);
  if (hour >= 5 && hour < 12) return 15000; // Changed from 10000
  // ... rest
};
```

### Change Nightly Report Time
In the `useEffect` hook for nightly report, change:
```javascript
if (currentTime === '21:00') { // Change to desired time
```

### Custom Domain (Vercel)
1. In Vercel dashboard → Project settings → Domains
2. Add your custom domain
3. Update DNS records (Vercel provides instructions)

---

## 📱 PWA Setup (Optional - Make it App-like)

Add `public/manifest.json`:
```json
{
  "name": "Pailit",
  "short_name": "Pailit",
  "description": "Financial Punishment To-Do List",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#667eea",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect fill='%23667eea' width='192' height='192'/><text x='50%' y='50%' font-size='120' fill='white' text-anchor='middle' dy='.3em'>💸</text></svg>",
      "sizes": "192x192",
      "type": "image/svg+xml",
      "purpose": "any"
    }
  ]
}
```

Then reference in `public/index.html`:
```html
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```

---

## 🐛 Troubleshooting

### "npm: command not found"
→ Install Node.js from https://nodejs.org/

### "Module not found" after git push
```bash
rm -rf node_modules package-lock.json
npm install
```

### Notifications not working?
- Browser must request permission (handled in App.jsx)
- Some browsers (iOS Safari) have limitations
- Check browser's notification settings

### Deadline checks not working?
- The app checks every minute
- Make sure device time is correct
- System sleep might pause background checks

---

## 📧 Support & Questions

Need help? Check:
1. **Vercel Docs**: https://vercel.com/docs
2. **React Docs**: https://react.dev
3. **Browser Console** (F12) for error messages

---

## 🚀 Next Steps (Post-MVP)

Ideas for future versions:
- Backend + database (Firebase, Supabase, MongoDB)
- User accounts & sync across devices
- Real payment integration (optional)
- Leaderboards & social sharing
- Recurring tasks
- Habit tracking
- Mobile app (React Native)
- Dark mode
- Multiple currencies

---

**Selamat deploy! Semoga Pailit bikin lu lebih produktif. 💪**
