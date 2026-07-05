<div align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</div>

<h1 align="center">📋 Portfolio Dashboard</h1>
<p align="center">A standalone content management app for the sibasportfolio — sign in, edit, and publish changes instantly to Firestore.</p>

<div align="center">
  <a href="#✨-features">Features</a> •
  <a href="#🛠️-tech-stack">Tech Stack</a> •
  <a href="#🚦-getting-started">Getting Started</a> •
  <a href="#🔐-authorization">Authorization</a> •
  <a href="#📁-project-structure">Structure</a>
</div>

---

## ✨ Features

- **Google Sign-In** — Firebase Authentication with a simple login flow
- **Role-Based Access** — Only the authorized email can save changes; everyone else views in read-only mode with a clear badge
- **Live Preview** — Upload images and see them immediately in the editor
- **Image Compression** — Client-side resize to 600px max, JPEG 0.6 quality to stay within Firestore document limits
- **Gallery Uploader** — Upload multiple images for the portfolio's swipeable photo viewer
- **All Sections Covered** — Hero, About, Projects, Journey, and Contact editors with polished dark UI
- **Responsive Layout** — Collapsible sidebar on mobile, sticky header, per-tab icons
- **Local Fallback Data** — Default values pre-filled so you can start editing immediately

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vite + React |
| Routing | React Router |
| Styling | Tailwind CSS |
| Backend | Firebase Firestore + Auth |
| Animations | Framer Motion |
| Icons | Lucide React |

## 🚦 Getting Started

```bash
# Clone the repo
git clone https://github.com/sibap-dev/portdash.git
cd portdash

# Fill in your Firebase config + authorized email

# Install & run
npm install
npm run dev
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | ✅ | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | ✅ | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | ✅ | Firebase project ID |
| `VITE_FIREBASE_APP_ID` | ✅ | Firebase app ID |
| `VITE_AUTHORIZED_EMAIL` | ✅ | Email that can save changes (e.g., `you@gmail.com`) |

```bash
# Build for production
npm run build
```

## 🔐 Authorization

- **Anyone** with a Google account can sign in and browse the dashboard.
- Only the email set in `VITE_AUTHORIZED_EMAIL` can click the Save button.
- Non-authorized users see a yellow "Read-only view" badge and all save/project/journey mutation buttons are disabled.

## 🔗 Related

- [Portfolio](https://github.com/sibap-dev/sibasportfolio) — The portfolio site that this dashboard manages

## 🚀 Deployment

1. Run `npm run build`
2. Add your Vercel domain to **Firebase Console → Authentication → Authorized domains**

---

<div align="center">
  Built with ❤️ using Vite + React
</div>
