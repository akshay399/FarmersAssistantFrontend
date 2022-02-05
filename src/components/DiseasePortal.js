import React from "react";
import useStyles from "./newsStyles";
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
var nested_obj = "";
var new_data = JSON.parse(stringg);
var propertyValues = [];
new_data.map((ele, i) => {
  console.log("single elemet", ele.products);
  propertyValues.push(Object.values(ele.products));
});
console.log("cut down", propertyValues);
function DiseasePortal() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      <div>$yyyyyyyoi</div>
      <div className="scraped-text" style={{ margin: "40px" }}>
        <h1>hi</h1>
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
                      
                        {console.log("hello123", one.title)}
                        return <h3>{one.title}</h3>
                      
                    })}
                  </ul>

                  <hr style={{ width: "100%" }}></hr>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default DiseasePortal;
