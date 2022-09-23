import React, { Component, useEffect } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./pages/Home";
import Form from "./components/Form";

const PrivateRoute = ({ component: Component, ...rest }) => {
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

const PublicRoute = ({ component: Component, ...rest }) => {
  const hasAuthAccessToken = localStorage.getItem("loginAccessToken");
  return (
    <Route
      {...rest}
      render={(props) => {
        return !hasAuthAccessToken ? (
          <Component {...props} />
        ) : (
          <Navigate to="/home" />
        );
      }}
    />
  );
};

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <PublicRoute path="/" element={<Login />} />
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/form" element={<Form />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
