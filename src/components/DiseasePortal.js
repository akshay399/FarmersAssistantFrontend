import React from "react";
import { useState } from "react";

import useStyles from "./newsStyles";
import data from "../data/planet.json";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import "./DiseasePortal.css";
import Modal from "react-modal";
import { Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
console.log("type of data", data);
Object.keys(data).map((ele, i) => console.log("hi", data[ele].title));
var stringg = JSON.stringify(data);
stringg = replaceAll(stringg, '</p>","<p>', "<p></p>");
stringg = replaceAll(stringg, '</li>","<li>', "</li> <li>");
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}
var nested_obj = "";
var new_data = JSON.parse(stringg);
var propertyValues = [];
new_data.map((ele, i) => {
  console.log("single elemet", ele.products);
  propertyValues.push(Object.values(ele.products));
});
console.log("cut down", propertyValues);
const customStyles = {
  content: {
    // maxheight: "500px",
    // maxwidth: "500px",
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
function DiseasePortal() {
  const [treat, setTreat] = useState("");
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productModalIsOpen, setProductModalIsOpen] = useState(false);
  const treatment = () => {
    alert("work");
    setModalIsOpen(true);
  };
  const displayProducts = () => {
    setProductModalIsOpen(true);
  };

  return (
    <>
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={3}>
        {Object.keys(new_data).map((ele, i) => (
          <>
            <Grid
              // container
              // spacing={2}
              key={i}
              item
              xs={12}
              sm="auto"
              md="auto"
              lg="auto"
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="240"
                  width="auto"
                  objectFit="cover"
                  image={new_data[ele].image}
                  alt="news image"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    noWrap
                    fontWeight="bold"
                    fontSize="13"
                  >
                    <div
                      className="data__text"
                      dangerouslySetInnerHTML={{ __html: new_data[ele].data }}
                    ></div>
                  </Typography>
                </CardContent>
                <CardActions style={{ float: "right" }}>
                  <Button
                    // href={item.link}
                    target="_blank"
                    size="small"
                    variant="contained"
                    style={{ padding: "10px" }}
                    onClick={treatment}
                  >
                    Treatments
                  </Button>
                  <Button
                    target="_blank"
                    size="small"
                    variant="contained"
                    style={{ padding: "10px" }}
                    onClick={displayProducts}
                  >
                    Products
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Modal isOpen={modalIsOpen}>
              <>
                <div style={{ marginTop: "40px" }} />
                <h3
                  style={{
                    color: "#38b000",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  Treatment:
                </h3>

                <div
                  dangerouslySetInnerHTML={{
                    __html: new_data[ele].treatment,
                  }}
                >
                  {console.log("jaja", ele)}
                </div>
                <div>
                  {" "}
                  <Button
                    variant="contained"
                    color="success"
                    style={{ marginTop: "40", marginBottom: "20" }}
                    onClick={() => setModalIsOpen(false)}
                  >
                    {" "}
                    Close
                  </Button>
                </div>
              </>
            </Modal>
            <Modal
              // style={{ width: "80px" }}
              // style={
              //   (customStyles, { width: "auto", height: "auto", padding: "50px" })
              // }
              isOpen={productModalIsOpen}
            >
              <>
                <div style={{ marginTop: "40px" }} />
                <h3
                  style={{
                    color: "#38b000",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  PRODUCTS:
                </h3>
                <Carousel
                  onClick={treatment}
                  style={{ marginTop: "50px", height: "auto" }}
                >
                  {new_data[ele].products.map((one, i) => {
                    return (
                      <>
                        <img style={{ height: "auto" }} src={one.image}></img>
                        <p>{one.title}</p>
                        <a herf={one.link}>Get the product</a>
                      </>
                    );
                  })}
                </Carousel>
                <div>
                  {" "}
                  <Button
                    variant="contained"
                    color="success"
                    style={{ marginTop: "40", marginBottom: "20" }}
                    onClick={() => setProductModalIsOpen(false)}
                  >
                    {" "}
                    Close
                  </Button>
                </div>
              </>
            </Modal>
          </>
        ))}
      </Grid>

      {/* <Modal
        // style={{ width: "80px" }}
        // style={
        //   (customStyles, { width: "auto", height: "auto", padding: "50px" })
        // }
        isOpen={productModalIsOpen}
      >
        <>
          <div style={{ marginTop: "40px" }} />
          <h3
            style={{
              color: "#38b000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            PRODUCTS:
          </h3>
          <Carousel style={{ marginTop: "50px", height: "auto" }}>
            {Object.keys(new_data).map((ele, i) => {
              return (
                <p
                  dangerouslySetInnerHTML={{
                    __html: new_data[ele].treatment,
                  }}
                ></p>
              );
            })}
          </Carousel>
          <div>
            {" "}
            <Button
              variant="contained"
              color="success"
              style={{ marginTop: "40", marginBottom: "20" }}
              onClick={() => setModalIsOpen(false)}
            >
              {" "}
              Close
            </Button>
          </div>
        </>
      </Modal> */}
    </>
  );
}

export default DiseasePortal;
