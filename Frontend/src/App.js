import "./App.css";
import FormUI from "./Components/form-ui";
import Login from "./Components/auth/login/login";
import {
  BrowserRouter,
  Router,
  Routes,
  Navigate,
  Route,
  useNavigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const logoutHandler = () => {
    sessionStorage.removeItem("data");
    setLoggedIn(false);
    navigate("/");
  };
  useEffect(() => {
    if (sessionStorage.getItem("data")) {
      setLoggedIn(true);
    }
  }, []);
  const loginHandler = () => {
    setLoggedIn(true);
  };
  console.log(loggedIn);
  return (
    <Routes>
      <Route
        path="/"
        element={
          !loggedIn ? (
            <Login login={loginHandler} />
          ) : (
            <div className="App">
              <video
                autoPlay
                loop
                muted
                className="video-container"
                src="https://videos.pexels.com/video-files/9665235/9665235-hd_1280_720_25fps.mp4"
              ></video>
              <div className="form-ui">
                <FormUI logout={logoutHandler}></FormUI>
              </div>
            </div>
          )
        }
      ></Route>
    </Routes>
  );
}

export default App;
