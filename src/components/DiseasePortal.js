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
// import Carousel from "react-material-ui-carousel";
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
function DiseasePortal() {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const treatment = () => {
    setModalIsOpen(true);
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
                    // href={item.link}
                    target="_blank"
                    size="small"
                    variant="contained"
                    style={{ padding: "10px" }}
                  >
                    Products
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
      {/* <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      {/* </Card> */}
      {/* <div className="scraped-text" style={{ margin: "40px" }}>
        {data.length != 0 && (
          <ul style={{ color: "white", listStyleType: "none" }}>
            {Object.keys(new_data).map((ele, i) => (
              <li key={i} className="mb-6">
                <p>
                  <h1>{new_data[ele].title}</h1>
                  <img
                    style={{ width: "100px" }}
                    src={new_data[ele].image}
                  ></img>
                  <p>
                    data:
                    <div
                      dangerouslySetInnerHTML={{ __html: new_data[ele].data }}
                    ></div>
                  </p>

                  <u>Treatment:</u>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: new_data[ele].treatment,
                    }}
                  ></div>
                  <u>CURE AND PRODUCTS</u>
                  <ul>
                    {new_data[ele].products.map((one) => {
                      {
                        console.log("hello123", one.title);
                      }
                      return (
                        <>
                          <img src={one.image}></img>
                          <p>{one.title}</p>
                        </>
                      );
                    })}
                  </ul>

                  <hr style={{ width: "100%" }}></hr>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div> */}
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

export default DiseasePortal;
