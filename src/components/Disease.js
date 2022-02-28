import React from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import useStyles from "./newsStyles";
import "./Disease.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
} from "react-router-dom";
import data from "../data/planet.json";
console.log("type of data", data);
Object.keys(data).map((ele, i) => console.log("hi", data[ele].title));
var stringg = JSON.stringify(data);
// console.log("beforee", stringg);
stringg = replaceAll(stringg, '</p>","<p>', "<p></p>");
stringg = replaceAll(stringg, '</li>","<li>', "</li> <li>");
// stringg = stringg.replace(/</p>","<p>/g, "</p><p>");
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}
// console.log("afterrr", stringg);
var new_data = JSON.parse(stringg);
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
  inp: {
    textAlign: "center",
    margin: "auto",
  },
  center: {
    margin: "50",
    width: "50%",
    border: "3px solid green",
    padding: "10px",
  },
};

export default function Disease() {
  const history = useHistory();
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [cause, setCause] = useState("");
  const [crop, setCrop] = useState("");
  const [cure, setCure] = useState("");
  const [disease, setDisease] = useState("");
  const [status, setStatus] = useState("");

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log("image change", e.target.files[0]);

      setSelectedImage(e.target.files[0]);
    }
  };

  const getHealth = (e) => {
    let file = selectedImage;
    let formdata = new FormData();
    formdata.append("file", file);

    console.log(e.target);
    console.log(selectedImage);
    axios({
      url: "https://farmers-assistant-backend.herokuapp.com/disease-predict",
      method: "POST",
      data: formdata,
    }).then((response) => {
      console.log("add this", response);
      console.log("preds", response.data.prediction);
      setCrop(response.data.prediction.Crop);
      setDisease(response.data.prediction.Disease);
      setCause(response.data.prediction.Cause);
      setCure(response.data.prediction.Cure);
      console.table("tab", crop, disease, cause, cure);
    });
    setModalIsOpen(true);
    // routeChange();
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  return (
    <>
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      <h3 style={styles.textCenter}>🌾Disease Detection🌾</h3>
      <div>
        <div className="m-3">
          {/* <div style={customStyles.center}> */}
          <div>
            <input
              className="inp"
              id="file"
              type="file"
              name="file"
              // id="image"
              onChange={imageChange}
            />
            <label for="file">
              <AddAPhotoIcon /> &nbsp; Choose a photo
            </label>
          </div>
          <div>
            {selectedImage && (
              <div style={styles.preview}>
                <img
                  id="image_api"
                  src={URL.createObjectURL(selectedImage)}
                  style={styles.image}
                  alt="Thumb"
                />
                <br />
                <button onClick={getHealth} style={styles.upload}>
                  Analyse the disease
                </button>
                <br />
                <button onClick={removeSelectedImage} style={styles.delete}>
                  Remove This Image
                </button>
              </div>
            )}
          </div>
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
        <p>
          Crop: <span style={{ color: "black", fontSize: "20px" }}>{crop}</span>
        </p>
        <p>
          Disease:{" "}
          <span style={{ color: "black", fontSize: "20px" }}>{disease}</span>
        </p>
        <p>
          Cause:{" "}
          <span style={{ color: "black", fontSize: "20px" }}>{cause}</span>
        </p>
        <p>
          Cure: <span style={{ color: "black", fontSize: "20px" }}>{cure}</span>
        </p>
        {/* <p>crop: {crop}</p> */}
        <div>
          {" "}
          <Button
            variant="contained"
            color="success"
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

// export default App;

// Just some styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  preview: {
    position: "relative",
    top: "200px",
    // marginTop: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
    width: "25%",
  },
  upload: {
    cursor: "pointer",
    margin: 10,
    padding: 15,
    background: "#38b000",
    color: "white",
    border: "none",
    width: "25%",
  },
  textCenter: {
    textAlign: "center",
  },
};
