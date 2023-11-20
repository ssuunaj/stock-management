import React from "react";
import { useSelector } from "react-redux";
import { Paper, makeStyles, Divider } from "@material-ui/core";
import Input from "../../components/Inputs/Input";
import { Grid, List, ListItem, Typography } from "@mui/material";
import ApiCall from "../../api/ApiCall";
import { ADD_CATEGORY, GET_ALL_CATEGORIES } from "../../api/ApiThread";

import { MdOutlineMail } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
  },
  text: {
    color: theme.palette.secondary.main,
  },
}));

export default function Dashboard() {
  const { userInfo } = useSelector((state) => state.auth);

  const { user } = userInfo;

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography sx={{ color: "secondary.main" }}>Dashboard</Typography>

          <Divider />
          <Typography color="primary">
            Categories
          </Typography>

          <ApiCall thread={GET_ALL_CATEGORIES}  autoload>
            {({responseData , SubmitButton}) => {
              let categories = [];

              if (Array.isArray(responseData)) {
                categories = responseData;
              }

              // if (categories.length == 0) {
              //   return <Typography>No catergories available</Typography>;
              // }

              return (
                <React.Fragment>
                  <SubmitButton>Show Categories</SubmitButton>
                  <List>
                    {categories.map((category, index) => {
                      return (
                        <ListItem key={index}>{category.prod_cat}</ListItem>
                      );
                    })}
                  </List>
                </React.Fragment>
              );
            }}
          </ApiCall>
        </Grid>
        <Grid item xs={12}>
          <ApiCall thread={ADD_CATEGORY}>
            {({ SubmitButton,input, FileUpload, validationErrors }) => {
              return (
                <div>
                  <Input
                    placeholder="Category"
                    variant="round"
                    {...input({ name: "category" })}
                    inputicon={<MdOutlineMail />}
                    errors={validationErrors}
                  />
                  <FileUpload name="image" />
                  <Input
                  type="password"
                  placeholder="Password"
                  variant="line"
                  {...input({ name: "password" })}
                  errors={validationErrors}
                />
               
                <Input type="email" placeholder="Email" {...input({ name: "email" })}   errors={validationErrors}/> 

                  <SubmitButton variant="contained" size="small">
                    Submit
                  </SubmitButton>
                </div>
              );
            }}
          </ApiCall>
        </Grid>
      </Grid>
    </Paper>
  );
}
