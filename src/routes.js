import React, { Component, useEffect } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./pages/Home";
import Form from "./components/Form";

const AuthRouteComp = ({ component: Component, ...rest }) => {
  const hasAuthAccessToken = localStorage.getItem("loginAccessToken");

  return (
    <Route
      {...rest}
      render={(props) => {
        // return hasAuthAccessToken &&
        // 	getPathAccess(window.location.pathname, rest.profileData) ? (
        return hasAuthAccessToken ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <Navigate to="/login" />
        );
      }}
    />
  );
};

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
