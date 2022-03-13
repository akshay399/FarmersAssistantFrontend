import React from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import useStyles from "./newsStyles";
import "./Disease.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
} from "react-router-dom";
import data from "../data/planet.json";
import Spinner from "react-bootstrap/Spinner";

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
    minHeight: "450px",
    minWidth: "950px",
    height: "auto",
    maxwidth: "500px",
    height: "auto",
    top: "50%",
    left: "50%",
    right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
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
  const [imageUri, setImageUri] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
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
      url: "http://64.227.170.225:8000/disease-predict",
      method: "POST",
      data: formdata,
    }).then((response) => {
      console.log("add this", response);
      console.log("preds", response.data.prediction);
      setCrop(response.data.prediction.Crop);
      setDisease(response.data.prediction.Disease);
      setCause(response.data.prediction.Cause);
      setCure(response.data.prediction.Cure);
      setImageUri(response.data.explanation);
      console.table("tab", crop, disease, cause, cure);
      setLoading(false);
    });
    setModalIsOpen(true);
    setLoading(true);
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
      <Modal
        style={{ position: "relative", zIndex: "100001", display: "grid" }}
        style={customStyles}
        isOpen={modalIsOpen}
      >
        <div className="modal__components">
          <h3
            style={{
              color: "#38b000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {" "}
            {/* <Spinner animation="border" /> */}
            <h1>Result</h1>
            <hr style={{ width: "100%" }}></hr>
          </h3>
          {/* --------- */}
          {loading ? (
            <CircularProgress color="success" />
          ) : (
            <div>
              <p>
                <b style={{ fontSize: "20px" }}>Crop:</b>{" "}
                <span style={{ color: "black", fontSize: "20px" }}>{crop}</span>
              </p>
              <p>
                <b style={{ fontSize: "20px" }}>Disease: </b>
                <span style={{ color: "black", fontSize: "20px" }}>
                  {disease}
                </span>
              </p>
              <p>
                <b style={{ fontSize: "20px" }}>Cause: </b>
                <span style={{ color: "black", fontSize: "20px" }}>
                  {cause}
                </span>
              </p>
              <p>
                <b style={{ fontSize: "20px" }}>Cure: </b>
                <span style={{ color: "black", fontSize: "20px" }}>{cure}</span>
              </p>
              <hr style={{ width: "100%" }}></hr>

              {/* ------------- */}
              <h1 style={{ color: "black" }}>LIME implementation</h1>
              <h3 style={{ color: "black" }}>
                The green part shows the portion of the leaf which is most
                affected by the disease.
              </h3>

              <div id="index-gallery">
                {/* <div
                  style={{ float: "left", padding: "10px" }}
                  className="item"
                >
                  <img src={URL.createObjectURL(selectedImage)} alt="" />
                  <p>Orignal image</p>
                </div> */}

                <div
                  style={{ float: "right", padding: "10%" }}
                  className="item"
                >
                  <img style={styles.imageUri} src={imageUri} alt="" />
                  {/* <p style={{ marginLeft: "100%" }}>
                    <b>LIME</b>
                  </p> */}
                </div>
              </div>

              {/* ------------- */}
              {/* <div className="compare__images">
                <div className="orignal__image">
                  <img
                    style={{ float: "left", marginLeft: "10%" }}
                    src={URL.createObjectURL(selectedImage)}
                    // style={styles.image}
                    alt="Thumb"
                  />
                  <p style={{ float: "left", marginLeft: "10%" }}>
                    {" "}
                    Your text{" "}
                  </p>
                </div>
                <div className="lime__image">
                  <img
                    style={{ float: "right", marginRight: "10%" }}
                    src={imageUri}
                  ></img>
                </div>
              </div> */}
              <br></br>
              <button
                onClick={() => setModalIsOpen(false)}
                style={styles.close}
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* --------------- */}
        {/* <div>
          {" "}
          <Button
            style={{ height: "50px", width: "70px" }}
            variant="contained"
            color="success"
            onClick={() => setModalIsOpen(false)}
          >
            {" "}
            <span style={{""}}>Close</span>
          </Button>
        </div> */}
        {/* <button onClick={() => setModalIsOpen(false)} style={styles.close}>
          Close
        </button> */}
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
  close: {
    padding: 15,
    background: "#38b000",
    color: "white",
    border: "none",
    cursor: "pointer",
    // marginTop: "5%",
    marginLeft: "50%",
  },
  imageUri: {
    padding: 9,
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: "5%",
    marginLeft: "25%",
  },
  textCenter: {
    textAlign: "center",
  },
};
