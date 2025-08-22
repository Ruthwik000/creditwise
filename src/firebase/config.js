// Firebase configuration
// This file reads config from Vite env vars (recommended) and falls back to
// the values that were previously in the file. If your API key is invalid
// Firebase will still return an error — see guidance below.
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDXnB3fDoHH_Pl13T3WP204Hvxm7r2lwGU',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'credit-56b8f.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'credit-56b8f',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'credit-56b8f.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '480634337467',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:480634337467:web:e50f3690c99b919026919e',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-DKJQ6HWVGQ'
}

function validateConfig(cfg) {
  if (!cfg.apiKey || cfg.apiKey === 'your-api-key') {
    console.error('\nFirebase config is missing a valid apiKey.\n' +
      'Set VITE_FIREBASE_API_KEY in an .env file or replace the values in src/firebase/config.js\n' +
      'Example .env: VITE_FIREBASE_API_KEY=AIza...')
    return false
  }
  return true
}

// Initialize only once
let app = null
try {
  if (validateConfig(firebaseConfig)) {
    app = initializeApp(firebaseConfig)
  } else {
    // still initialize so imports don't break, but calls will fail with clear console message
    app = initializeApp(firebaseConfig)
  }
} catch (err) {
  console.error('Firebase initialization error:', err)
}

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { app, auth, googleProvider, firebaseConfig }