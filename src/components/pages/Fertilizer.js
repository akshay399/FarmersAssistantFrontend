import React from 'react'
import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";


const customStyles = {
  content: {
    maxheight: "500px",
    maxwidth: "500px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

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

function Fertilizer() {

    const [nitrogen, setNitrogen] = useState();
  const [phosphorous, setPhosphorous] = useState();
  const [pottasium, setPottasium] = useState();
  const [cropname, setCropname] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [result , setResult] = useState();

  const predict = (e) =>{

    e.preventDefault();
   
    var sendObj = {
      nitrogen:nitrogen,
      pottasium:pottasium,
     phosphorous:phosphorous,
      cropname:cropname

    }
    console.log(sendObj);
    axios.post('https://farmers-assistant-backend.herokuapp.com/fertilizer-predict',sendObj).then(response=>{
      console.log("add this",response.data.fertilizer );
      setResult(response.data.fertilizer)
      setModalIsOpen(true);



    })
    .catch(error=>{
      console.log(error);
    })

   

  }
    return (
        <>
        {/* <Header navPosition="right" className="reveal-from-bottom" /> */}
      
        <h3 style={styles.textCenter}>🌾Fertilizer Recommendation 🌾</h3>
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
              id="cropname"
              class="form-field"
              type="text"
              placeholder="Crop name"
              name="cropname"
              onChange={(e) => setCropname(e.target.value)}
            />
            
  
            {/* <span id="email-error">Please enter an email address</span> */}
            <button class="form-field" type="submit" onClick={predict}>
              Predict 
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
        <p dangerouslySetInnerHTML = {{__html : result}}/>

        <div>
          {" "}
          <button onClick={() => setModalIsOpen(false)}> Close</button>
        </div>
      </Modal>
      </>
    )
}

export default Fertilizer
