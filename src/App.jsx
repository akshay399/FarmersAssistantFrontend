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
import "./App.css";
import {
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Signup from "./components/Signup";
import Crop from "./components/Crop";
import Fertilizer from "./components/Fertilizer";
import Disease from "./components/Disease";
import News from "./components/News";
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  
  const [news, setNews] = useState([]);
  const [landingPageData, setLandingPageData] = useState({});
  const fetchNews = async () => {
    const res = await axios.get(
      "https://farmers-assistant-backend.herokuapp.com/news"
    );
    setNews(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchNews();
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
    
      <Navigation />
      <Switch>
      <Route exact path="/">

        <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery}/>
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
      </Route>
     <Route exact path="/signup"> 
          <Signup />
      </Route>
      <Route exact path="/crop"> 
          <Crop />
      </Route>
      <Route exact path="/fertilizer"> 
          <Fertilizer />
      </Route>
      <Route exact path="/disease"> 
          <Disease />
      </Route>
      <Route exact path="/news"> 
          <News news={news} />
      </Route>
      </Switch>
 
 
    </Router>
  );
};

export default App;
