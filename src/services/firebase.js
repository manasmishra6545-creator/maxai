import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth'; // Uncomment when needed
// import { getFirestore } from 'firebase/firestore'; // Uncomment when needed

// Your web app's Firebase configuration
// This comes from the Firebase Console when you add a web app to your project.
// We use environment variables so you don't commit your keys to GitHub.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase only if config is provided
let app;
// let auth;
// let db;

try {
    if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY') {
        app = initializeApp(firebaseConfig);
        // auth = getAuth(app);
        // db = getFirestore(app);
        console.log("Firebase initialized successfully");
    } else {
        console.warn("Firebase config is missing or using placeholders. Firebase not initialized.");
    }
} catch (error) {
    console.error("Error initializing Firebase:", error);
}

export { app }; // Export auth and db here when uncommented above
