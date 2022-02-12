import React, { Fragment } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import { Navigation } from "./navigation";
import newsStyles from "./newsStyles";
import useStyles from "./newsStyles";

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

export default function News({ news }) {
  var news = Object.values(news);
  const classes = useStyles();
  return (
    <div>
      {/* <Navigation /> */}
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />

      {/* <h3 style={styles.textCenter}>🌾  Agricultural News  🌾</h3> */}

      <Grid container justifyContent="center" spacing={3}>
        {news.map((item) => (
          <>
            {console.log("hiii", item)}
            <Grid key={item.id} item xs={12} sm="auto" md="auto" lg="auto">
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="240"
                  width="auto"
                  objectFit="cover"
                  image={item.image}
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
                    {item.summary}
                  </Typography>
                </CardContent>
                <CardActions style={{ float: "right" }}>
                  <Button
                    href={item.link}
                    target="_blank"
                    size="small"
                    variant="contained"
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
}
