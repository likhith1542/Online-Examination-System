import React, { useEffect, useState } from "react";
import {  Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from './../store';

function PrivateRoute({ children }) {
    
    
  return (
    store.getState().auth.isAuthenticated===true?children:<Navigate to='/Login' />
  );
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
