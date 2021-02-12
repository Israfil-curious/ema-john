import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    firebase.initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      console.log(displayName, photoURL, email);
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      }
      return signedInUser;
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
    })
}


export const handleSignOut = () =>{
    console.log("SignOut Button was Clicked");

    firebase.auth().signOut()
    .then(res => {
      const user = {
        isSignedIn: false,
        name: '',
        email: ''
      }
      setUser(user);
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
}

export const createUserWithEmailAndPassword = () => {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        console.log(res);

        updateUserName(user.name);
    })
    .catch((error) => {
        
        const errorMessage = error.message;

        const newUserInfo = {...user};
        newUserInfo.success = false;
        newUserInfo.error = errorMessage;
        setUser(newUserInfo);

    });
}

export const signInWithEmailAndPassword = () => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);

        console.log("Signed Users Info", res.user);
    })
    .catch((error) => {
        const errorMessage = error.message;

        const newUserInfo = {...user};
        newUserInfo.success = false;
        newUserInfo.error = errorMessage;
        setUser(newUserInfo);
    });
}

const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    })
    .then(function() {
      console.log("User name updated successfully");
    })
    .catch(function(error) {
      console.log(error);
    });
  }