import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// css
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// redux
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

// reducers import
import authReducer from "./redux/reducers/authReducer";
import postReducer from "./redux/reducers/postReducer";

// composers
const composedEnhancers = composeWithDevTools || compose;

// reducers
const reducers = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

// store
const store = createStore(reducers, composedEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
