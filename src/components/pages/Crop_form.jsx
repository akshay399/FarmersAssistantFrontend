import React from 'react'
import "./Crop.css";
import { useState } from "react";
import axios from "axios";
import {
    useHistory,
    
  } from "react-router-dom";
  import Result_crop from './Result_crop';


const Crop_form = () => {

const [nitrogen, setNitrogen] = useState();
  const [phosphorous, setPhosphorous] = useState();
  const [pottasium, setPottasium] = useState();
  const [ph, setPh] = useState();
  const [rainfall, setRainfall] = useState();
  const [city, setCity] = useState();
  const [resp,setResp] = useState();

  const predict = (e) =>{

    e.preventDefault();
   
    var sendObj = {
      nitrogen:nitrogen,
      pottasium:pottasium,
     phosphorous:phosphorous,
      ph:ph,
      rainfall:rainfall,
      city:city

    }
    console.log(sendObj);
    axios.post('/crop-predict',sendObj).then(response=>{
      console.log(response);
      setResp(response);
      document.getElementById('result').textContent = 'Predicted Crop: '+ response.data.prediction;
      

    })
    .catch(error=>{
      console.log(error);
    })
   

    

   

  }

    return (

       
        
        <>
        
       

            <div class="form-container">
        <form class="register-form">
          {/* <div class="success-message">Success! Thank you for registering</div> */}
          <input
            id="nitrogen"
            class="form-field"
            type="text"
            placeholder="Nitrogen"
            name="nitrogen"
            onChange={(e) => setNitrogen(e.target.value)}
          />
          <input
            id="phosphorous"
            class="form-field"
            type="text"
            placeholder="Phosphorous"
            name="phosphorous"
            onChange={(e) => setPhosphorous(e.target.value)}
          />

          {/* <span id="first-name-error">Please enter a first name</span> */}
          <input
            id="pottasium"
            class="form-field"
            type="text"
            placeholder="Pottasium"
            name="pottasium"
            onChange={(e) => setPottasium(e.target.value)}
          />

          {/* <span id="last-name-error">Please enter a last name</span> */}
          <input
            id="ph"
            class="form-field"
            type="text"
            placeholder="ph level"
            name="ph"
            onChange={(e) => setPh(e.target.value)}
          />
          <input
            id="rainfall"
            class="form-field"
            type="text"
            placeholder="Rainfall (in mm)"
            name="rainfall"
            onChange={(e) => setRainfall(e.target.value)}
          />
          <input
            id="city"
            class="form-field"
            type="text"
            placeholder="City"
            name="city"
            onChange={(e) => setCity(e.target.value)}
          />

          {/* <span id="email-error">Please enter an email address</span> */}
          <button class="form-field" type="submit" onClick={predict}>
            Predict
          </button>
        </form>
        <p id='result' class="result"></p>

      </div>

     
       
      

      

     </>
        
    )
}

export default Crop_form
