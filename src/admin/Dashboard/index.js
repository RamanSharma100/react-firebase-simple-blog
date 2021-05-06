import React from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import fire from "../../config/fire";

import Home from "./Home";
import AddPost from "./AddPost";
import Navbar from "./Navbar";
import Posts from "./Posts";
import SeePost from "./SeePost";

const Dashboard = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  //logout User
  const logoutUser = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "RESET_USER" });
        toast.success("You are successfully logged out");
        history.push("/admin/login");
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <>
      <Navbar logoutUser={logoutUser} />
      <Switch>
        <Route exact path={path}>
          <Home />
        </Route>
        <Route exact path={`${path}/addPost`}>
          <AddPost />
        </Route>
        <Route exact path={`${path}/posts`}>
          <Posts />
        </Route>
        <Route exact path={`${path}/post/:id`}>
          <SeePost />
        </Route>
      </Switch>
    </>
  );
};

export default Dashboard;
