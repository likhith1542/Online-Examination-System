import React, { useEffect, useState } from "react";
import clglogo from "../assets/clglogo.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState({});

  let navigate = useNavigate();

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      navigate("/");
    }

    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.errors,props.auth]);

  useEffect(() => {
    setErrors({})
    if (props.auth.isAuthenticated) {
      navigate("/");
    }
  }, []);

  const submitlogin = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: pass,
    };
    console.log(userData);
    props.loginUser(userData);
    console.log(userData);
  };
  return (
    <div className="login">
      <div className="imageholder">
        <img alt="clglogo" src={clglogo} width="60%" />
      </div>
      <div className="card">
        <h1>Sign In</h1>
        <input
          className={classnames("", {
            invalid: errors.email || errors.emailnotfound,
          })}
          type="text"
          placeholder="Registration Number"
          value={email}
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
        />
        <span className="red-text" style={{color:'red'}} >
          {errors.email}
          {errors.emailnotfound}
        </span>
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => {
            e.preventDefault();
            setPass(e.target.value);
          }}
          className={classnames("", {
            invalid: errors.password || errors.passwordincorrect,
          })}
        />
        <span className="red-text" style={{color:'red'}} >
          {errors.password}
          {errors.passwordincorrect}
        </span>
        <button
          onClick={(e) => {
            submitlogin(e);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
