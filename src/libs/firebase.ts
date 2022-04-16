import { getApp, getApps, initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'

export const config = {
  apiKey: 'AIzaSyCMNwUNsSCoipYJCnL_Y1970bI7gz7D5Sc',
  authDomain: 'lgtm-unsplash.firebaseapp.com',
  projectId: 'lgtm-unsplash',
  storageBucket: 'lgtm-unsplash.appspot.com',
  messagingSenderId: '995471791086',
  appId: '1:995471791086:web:acf0643bf1248b3bb7b4ff',
  measurementId: 'G-R0K6XSY8FP'
}

const isEmulator = () => {
  const useEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR
  return !!(
    useEmulator &&
    useEmulator === 'true' &&
    process.env.NODE_ENV !== 'production'
  )
}

const isInitializing = getApps().length === 0
const app = getApps().length ? getApp() : initializeApp(config)
const auth = getAuth(app)
auth.languageCode = 'ja'
const firestore = getFirestore(app)
const storage = getStorage(app)

if (isEmulator() && isInitializing) {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(firestore, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
}

export { app, auth, firestore, storage }
