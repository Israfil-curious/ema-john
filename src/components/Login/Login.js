import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

function Login() {

  const provider = new firebase.auth.GoogleAuthProvider();
  
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      console.log(displayName, photoURL, email);
      const signedIn = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      }
      setUser(signedIn);
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
    })
  }

  const handleSignOut = () =>{
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

  const handleSubmit = (e) => {
    if(newUser && user.email && user.password) {
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

    if(!newUser && user.email && user.password) {
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
    
    e.preventDefault();
  }

  const handleBlur = (event) => {

    let isFieldValid = true;
    
    if(event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      
    }
    if(event.target.name === 'password') {
      
      const isContainedAtleastOneDigit = /[0-9]/.test(event.target.value) && /[a-z]/.test(event.target.value);
      isFieldValid = isContainedAtleastOneDigit;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
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

  return (
    <div style={{textAlign: "center"}}>
      {
        user.isSignedIn ?<button onClick={handleSignOut}>sign out</button> :
        <button onClick={handleSignIn}>sign in</button>
      }
      <br/>
      <button>Sign in with Facebook</button>
      {
        user.isSignedIn && <> <h5>Welcome {user.name}</h5> <img src={user.photo} alt=""/> <h5>Email: {user.email}</h5> </>
      }
      
      <h3>Authentication</h3>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New user Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Enter your full Name" required></input>}
        <br/>
        <input type="text" onBlur={handleBlur} name="email" placeholder="Email address" required />
        <br/>
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Password" required />
        <br/>
        <input type="submit" value="submit" />
      </form>
      <p style={{color: "red"}}>{user.error}</p>
      {user.success && <p style={{color:"green"}}>User {newUser ? 'created' : "logged in"} successfully</p> }
    </div>
  );
}

export default Login;
