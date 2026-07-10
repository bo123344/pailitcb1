# Pailit 💸
### Financial Punishment To-Do List

**Boost your productivity using loss aversion psychology.**

Instead of rewarding yourself for completed tasks, Pailit punishes you with fictional fines every time you fail or delay a scheduled task. It's brutally effective for procrastinators.

---

## 🎯 Key Features

- **Dynamic Fine Calculator** - Automatically sets fine amounts based on task deadline (morning = higher penalty)
- **Judgment System** - Get notification at deadline with 15-minute grace period to confirm completion
- **Nightly Report** - Full-screen recap at 21:00 showing today's success rate & total penalties
- **Sarcasm Engine** - Dynamic witty insults based on your monthly balance (in Indonesian)
- **Local Storage** - Zero account needed, all data stored locally in your browser
- **Responsive UI** - Works perfectly on mobile and desktop
- **No Real Money** - 100% fictional financial system, 0% guilt-free

---

## 📂 Project Structure

```
pailit/
├── package.json              # Dependencies & scripts
├── .gitignore               # Git ignore rules
├── public/
│   └── index.html           # HTML entry point
└── src/
    ├── index.js             # React mount point
    ├── App.jsx              # Main component (all logic here)
    └── App.css              # All styling
```

---

## 🚀 Quick Deploy

### **Vercel (Recommended - 1 minute)**
```bash
# 1. Create GitHub repo
# 2. Push this code
# 3. Connect to Vercel at https://vercel.com
# 4. Auto-deploys on every push
# Live at: yourname-pailit.vercel.app
```

### **Local Development**
```bash
npm install
npm start        # Runs on http://localhost:3000
npm run build    # Production build
```

See `PAILIT_DEPLOYMENT_GUIDE.md` for detailed setup.

---

## 💡 How It Works

### 1. **Create a Task**
- Task name: "Finish presentation"
- Deadline: 10:00 AM
- Auto-fine: Rp10,000 (morning tasks are expensive 😰)

### 2. **Notification at Deadline**
At 10:00, you get notified: *"Kelar atau Gagal?"*
- Say "Selesai" → task marked complete
- Say "Gagal" → Rp10,000 deducted from monthly balance
- No response → Auto-fails after 15 minutes

### 3. **Nightly Judgment (21:00)**
Full-screen report:
```
📋 Rapor Dosa Malam Hari
Total: 5 | Selesai: 3 | Gagal: 2
Total Denda Hari Ini: Rp22.000
```

### 4. **Monthly Punishment**
Balance goes **RED** when you're minus.

Dashboard taunts you with Indonesian sarcasm:
- **Rp0:** "Tumben rajin. Pertahankan, jangan hangat-hangat tahi ayam."
- **-Rp2K-15K:** "Mulai mager ya? Inget, miskin itu nyata, denda ini fiktif tapi kelakuan lu beneran males."
- **< -Rp50K:** "Minus banyak! Fix, dengan tingkat kemalasan kayak gini, cita-cita lu beli rumah cuma bakal jadi mimpi."

---

## ⚙️ Technical Stack

- **React 18** - UI framework
- **React Scripts** - Build tooling
- **localStorage** - Data persistence
- **Web Notifications API** - Push notifications
- **CSS3** - Responsive styling
- **Vercel** - Deployment platform

---

## 🎨 Customization

### Change Fine Amounts
Edit `getDynamicNominal()` in `App.jsx`

### Change Sarcasm Messages
Edit `getSarcasm()` in `App.jsx`

### Change Nightly Report Time
Edit the nightly check in useEffect

See `PAILIT_DEPLOYMENT_GUIDE.md` for more customization options.

---

## 📱 Browser Compatibility

✅ Chrome/Edge (desktop & mobile)  
✅ Firefox (desktop)  
✅ Safari (desktop & iOS 14+)  
⚠️ Samsung Internet (notifications may vary)

---

## ⚖️ Loss Aversion Psychology

Why Pailit works:
- **Loss aversion** is ~2x stronger than gain satisfaction
- Fines hurt more than rewards feel good
- Visual red balance triggers immediate action
- Sarcasm creates shame (productive shame 😅)
- Local data = no excuses to abandon

---

## 🔒 Privacy

✅ **Zero tracking** - No analytics  
✅ **Local only** - No backend  
✅ **No accounts** - Anonymous usage  
✅ **Your data stays yours** - Browser storage only  

---

## 📈 Future Roadmap

- [ ] Real money integration (scary!)
- [ ] Multi-device sync (Firebase)
- [ ] User accounts & leaderboards
- [ ] Recurring tasks
- [ ] Mobile app (React Native)
- [ ] Dark mode
- [ ] Habit tracking dashboard
- [ ] Social sharing with shame 😱

---

## 🤝 Contributing

Found a bug? Want to add features? Fork & PR!

---

## 📄 License

MIT - Use freely, modify, deploy, whatever.

---

## 💬 Feedback & Ideas

This is v1.0 MVP. What could make it more effective?
- Different sarcasm styles?
- Gamification elements (despite being anti-reward)?
- Custom fine schedules?
- Team/group accountability?

---

**Made with ❤️ for procrastinators who actually want to change.**

*"Denda ini fiktif, tapi kelakuan lu beneran males." - Pailit, probably*
