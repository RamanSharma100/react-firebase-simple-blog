import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const Login = ({ loginUser }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) history.push("/admin/dashboard");
  });

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !pass) {
      return toast.warning("Please fill in all fields");
    } else {
      loginUser(email, pass);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center font-weight-bolder py-5">
            React Firebase Simple Blog
            <span className="text-primary"> [Admin]</span>
          </h1>

          <div className="col-md-5 p-2 mt-5 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-block btn-dark">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
