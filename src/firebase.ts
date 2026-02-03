import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyC3NwTyIpiEf_IL0HFOi4YdNs0AJEQxmE0',

  authDomain: 'inv8crm.firebaseapp.com',

  projectId: 'inv8crm',

  storageBucket: 'inv8crm.firebasestorage.app',

  messagingSenderId: '1003073812072',

  appId: '1:1003073812072:web:439eb8ef6a802c06ad6ddd',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
