import React from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./Crop.css";
import useStyles from "./newsStyles";
import firebase from "firebase";
import Button from "@mui/material/Button";

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

function Fertilizer(props) {
  var database = firebase.database();
  const { user } = props;
  const classes = useStyles();

  const [nitrogen, setNitrogen] = useState();
  const [phosphorous, setPhosphorous] = useState();
  const [pottasium, setPottasium] = useState();
  const [cropname, setCropname] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [result, setResult] = useState();

  var data;
  var pulledN;
  var pulledK;
  var pulledP;

  const getVlue = (e) => {
    var pullP;
    console.log("dot get", database.ref(user.uid).get());

    database.ref(user.uid).on("value", (snapshot) => {
      data = snapshot.val();
      console.log("data", data);
      for (let i in data) {
        console.log("this is i", i);
        console.log("in crop for loop", data[i]);
        pulledN = data["N"] || "4";
        pulledK = data["K"] || "5";
        pulledP = data["P"] || "9";
      }
      // console.log("snapshot", snapshot);
      // pullP = snapshot.val().email;
    });
    setPottasium(pulledK);
    setNitrogen(pulledN);
    setPhosphorous(pulledP);
  };

  const predict = (e) => {
    e.preventDefault();

    var sendObj = {
      nitrogen: nitrogen,
      pottasium: pottasium,
      phosphorous: phosphorous,
      cropname: cropname,
    };
    console.log(sendObj);
    axios
      .post(
        "https://farmers-assistant-backend.herokuapp.com/fertilizer-predict",
        sendObj
      )
      .then((response) => {
        console.log("add this", response.data.fertilizer);
        setResult(response.data.fertilizer);
        setModalIsOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      {/* <h3 style={styles.textCenter}>????Fertilizer Recommendation ????</h3> */}
      <div className="main__container">
        <div className="trial">
          <div className="col-xs-12 col-md-12 center2">
            <div className="about-text2" style={{}}>
              {/* <h2>Crop Recommendation</h2> */}
              <p>
                <li>
                  At the frontend the Npk, temp, ph, rainfall values are taken
                  and the crops that the farmer or person can grow in those
                  conditions is shown.
                </li>
                <li>
                  At the backend we???re using a dataset from Kaggle that has N,
                  P, K, temperature, humidity, ph, rainfall, and labe as it???s
                  inputs. And the model used is Random Forest.
                </li>
              </p>
            </div>
          </div>
        </div>
        <div class="form-container">
          <form class="register-form">
            {/* <div class="success-message">Success! Thank you for registering</div> */}
            <input
              id="nitrogen"
              class="form-field"
              type="text"
              value={nitrogen}
              placeholder="Nitrogen"
              name="nitrogen"
              onChange={(e) => setNitrogen(e.target.value)}
            />
            <input
              id="phosphorous"
              class="form-field"
              type="text"
              value={phosphorous}
              placeholder="Phosphorous"
              name="phosphorous"
              onChange={(e) => setPhosphorous(e.target.value)}
            />

            {/* <span id="first-name-error">Please enter a first name</span> */}
            <input
              id="pottasium"
              class="form-field"
              type="text"
              value={pottasium}
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
            <button class="form-field" type="button" onClick={getVlue}>
              Pull live value
            </button>
          </form>
        </div>
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
        <b dangerouslySetInnerHTML={{ __html: result }} />

        <div>
          {" "}
          <Button
            variant="contained"
            color="success"
            style={{ marginTop: "40" }}
            onClick={() => setModalIsOpen(false)}
          >
            {" "}
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Fertilizer;
