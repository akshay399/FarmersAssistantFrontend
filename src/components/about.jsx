export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img
              src="img/crop-recommendation.jpg"
              className="img-responsive"
              alt=""
            />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text" style={{ marginTop: "10px" }}>
              <h2>Crop Recommendation</h2>
              <p>
                <li>
                  At the frontend the Npk, temp, ph, rainfall values are taken
                  and the crops that the farmer or person can grow in those
                  conditions is shown.
                </li>
                <li>
                  At the backend we’re using a dataset from Kaggle that has N,
                  P, K, temperature, humidity, ph, rainfall, and labe as it’s
                  inputs. And the model used is Random Forest.
                </li>
              </p>
            </div>
          </div>
        </div>
        {/* ---------------------------- */}
        <hr style={{ width: "75%" }} />
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img
              src="img/fertilizer.jpg"
              className="img-responsive"
              alt=""
            />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text" style={{ marginTop: "10px" }}>
              <h2>Fertilizer Recommendation</h2>
              <p>
                <li>
                  At the frontend the person has to input the values of N,P,K
                  and will get result on what is less or more in their system.
                </li>
              </p>
            </div>
          </div>
        </div>

        {/* ----------------- */}
        <hr style={{ width: "75%" }} />

        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img
              src="img/plant-disease.jpg"
              className="img-responsive"
              alt=""
            />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text" style={{ marginTop: "10px" }}>
              <h2>Plant disease detection</h2>
              <p>
                <li>
                  In the front end the user can capture image of the crop’s leaf
                  and get the result of what is the disease on the plant.
                </li>
                <li>
                  At the backend the model used is the ResNet- 99.2% This
                  dataset consists of about 87K rgb images of healthy and
                  diseased crop leaves which is categorized into 38 different
                  classes.
                </li>{" "}
                <li>
                  The total dataset is divided into 80/20 ratio of training and
                  validation set preserving the directory structure.
                </li>
              </p>
              {/* <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
