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
import EditPost from "./EditPost";

const Dashboard = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(`path`, path);

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
        <Route exact path={`${path}/post/:id/edit`}>
          <EditPost />
        </Route>
      </Switch>
    </>
  );
};

export default Dashboard;
