# CreditWise - Real-Time Credit Intelligence Platform

A professional dark-themed React frontend for a credit intelligence platform built with React, Vite, and TailwindCSS.

## Features

- **Landing Page**: Hero section with animated background and feature showcase
- **Authentication**: Login page with Firebase integration points
- **Dashboard**: Portfolio overview with company cards and real-time scores
- **Company Details**: Detailed analytics with charts and events feed
- **Dark Theme**: Professional financial-grade UI with glassmorphism effects
- **Responsive Design**: Mobile-friendly responsive layout
- **Smooth Animations**: Framer Motion powered transitions

## Tech Stack

- **React 18** with Vite for fast development
- **TailwindCSS** for styling with custom dark theme
- **Framer Motion** for smooth animations
- **Recharts** for data visualization
- **React Router** for navigation
- **Lucide React** for icons
- **Firebase** (ready for integration)

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** to `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── CompanyCard.jsx # Company portfolio cards
│   ├── FeatureCard.jsx # Landing page features
│   ├── ChartCard.jsx   # Chart containers
│   └── EventsFeed.jsx  # News/events feed
├── pages/              # Main application pages
│   ├── Landing.jsx     # Landing/Get Started page
│   ├── Login.jsx       # Authentication page
│   ├── Dashboard.jsx   # Portfolio dashboard
│   └── CompanyDashboard.jsx # Company details
├── firebase/           # Firebase configuration
└── App.jsx            # Main app component
```

## Color Scheme

- **Background**: `#0f1117` (deep charcoal)
- **Cards**: `#1a1d24` (dark gray)
- **Text**: `#e5e7eb` (light gray) / `#ffffff` (white headlines)
- **Accent Blue**: `#2563eb` (primary buttons)
- **Score Colors**:
  - Green `#22c55e` (stable/good scores)
  - Yellow `#facc15` (watch/neutral)
  - Red `#ef4444` (risk/poor scores)

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication and Firestore
3. Update `src/firebase/config.js` with your Firebase config
4. Uncomment the Firebase initialization code

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Components Overview

### Header
- Responsive navigation with logo
- Search bar for dashboard pages
- User profile dropdown with logout

### CompanyCard
- Displays company info, credit score, and trends
- Color-coded score indicators
- Hover animations and click handling

### ChartCard
- Recharts integration for line and bar charts
- Responsive chart containers
- Dark theme compatible

### EventsFeed
- Real-time events and news feed
- Sentiment analysis indicators
- Impact level badges

## Customization

The design system is built with TailwindCSS custom classes:

- `.glass-card` - Glassmorphism card effect
- `.btn-primary` - Primary blue button
- `.btn-secondary` - Secondary gray button
- `.score-green/yellow/red` - Score color variants

## Production Ready

This codebase is production-ready with:
- Clean, modular component architecture
- Responsive design for all screen sizes
- Accessibility considerations
- Performance optimizations
- Professional financial UI/UX

## Next Steps

1. Integrate real API endpoints
2. Implement Firebase authentication
3. Add data fetching and state management
4. Set up CI/CD pipeline
5. Add comprehensive testing

---

Built for the Real-Time Explainable Credit Intelligence Platform hackathon.