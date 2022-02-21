import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import { useCookies } from 'react-cookie';

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Header from "../Header";
import Create from "./Create";
import List from "./List";

const Category = ({auth}) =>{
  const [cookies, setCookie] = useCookies(['user']);

  let navigate = useNavigate();
  useEffect(() => {
    if(cookies.token === undefined){
      navigate('/');
    }
  }, [auth]);
  return(
    <div>
      <Header title="Admin" isLogin="true" />
      <Container maxWidth="lg">
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            justifyContent: 'flex-end',
          }}
        >
          <Create token={cookies.token} user={cookies.user} />
        </Box>
      </Container>
      <List token={cookies.token} user={cookies.user} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(Category);