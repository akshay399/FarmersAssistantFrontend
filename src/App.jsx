import React, { useRef, useEffect, useState } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import axios from "axios";
import SmoothScroll from "smooth-scroll";
import fire from "./fire";
import firebase from "firebase";
import "./App.css";
import Loader from "./components/Loader";

import {
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Signup from "./components/Signup";
import Crop from "./components/Crop";
import Fertilizer from "./components/Fertilizer";
import Disease from "./components/Disease";
import News from "./components/News";
import Dashboard from "./components/Dashboard";
import database from "mime-db";
import Visualise from "./components/Visualise";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  var database = firebase.database();
  const [loading, setLoading] = useState(true);
  //login
  const db = fire.database;
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

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
    // console.log("emailalla", email);
    // console.log("usert", user);
    // database.ref().child(user).set({
    //   email:email
    // })
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
    console.log("emailalla", email);
    console.log("usert", user);
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        console.log(user.uid);
        database.ref().child(user.uid).update({
          email: user.email,
        });
        var pullEmail;
        database.ref(user.uid).once("value", (snapshot) => {
          pullEmail = snapshot.val().email;
        });
        console.log("pulled from db email", pullEmail);
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
  const [landingPageData, setLandingPageData] = useState({});
  const fetchNews = async () => {
    const res = await axios.get(
      "https://farmers-assistant-backend.herokuapp.com/news"
    );
    setNews(res.data);

    setLoading(false);

    console.log(res.data);
  };

  useEffect(() => {
    fetchNews();
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <Navigation user={user} handleLogout={handleLogout} />
      <Switch>
        <Route exact path="/">
          <Header user={user} />
          <Features data={landingPageData.Features} />
          <About data={landingPageData.About} />
          {/* <Services data={landingPageData.Services} /> */}
          {/* <Gallery data={landingPageData.Gallery}/> */}
          {/* <Testimonials data={landingPageData.Testimonials} /> */}
          {/* <Team data={landingPageData.Team} /> */}
          {/* <Contact data={landingPageData.Contact} /> */}
        </Route>
        {user ? (
          <Route exact path="/dashboard">
            <Dashboard user={user} handleLogout={handleLogout} />
          </Route>
        ) : (
          <Route exact path="/signup">
            <Signup
              emial={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError}
            />
          </Route>
        )}
        <Route exact path="/crop">
          <Crop user={user} />
        </Route>
        <Route exact path="/fertilizer">
          <Fertilizer user={user} />
        </Route>
        <Route exact path="/disease">
          <Disease />
        </Route>
        <Route exact path="/news">
          {!loading ? <News news={news} /> : <Loader />}
        </Route>
        <Route exact path="/visualise">
          <Visualise user={user} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
