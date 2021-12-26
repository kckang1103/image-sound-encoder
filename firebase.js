// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile, signInWithPopup } from "firebase/auth";
import { getStorage, getDownloadURL, ref} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZrEI9H1_Nfwjfy_KW7iOeVAB3aB_6v8U",
  authDomain: "image-sound-encoder.firebaseapp.com",
  projectId: "image-sound-encoder",
  storageBucket: "image-sound-encoder.appspot.com",
  messagingSenderId: "374659811344",
  appId: "1:374659811344:web:8c61f72c98cddcfd33a295",
  measurementId: "G-7MH6P4RKZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log('auth state changed');
//     const pictureRef = ref(storage, 'users/' + user.uid + '/profilePicture');
//     getDownloadURL(pictureRef).then((url) => {
//       updateProfile(auth.currentUser, { photoURL: url }).then(()=> {
//         console.log('updating photoURL when logging in', url);
//       })
//     })
//   }
// })

export { auth, storage }
