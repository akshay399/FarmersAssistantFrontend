import React from "react";
import { useState } from "react";
import Header from "../layout/Header";
import axios from "axios";
// import { useHistory } from "react-router-dom";

// import { Link } from "react-router-dom";
import Modal from "react-modal";
import {
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
} from "react-router-dom";

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

const DiseaseUpload = () => {
  const history = useHistory();
  // const routeChange = () => {
  //   let path = `disease_result`;
  //   history.push(path);
  // };
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
      {/* <Header /> */}
      <h3 style={styles.textCenter}>🌾Disease Detection🌾</h3>
      <div className="m-3">
        <input type="file" name="file" id="image" onChange={imageChange} />

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
          <button onClick={() => setModalIsOpen(false)}> Close</button>
        </div>
      </Modal>
    </>
  );
};

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
export default DiseaseUpload;