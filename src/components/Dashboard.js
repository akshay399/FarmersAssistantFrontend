import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Header } from './header';
import { Navigation } from './navigation';
  import newsStyles from './newsStyles'
  import useStyles from './newsStyles';

  function Dashboard(props) {
    const classes = useStyles();
    const {handleLogout, user} = props;
  console.log("user in dashboard", user);

    return (
        <>
         {/* <div className={classes.toolbar} /> */}
            {/* <div className={classes.toolbar} /> */}
            {/* <div className={classes.toolbar} /> */}
       <Header />
        </>
    )
}

export default Dashboard
