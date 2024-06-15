import React, { useState } from "react";
import "./Css/LoginSignup.css";

function LoginSignup() {
  const [state, setstate] = useState("Login");

  const [formdata, setformdata] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changehandler = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  //Login function ----------------------------------------------

  const login = async () => {
    console.log("Login function executed", formdata);
    let responsedata;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((data) => (responsedata = data));
    if (responsedata.success) {
      localStorage.setItem("auth-token", responsedata.token);
      window.location.replace("/");
    } else {
      alert("Wrong Password");
    }
  };

  //Signup function ---------------------------------------------
  const signup = async () => {
    console.log("Signup function executed", formdata);
    let responsedata;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((data) => (responsedata = data));
    if (responsedata.success) {
      localStorage.setItem("auth-token", responsedata.token);
      window.location.replace("/");
    } else {
      alert(responsedata.errors);
    }
  };
  return (
    <div className="login-signup">
      <div className="login-signup-container">
        <h1>{state}</h1>
        <div className="login-signup-fields">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formdata.username}
              onChange={changehandler}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formdata.email}
            onChange={changehandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formdata.password}
            onChange={changehandler}
            type="password"
            placeholder="Password"
          />
          <button
            onClick={() => {
              state === "Login" ? login() : signup();
            }}
          >
            Continue
          </button>
          {state === "Sign Up" ? (
            <p className="login-signup-login">
              Already have an account{" "}
              <span
                onClick={() => {
                  setstate("Login");
                }}
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="login-signup-login">
              Create an account{" "}
              <span
                onClick={() => {
                  setstate("Sign Up");
                }}
              >
                Click Here
              </span>
            </p>
          )}
        </div>
        <div className="login-signup-agree">
          <input type="checkbox" name="" id="" />
          <p>
            By Continueing, I agree to use the term of use & privecy policy{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
export default LoginSignup;
