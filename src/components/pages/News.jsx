import React, { Fragment } from "react";
import Header from "../layout/Header";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";

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

const News = ({ news }) => {
  var news = Object.values(news);
  return (
    <div>

<h3 style={styles.textCenter}>🌾  Agricultural News  🌾</h3>

      <Grid container justifyContent="center" spacing={3}>
        {news.map((item) => (
          <>
            <Grid key={item.id} item xs={12} sm="auto" md="auto" lg="auto">
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt="news image"
                />
                <CardContent>
                  <Typography gutterBottom variant="body2" component="div"  noWrap>
                  {item.summary}
                  </Typography>
                  {/* <Typography noWrap variant="body2" color="text.secondary">
                    {item.summary}
                  </Typography> */}
                  
                </CardContent>
                <CardActions>
                  {/* <Button mt={7} size="small">
                    Share{" "}
                  </Button> */}
                  <Button href={item.link}  size="small" variant="contained">
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
};
export default News;
