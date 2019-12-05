const fbConfig = {
    apiKey: "AIzaSyCrlr9L9ep8-MP4EpX-y-jwAcWoBDhJBkk",
    authDomain: "redux-courses.firebaseapp.com",
    databaseURL: "https://redux-courses.firebaseio.com",
    projectId: "redux-courses",
    storageBucket: "redux-courses.appspot.com",
    messagingSenderId: "28035354910",
    appId: "1:28035354910:web:8f08fd110c93a9fb18390f"
}

// react-redux-firebase config
const rrfConfig = {
    courses: 'courses'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

export {fbConfig, rrfConfig}