import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp 
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

// ✅ Check config before initializing
if (!firebaseConfig.apiKey) {
  console.warn("Firebase not configured properly");
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ================= AUTH =================

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await addDoc(collection(db, 'users'), {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      createdAt: serverTimestamp(),
      type: 'signup'
    });

    return userCredential;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    await addDoc(collection(db, 'loginActivity'), {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      loginAt: serverTimestamp()
    });

    return userCredential;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// ================= CONTACT =================

export const submitContactForm = async (data: {
  name: string;
  phone: string;
  businessName: string;
  message: string;
}) => {
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