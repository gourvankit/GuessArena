import "./login.css";
import { getAuth } from "firebase/auth";
import app from "../../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRef, useState } from "react";
const Login = (props) => {
  const auth = getAuth(app);
  const emailRef = useRef();
  const passwordRef = useRef();
  const emailSignupRef = useRef();
  const passwordSignupRef = useRef();
  const [clicked, setClicked] = useState(false);
  const provider = new GoogleAuthProvider();
  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        if (auth.currentUser.email) {
          sessionStorage.setItem("data", auth.currentUser.email);
        }
        const user = userCredential.user;
        console.log(user);
        props.login();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const clickHandler = () => {
    setClicked(true);
  };
  const signupHandler = (e) => {
    e.preventDefault();
    if (passwordSignupRef.current.value.length <= 6) {
      alert("weak");
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      emailSignupRef.current.value,
      passwordSignupRef.current.value
    );

    if (auth.currentUser.email) {
      sessionStorage.setItem("data", auth.currentUser.email);
    }
    props.login();
  };
  const loginhandler = () => {
    setClicked(false);
  };
  const googleLogin = () => {
    console.log(auth);
    signInWithPopup(auth, provider)
      .then((result) => {
        if (auth.currentUser.email) {
          sessionStorage.setItem("data", auth.currentUser.email);
        }

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        console.log(user);
        props.login();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <>
      <div className="image">
        <img
          src="https://img.freepik.com/free-photo/top-view-whisky-glass-sunglasses-casino-chips-poker-table_23-2147881039.jpg?w=2000&t=st=1717989532~exp=1717990132~hmac=1b54df9d7b280acb9468013d9971b7377eaed6afe7e8cc114c6b4b00b3622554"
          alt=""
          className="backgroundImage"
        />
      </div>
      {!clicked ? (
        <form onSubmit={submitHandler} className="loginForm">
          <span className="heading">Log in</span>
          <label htmlFor="username">Email</label>
          <input
            type="text"
            id="username"
            className="email"
            ref={emailRef}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            x
            id="password"
            className="password"
            ref={passwordRef}
            required
          />
          <div className="googleLogin" onClick={googleLogin}>
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
              alt=""
            />

            <span>Sign in with Google</span>
          </div>
          <button className="loginButton">Log in</button>
          <span className="already">
            Don't have account? <b onClick={clickHandler}>Sign up</b>
          </span>
        </form>
      ) : (
        <form onSubmit={signupHandler} className="loginForm">
          <span className="heading">Register</span>
          <label htmlFor="username">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="username"
            className="email"
            ref={emailSignupRef}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            className="password"
            ref={passwordSignupRef}
            required
          />
          <button className="signupButton">Sign up</button>
          <span className="already">
            Already have account? <b onClick={loginhandler}>Login</b>
          </span>
        </form>
      )}
    </>
  );
};
export default Login;
