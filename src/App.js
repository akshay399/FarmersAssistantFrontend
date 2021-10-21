import React, { useRef, useEffect, useState } from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";
import News from "./components/pages/News";
import axios from "axios";


// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import Footer from "./components/layout/Footer";
import Crop from "./components/pages/Crop";
import DiseaseUpload from "./components/pages/DiseaseUpload";
import Fertilizer from "./components/pages/Fertilizer";
import Signup from "./components/pages/Signup";
import fire from "./fire";
import Dashboard from "./components/pages/Dashboard";


// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {
  //login
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  //cards
  // const [showAdvanced, setShowAdvanced] = useState(true);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);
  //login ends

  const [news, setNews] = useState([]);
  const childRef = useRef();
  let location = useLocation();

  const fetchNews = async () => {
    const res = await axios.get(
      "https://farmers-assistant-backend.herokuapp.com/news"
    );
    setNews(res.data);
    // console.log(res.data);
  };

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const getcropdata = (data)=>{
    console.log('in app.js',data);
  }

  return (
    <>
      <ScrollReveal
        ref={childRef}
        children={() => (
          <Switch>
            <AppRoute className="reveal-from-bottom" exact path="/" component={Home} layout={LayoutDefault} />
            <Route exact path="/news">
              <News news={news} />
            </Route>
            <Route exact path="/crop" component={Crop} layout={LayoutDefault} />
            <Route exact path="/disease_upload" component={DiseaseUpload} layout={LayoutDefault} />
            <Route exact path="/fertilizer" component={Fertilizer} layout={LayoutDefault} />
            {user ?( <Route exact path="/dashboard"><Dashboard  user={user} handleLogout={handleLogout}/></Route>
) : (<Route exact path="/signup">
              <Signup emial={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError} />
            </Route>) }
            
          </Switch>
        )}
      />
    </>
  );
};

export default App;
