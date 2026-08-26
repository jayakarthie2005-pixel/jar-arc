import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp,
  Firestore
} from 'firebase/firestore';

// ✅ Load ENV values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// ✅ Validate config — only apiKey is strictly required by Firebase
const isConfigValid = !!firebaseConfig.apiKey;

// ✅ Only initialize if config is valid
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (isConfigValid) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
} else {
  console.warn('Firebase not configured — auth and Firestore are unavailable.');
}

// ================= AUTH =================

export const signUp = async (email: string, password: string) => {
  if (!auth) throw new Error('Firebase Auth is not configured.');
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (db) {
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        createdAt: serverTimestamp(),
        type: 'signup'
      });
    }

    return userCredential;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  if (!auth) throw new Error('Firebase Auth is not configured.');
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (db) {
      await addDoc(collection(db, 'loginActivity'), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        loginAt: serverTimestamp()
      });
    }

    return userCredential;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logOut = async () => {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

// ================= CONTACT =================

export const submitContactForm = async (data: {
  name: string;
  phone: string;
  businessName: string;
  message: string;
}) => {
  if (!db) throw new Error('Firebase Firestore is not configured.');
  try {
    return await addDoc(collection(db, 'contacts'), {
      ...data,
      createdAt: serverTimestamp(),
      status: 'new'
    });
  } catch (error) {
    console.error("Contact form error:", error);
    throw error;
  }
};

// ================= NEWSLETTER =================

export const subscribeNewsletter = async (email: string) => {
  if (!db) throw new Error('Firebase Firestore is not configured.');
  try {
    return await addDoc(collection(db, 'newsletter'), {
      email,
      subscribedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Newsletter error:", error);
    throw error;
  }
};
