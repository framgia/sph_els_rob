import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Header from "../Header";
import List from "./List";
import ListForUser from "./ListForUser";

const Category = ({ auth }) => {
  const [cookies, setCookie] = useCookies(["user"]);

  let navigate = useNavigate();

  useEffect(() => {
    if (cookies.token === undefined) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Header
        title={cookies.role === "admin" ? "Admin" : ""}
        active="categories"
      />
      {cookies.role === "admin" ? (
        <List token={cookies.token} user={cookies.user} />
      ) : (
        <ListForUser token={cookies.token} user={cookies.user} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(Category);
