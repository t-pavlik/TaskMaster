import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBZ1v0BdHYZaGHl_8sNjvFRcTkQLRdM2EM",
    authDomain: "taskmaster-b12c1.firebaseapp.com",
    databaseURL: "https://taskmaster-b12c1-default-rtdb.firebaseio.com",
    projectId: "taskmaster-b12c1",
    storageBucket: "taskmaster-b12c1.appspot.com",
    messagingSenderId: "1058871323327",
    appId: "1:1058871323327:web:27ef5b948e1e606530740a",
    measurementId: "G-W1TC4S73MZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {
    db
}