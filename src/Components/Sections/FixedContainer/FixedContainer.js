import React from "react";
import { Grid } from "@mui/material";

const Styles = {
  section: {
    width: "95%",
    height: "80vh" /* Adjust the height as needed */,
    overflow: "hidden",
    border: "1px solid #ccc",
    margin: "4em auto 20px auto",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
  },
  scrollableDiv: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    padding: "10px",
  },
};

const FixedContainer = ({ data }) => {
  return (
    <Grid item xs={12} md={6} >
      <div style={Styles.section}>
        <div
          style={Styles.scrollableDiv}
          className="scrollable-div"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      </div>
    </Grid>
  );
};

export default FixedContainer;
