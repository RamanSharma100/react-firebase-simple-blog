import React, { useEffect } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";

import Login from "./Login";
import fire from "../config/fire";
import { toast } from "react-toastify";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./Dashboard";

const Admin = () => {
  const history = useHistory();
  let { path } = useRouteMatch();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!isLoggedIn) dispatch({ type: "SET_USER", payload: user });
        if (window.location.pathname === "/admin")
          history.push("/admin/dashboard");
        history.push(window.location.pathname);
      } else {
        history.push("/admin/login");
      }
    });
  }, [dispatch]);

  // login user
  const loginUser = (email, password) => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({ type: "SET_USER", payload: user });
        toast.success("Successfully Logged In");
        history.push("/admin/dashboard");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          return toast.error("Invalid Email or Password");
        }
        if (err.code === "auth/invalid-email") {
          return toast.error("Please enter valid email");
        }
      });
  };

  // register user
  const registerUser = ({ name, email, password, confirmPassword }) => {
    if (!name || !email || !password || !confirmPassword) {
      return toast.warning("Please fill in all fields!!");
    }

    if (password !== confirmPassword) {
      return toast.warning("Passwords donot match!");
    }

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const currentUser = fire.auth().currentUser;
        currentUser.updateProfile({
          displayName: name,
        });
        dispatch({ type: "SET_USER", payload: currentUser });
        history.push("/admin/dashboard");
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          toast.error("User already exists");
        }
      });
  };

  return (
    <Switch>
      <Route path={`${path}/login`}>
        <Login loginUser={loginUser} />
      </Route>
      <Route path={`${path}/register`}>
        <Register registerUser={registerUser} />
      </Route>
      <Route path={`${path}/dashboard`}>
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default Admin;
