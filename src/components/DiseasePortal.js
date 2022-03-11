import React from "react";
import { useState } from "react";
import getProduct from "./getProductImage.jpg";
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
import ShowMoreText from "react-show-more-text";

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
  const [modalTreatment, setModalTreatment] = useState("");
  const [productModal, setProductModal] = useState([]);
  const [treat, setTreat] = useState("");
  const [aboutDisease, setAboutDisease] = useState([]);
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productModalIsOpen, setProductModalIsOpen] = useState(false);
  const [aboutModalIsOpen, setAboutModalIsOpen] = useState(false);
  const [moreText, setMoreText] = useState("");
  const showMore = (index) => {
    console.log("is expanded:", index, new_data[index].data);
  };
  const treatment = (index) => {
    console.log("index from param", index);
    setModalTreatment(new_data[index].treatment);
    setModalIsOpen(true);
  };
  const readMore = (index) => {
    console.log(new_data[index].data);
    setAboutDisease(new_data[index].data);
    setAboutModalIsOpen(true);
  };
  const displayProducts = (index) => {
    console.log("product on click", new_data[index].products);
    setProductModal(new_data[index].products);
    setProductModalIsOpen(true);
  };

  const truncate = (str) => {
    str = str[0];
    // setMoreText(str);
    console.log(
      "truncate",
      str.substring(0, 7) + <span onClick={() => treatment(0)}>"..."</span>
    );
    let pass = `${str.substring(
      0,
      50
    )} <span style="cursor:pointer" onClick={console.log({new_data[ele].data})}>read more</span>`;
    // console.log("passs", pass);
    return <span dangerouslySetInnerHTML={{ __html: pass }}></span>;
  };

  return (
    <>
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      {console.log("trial data", new_data[0])}
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
                  <u>
                    <h3
                      className="data__text"
                      dangerouslySetInnerHTML={{ __html: new_data[ele].title }}
                    ></h3>
                  </u>
                </CardContent>
                <CardActions style={{ float: "right" }}>
                  <Button
                    // href={item.link}
                    target="_blank"
                    size="small"
                    variant="contained"
                    style={{ padding: "10px" }}
                    onClick={() => readMore(ele)}
                  >
                    Read more
                  </Button>
                  <Button
                    // href={item.link}
                    target="_blank"
                    size="small"
                    variant="contained"
                    style={{ padding: "10px" }}
                    onClick={() => treatment(ele)}
                  >
                    Treatments
                  </Button>
                  <Button
                    target="_blank"
                    size="small"
                    variant="contained"
                    style={{ padding: "10px" }}
                    onClick={() => displayProducts(ele)}
                  >
                    Products
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Modal isOpen={aboutModalIsOpen}>
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
                  Data:
                </h3>
                <div
                  style={{ padding: "5%" }}
                  dangerouslySetInnerHTML={{
                    __html: aboutDisease,
                  }}
                >
                  {/* {console.log("jaja", ele)} */}
                </div>
                <div>
                  {" "}
                  <Button
                    variant="contained"
                    color="success"
                    style={{ marginTop: "10", marginBottom: "20" }}
                    onClick={() => setAboutModalIsOpen(false)}
                  >
                    {" "}
                    Close
                  </Button>
                </div>
              </>
            </Modal>
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
                {/* <h3>{modalTreatment}</h3> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: modalTreatment,
                  }}
                >
                  {/* {console.log("jaja", ele)} */}
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
              style={{ height: "150px", width: "80px" }}
              style={(customStyles, { width: "auto", padding: "50px" })}
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
                <Carousel style={{ color: "red" }}>
                  {productModal.map((one, i) => {
                    return (
                      <div
                        style={{
                          display: "grid",
                          height: "300px",
                          justifyContent: "center",
                        }}
                      >
                        <a style={{}} target="_blank" href={one.link}>
                          <img
                            style={{ height: "200px" }}
                            src={one.image}
                          ></img>
                          <br></br>
                          <br></br>
                          <img
                            style={{ height: "20px", marginLeft: "50px" }}
                            src={getProduct}
                          ></img>
                        </a>
                        <p style={{ marginLeft: "25 px" }}>{one.title}</p>
                      </div>
                    );
                  })}
                </Carousel>
                <div>
                  {" "}
                  <Button
                    style={{ position: "relative" }}
                    variant="contained"
                    color="success"
                    style={{ marginTop: "15", marginBottom: "10px" }}
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
    </>
  );
}

export default DiseasePortal;

// import React from "react";
// import { useState } from "react";
// import getProduct from "./getProductImage.jpg";
// import useStyles from "./newsStyles";
// import data from "../data/planet.json";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Grid from "@material-ui/core/Grid";
// import "./DiseasePortal.css";
// import Modal from "react-modal";
// import ShowMoreText from "react-show-more-text";

// import { Paper } from "@mui/material";
// import Carousel from "react-material-ui-carousel";
// console.log("type of data", data);
// Object.keys(data).map((ele, i) => console.log("hi", data[ele].title));
// var stringg = JSON.stringify(data);
// stringg = replaceAll(stringg, '</p>","<p>', "<p></p>");
// stringg = replaceAll(stringg, '</li>","<li>', "</li> <li>");
// function replaceAll(str, find, replace) {
//   return str.replace(new RegExp(find, "g"), replace);
// }
// var nested_obj = "";
// var new_data = JSON.parse(stringg);
// var propertyValues = [];
// new_data.map((ele, i) => {
//   console.log("single elemet", ele.products);
//   propertyValues.push(Object.values(ele.products));
// });
// console.log("cut down", propertyValues);
// const customStyles = {
//   content: {
//     // maxheight: "500px",
//     // maxwidth: "500px",
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };
// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: 50,
//   },
//   preview: {
//     marginTop: 50,
//     display: "flex",
//     flexDirection: "column",
//   },
//   image: { maxWidth: "100%", maxHeight: 320 },
//   delete: {
//     cursor: "pointer",
//     padding: 15,
//     background: "red",
//     color: "white",
//     border: "none",
//   },
//   upload: {
//     cursor: "pointer",
//     padding: 15,
//     background: "green",
//     color: "white",
//     border: "none",
//   },
//   textCenter: {
//     textAlign: "center",
//   },
// };
// function DiseasePortal() {
//   const [modalTreatment, setModalTreatment] = useState("");
//   const [productModal, setProductModal] = useState([]);
//   const [treat, setTreat] = useState("");
//   const classes = useStyles();
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [productModalIsOpen, setProductModalIsOpen] = useState(false);
//   const [moreText, setMoreText] = useState("");
//   const showMore = (index) => {
//     console.log("is expanded:", index, new_data[index].data);
//   };
//   const treatment = (index) => {
//     console.log("index from param", index);
//     setModalTreatment(new_data[index].treatment);
//     setModalIsOpen(true);
//   };
//   const displayProducts = (index) => {
//     console.log("product on click", new_data[index].products);
//     setProductModal(new_data[index].products);
//     setProductModalIsOpen(true);
//   };

//   const truncate = (str) => {
//     str = str[0];
//     // setMoreText(str);
//     console.log(
//       "truncate",
//       str.substring(0, 7) + <span onClick={() => treatment(0)}>"..."</span>
//     );
//     let pass = `${str.substring(
//       0,
//       50
//     )} <span style="cursor:pointer" onClick={console.log({new_data[ele].data})}>read more</span>`;
//     // console.log("passs", pass);
//     return <span dangerouslySetInnerHTML={{ __html: pass }}></span>;
//   };

//   return (
//     <>
//       <div className={classes.toolbar} />
//       <div className={classes.toolbar} />
//       {console.log("trial data", new_data[0])}
//       <Grid container justifyContent="center" spacing={3}>
//         {Object.keys(new_data).map((ele, i) => (
//           <>
//             <Grid
//               // container
//               // spacing={2}
//               key={i}
//               item
//               xs={12}
//               sm="auto"
//               md="auto"
//               lg="auto"
//             >
//               <Card sx={{ maxWidth: 345 }}>
//                 <CardMedia
//                   component="img"
//                   height="240"
//                   width="auto"
//                   objectFit="cover"
//                   image={new_data[ele].image}
//                   alt="news image"
//                 />
//                 <CardContent>
//                   <u>
//                     <h3
//                       className="data__text"
//                       dangerouslySetInnerHTML={{ __html: new_data[ele].title }}
//                     ></h3>
//                   </u>
//                   {/* <Typography
//                     gutterBottom
//                     variant="body2"
//                     component="div"
//                     noWrap
//                     style={{ marginTop: "-10px" }}
//                     fontWeight="bold"
//                     fontSize="13"
//                   >
//                     <div
//                       className="data__text"
//                       dangerouslySetInnerHTML={{ __html: new_data[ele].data }}
//                     ></div>
//                   </Typography> */}
//                   {/* <ShowMoreText
//                     lines={3}
//                     more="Show more"
//                     less="Show less"
//                     className="content-css"
//                     anchorClass="my-anchor-css-class"
//                     onClick={() => showMore(ele)}
//                     // expanded={false}
//                     width={280}
//                     fontSize="19"
//                     truncatedEndingComponent={"... "}
//                   >
//                     <div
//                       className="data__text"
//                       dangerouslySetInnerHTML={{ __html: new_data[ele].data }}
//                     ></div>
//                   </ShowMoreText> */}
//                   <span
//                     style={{ overflow: "hidden", textOverflow: "ellipsis" }}
//                     // dangerouslySetInnerHTML={{ __html: new_data[ele].data }}
//                   >
//                     {truncate(new_data[ele].data, ele)}
//                   </span>
//                 </CardContent>
//                 <CardActions style={{ float: "right" }}>
//                   <Button
//                     // href={item.link}
//                     target="_blank"
//                     size="small"
//                     variant="contained"
//                     style={{ padding: "10px" }}
//                     onClick={() => treatment(ele)}
//                   >
//                     Read more
//                   </Button>
//                   <Button
//                     // href={item.link}
//                     target="_blank"
//                     size="small"
//                     variant="contained"
//                     style={{ padding: "10px" }}
//                     onClick={() => treatment(ele)}
//                   >
//                     Treatments
//                   </Button>
//                   <Button
//                     target="_blank"
//                     size="small"
//                     variant="contained"
//                     style={{ padding: "10px" }}
//                     onClick={() => displayProducts(ele)}
//                   >
//                     Products
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//             <Modal isOpen={modalIsOpen}>
//               <>
//                 <div style={{ marginTop: "40px" }} />
//                 <h3
//                   style={{
//                     color: "#38b000",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     textAlign: "center",
//                   }}
//                 >
//                   Treatment:
//                 </h3>
//                 {/* <h3>{modalTreatment}</h3> */}
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: modalTreatment,
//                   }}
//                 >
//                   {/* {console.log("jaja", ele)} */}
//                 </div>
//                 <div>
//                   {" "}
//                   <Button
//                     variant="contained"
//                     color="success"
//                     style={{ marginTop: "40", marginBottom: "20" }}
//                     onClick={() => setModalIsOpen(false)}
//                   >
//                     {" "}
//                     Close
//                   </Button>
//                 </div>
//               </>
//             </Modal>
//             <Modal
//               style={{ height: "150px", width: "80px" }}
//               style={(customStyles, { width: "auto", padding: "50px" })}
//               isOpen={productModalIsOpen}
//             >
//               <>
//                 <div style={{ marginTop: "40px" }} />
//                 <h3
//                   style={{
//                     color: "#38b000",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     textAlign: "center",
//                   }}
//                 >
//                   PRODUCTS:
//                 </h3>
//                 <Carousel style={{ color: "red" }}>
//                   {productModal.map((one, i) => {
//                     return (
//                       <div
//                         style={{
//                           display: "grid",
//                           height: "300px",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <a style={{}} target="_blank" href={one.link}>
//                           <img
//                             style={{ height: "200px" }}
//                             src={one.image}
//                           ></img>
//                           <br></br>
//                           <br></br>
//                           <img
//                             style={{ height: "20px", marginLeft: "50px" }}
//                             src={getProduct}
//                           ></img>
//                         </a>
//                         <p style={{ marginLeft: "25 px" }}>{one.title}</p>
//                       </div>
//                     );
//                   })}
//                 </Carousel>
//                 <div>
//                   {" "}
//                   <Button
//                     style={{ position: "relative" }}
//                     variant="contained"
//                     color="success"
//                     style={{ marginTop: "15", marginBottom: "10px" }}
//                     onClick={() => setProductModalIsOpen(false)}
//                   >
//                     {" "}
//                     Close
//                   </Button>
//                 </div>
//               </>
//             </Modal>
//           </>
//         ))}
//       </Grid>
//     </>
//   );
// }

// export default DiseasePortal;
