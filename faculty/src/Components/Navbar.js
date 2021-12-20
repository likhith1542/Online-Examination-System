import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import {FiLogOut} from "react-icons/fi"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

function Navbar(props) {
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  const { user } = props.auth;

  return (
    <div className="navbar">
      <Link to="/">
        <h1>OES</h1>
      </Link>
      {
        user.name?<div className="navbaruser">
        <p>{user.name}</p>
        <button onClick={(e)=>{
          onLogoutClick(e)
        }} >Logout <FiLogOut/> </button>
      </div>:<></>
      }
      
    </div>
  );
}


Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

