import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import LayoutDefault from '../../layouts/LayoutDefault';
import AppRoute from '../../utils/AppRoute';
import Home from '../../views/Home';

  
  

function Dashboard(props) {
    const {handleLogout, user} = props;
    return (
        <div>
          {console.log("in dashboard user is: ", user)}
            <AppRoute exact user={user} component={Home} layout={LayoutDefault} />
            <h2>THIS IS DASHBOARD</h2>
            <Link to ="/"><button className="heroButton" onClick={handleLogout}>
            Logout
          </button></Link>
        </div>
    )
}

export default Dashboard
