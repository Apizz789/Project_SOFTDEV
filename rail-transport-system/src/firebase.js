import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyDwZnikVYpl2Rh8xMOSSIqO0HLXKaoxoOI",
    authDomain: "soft-dev-tutorial.firebaseapp.com",
    projectId: "soft-dev-tutorial",
    storageBucket: "soft-dev-tutorial.appspot.com",
    messagingSenderId: "361405349110",
    appId: "1:361405349110:web:64ce6526f3570436df80d7",
    measurementId: "G-KTBP691G7W"
})

export const auth = app.auth()
export default app