import React from 'react'
import useStyles from './newsStyles';
import firebase from 'firebase';
import { useState, useEffect } from "react";



export default function Visualise(props) {
    var database = firebase.database();
    const {user} = props;
    const classes = useStyles();
    const [nitrogen, setNitrogen] = useState();
    const [phosphorous, setPhosphorous] = useState();
    const [pottasium, setPottasium] = useState();
    const[ph, setPh] = useState();
    var data 
    var pulledN
    var pulledK
    var pulledP
    var pulledPh
    useEffect(() => {
        console.log("loaded visualise")
    

    database.ref(user.uid).on("value", (snapshot)=>{
        data = snapshot.val();
       console.log("data", data)
       for(let i in data){
         console.log("this is i", i);
         console.log("in visualise for loop", data[i]);
         pulledN = data['N'] ;
         pulledK = data['K'] 
         console.log("-----------", pulledN)
         pulledP = data['P'] 
         pulledPh = data['ph'] 
       }
       setPottasium(pulledK);
       setNitrogen(pulledN) ;
       setPhosphorous(pulledP);
       setPh(pulledPh);
     })
    //  setPottasium(pulledK);
    //  setNitrogen(pulledN) ;
    //  setPhosphorous(pulledP);
    //  setPh(pulledPh);
     console.log("visualise", pulledN);
     console.log("visualise", pulledN);
     console.log("visualise", pulledN);
     console.log("visualise", pulledN);
      }, []);

    return (
        <div>
            <div className={classes.toolbar} />
            <div className={classes.toolbar} />
            {console.table("wthhhhh", nitrogen, pottasium, phosphorous, ph)}
            data Visualise: {nitrogen}
            data Visualise: {phosphorous}
            data Visualise: {pottasium}
            data Visualise: {ph}
        </div>
    )
}
