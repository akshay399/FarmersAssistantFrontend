import React from "react";
import Modal from "react-modal";
import Button from "@mui/material/Button";

export default function DiseasePortalModal({
  test,
  modalIsOpen,
  setModalIsOpen,
}) {
  return (
    <>
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
            Treatment: {test}
          </h3>

          {/* <div
            dangerouslySetInnerHTML={{
              __html: new_data[ele].treatment,
            }}
          > */}
          {/* {console.log("jaja", ele)} */}
          {/* </div> */}
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
    </>
  );
}
