import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isNull } from "lodash";
import { useCookies } from "react-cookie";

import { listCategory } from "../../actions";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const ListForUser = ({ listCategory, categories }) => {
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    listCategory(cookies.token);
  }, []);

  return (
    <Container maxWidth="96%">
      <Paper
        sx={{
          width: "100%",
          overflow: "auto",
          margin: "auto",
          p: "1%",
          border: 0,
        }}
      >
        <Box marginTop="10px" sx={{ maxHeight: 600 }}>
          <Grid container spacing={2}>
            {categories.map((category, index) => {
              if (!isNull(category))
                if (category !== undefined)
                  return (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                      <Card
                        sx={{
                          p: "10px",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          "&:hover": {
                            backgroundColor: "#edf5e1",
                            color: "black",
                          },
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography
                            gutterBottom
                            sx={{
                              color: "#464E2E",
                              fontWeight: "bold",
                              mb: "20px",
                            }}
                          >
                            {category.title}
                          </Typography>
                          <Typography
                            align="justify"
                            variant="body2"
                            style={{
                              display: "inline-block",
                              whiteSpace: "pre-line",
                            }}
                          >
                            {category.description.length >= 300
                              ? `${category.description.substring(0, 300)}...`
                              : category.description}
                          </Typography>
                        </CardContent>
                        <CardActions
                          disableSpacing
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <Button
                            onClick={() => console.log("start")}
                            sx={{
                              "&:hover": {
                                backgroundColor: "#464E2E",
                                color: "white",
                              },
                            }}
                          >
                            Start
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
            })}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: Object.values(state.categories),
  };
};

export default connect(mapStateToProps, { listCategory })(ListForUser);
