import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyCfU0HZm-rZvSYRyMOZVYR7_SFzYnIli1M",
  authDomain: "pinterest-clone-abef1.firebaseapp.com",
  projectId: "pinterest-clone-abef1",
  storageBucket: "pinterest-clone-abef1.appspot.com",
  messagingSenderId: "471609728575",
  appId: "1:471609728575:web:cb3ab893f9664a7547628a",
  measurementId: "G-5HG2H3BRDK"
}


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()


export { auth, provider }
export default db;