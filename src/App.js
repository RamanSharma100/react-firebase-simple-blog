import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Admin from "./admin";

import Home from "./Components/Home";
import "./App.css";
import Navbar from "./Components/Navbar/index";
import { useDispatch, useSelector } from "react-redux";
import SubNavbar from "./Components/Navbar/SubNavbar";
import fire from "./config/fire";
import SeePost from "./admin/Dashboard/SeePost";
import Offline from "./Components/Offline";
import Posts from "./Components/Posts";

const App = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!isLoggedIn) dispatch({ type: "SET_USER", payload: user });
      }
    });
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [onLine, setOnLine] = useState(false);

  useEffect(() => {
    setOnLine(navigator.onLine);
    if (!onLine) dispatch({ type: "RESET_USER" });
  }, [navigator.onLine]);

  if (!onLine) {
    return <Offline />;
  }

  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route path={""}>
          {isLoggedIn && !pathname.includes("/admin") ? <SubNavbar /> : null}
          {!pathname.includes("/admin") ? <Navbar /> : null}
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route path={"/posts"}>
            <Posts />
          </Route>
          <Route exact path={"/post/:id/:title"}>
            <SeePost />
          </Route>
          <Route path={"/admin"}>
            <Admin />
          </Route>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
