import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Header } from "./header";
import { Navigation } from "./navigation";
import newsStyles from "./newsStyles";
import useStyles from "./newsStyles";
import JsonData from "../data/data.json";
import { Features } from "./features";
import { About } from "./about";

function Dashboard(props) {
  const [landingPageData, setLandingPageData] = useState({});
  const classes = useStyles();
  const { handleLogout, user } = props;
  console.log("user in dashboard", user);
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <>
      {/* <div className={classes.toolbar} /> */}
      {/* <div className={classes.toolbar} /> */}
      {/* <div className={classes.toolbar} /> */}
      <Header user={user} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
    </>
  );
}

export default Dashboard;
