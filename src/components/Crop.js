import React from "react";
import "./Crop.css";
import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import useStyles from './newsStyles';


const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,
    },
    preview: {
      marginTop: 50,
      display: "flex",
      flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 320 },
    delete: {
      cursor: "pointer",
      padding: 15,
      background: "red",
      color: "white",
      border: "none",
    },
    upload: {
      cursor: "pointer",
      padding: 15,
      background: "green",
      color: "white",
      border: "none",
    },
    
    textCenter: {
      textAlign: "center",
    },
  };
  
  
  const customStyles = {
    content: {
      minWidth: "200px",
      minHeight: "200px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  
 
export default function Crop() {
    const classes = useStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [nitrogen, setNitrogen] = useState();
    const [result, setResult] = useState();
    const [phosphorous, setPhosphorous] = useState();
    const [pottasium, setPottasium] = useState();
    const [ph, setPh] = useState();
    const [rainfall, setRainfall] = useState();
    const [city, setCity] = useState();
  
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
      axios.post('https://farmers-assistant-backend.herokuapp.com/crop-predict',sendObj).then(response=>{
        console.log("add this",response.data.prediction);
        setResult(response.data.prediction);
        setModalIsOpen(true);
  
  
      })
      .catch(error=>{
        console.log(error);
      })

    }
    const getVlue = (e)=>{
      
      setNitrogen("72367")
      

    }
  
  
    return (
      <>

  {/* <AppRoute  component={Header} layout={LayoutDefault} /> */}
        
  <div className={classes.toolbar} />
            <div className={classes.toolbar} />
    {/* <h3 style={styles.textCenter}>🌾  Crop Prediction  🌾</h3> */}
        <div class="form-container">
          <form class="register-form">
            
            <input
              id="nitrogen"
              class="form-field"
              value={nitrogen}
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
            <button class="form-field" type="button" onClick={getVlue}>
              Pull live value 
            </button>
          </form>
          
        </div>
  
        <Modal style={customStyles} isOpen={modalIsOpen}>
          <h3
            style={{
              color: "#38b000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
  
            }}
          >
            Result:
           
          </h3>
          <div style={{
            
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
  
          }}>
          <p>{result}</p>
  
          <div>
            {" "}
            <button onClick={() => setModalIsOpen(false)}> Close</button>
            </div>
          </div>
        </Modal>
  
      </>
    );
  }
  