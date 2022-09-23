import React, { useState, useRef } from "react";
import { Formik } from "formik";
import DefaultImage from "./user_placeholder.png";
import * as Yup from "yup";

const Form = () => {
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
    hire_date: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    salary: "",
    password: "",
    confirm_password: "",
    imageSrc: "",
    is_admin: false,
    is_active: false,
  });

  let uploadRef = useRef();

  const validate = Yup.object({
    first_name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Firstname is required"),
    last_name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Lastname is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    phone: Yup.string()
      .required("Phone number is required")
      .min(10, "Invalid phone number")
      .max(10, "Invalid phone number"),
    birth_date: Yup.string().required("Birth date is required"),
    hire_date: Yup.string().required("Hire date is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string().required("Zip is required"),
    salary: Yup.string().required("Salary is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const getFileType = (type) => {
    if (type.startsWith("video/")) {
      return "video";
    }
    if (type.startsWith("image/")) {
      return "image";
    }
    return type;
  };

  const fileToBase64 = (e) => {
    return new Promise((resolve, reject) => {
      if (e && e.target && e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();

        // Read file content on file loaded event
        reader.onload = function (event) {
          resolve({
            file: event.target.result,
            type: getFileType(file.type),
          });
        };

        // Convert data to base64
        reader.readAsDataURL(file);
      } else {
        reject(new Error("Something went wrong."));
      }
    });
  };

  const onChangeFile = (event, setFieldValue) => {
    fileToBase64(event).then((res) => {
      setFieldValue("imageSrc", res.file);
    });
  };

  const onSubmitHandler = (values) => {
    console.log("Inside");
    console.log("Final values: ", values);
  };

  return (
    <div className="container">
      <div className="full-form-container shadow-lg p-3 bg-body">
        <Formik
          initialValues={inputValues}
          validationSchema={validate}
          onSubmit={(values) => onSubmitHandler(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            /* and other goodies */
          }) => {
            const img = values.imageSrc ? values.imageSrc : DefaultImage;

            return (
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="user_details px-5 py-3">
                  <div className="first_row row mb-3">
                    <div className="col-4">
                      <div className="first_details w-100">
                        <div className="pull_left">
                          <div className="avatar_image">
                            <input
                              type="file"
                              accept="image/*"
                              className="d-none"
                              onChange={(e) => {
                                onChangeFile(e, setFieldValue);
                              }}
                              ref={(refParam) => {
                                uploadRef = refParam;
                              }}
                            />
                            <img
                              src={img}
                              width="100px"
                              height="100px"
                              alt="Profile Picture"
                              className="img-fluid profile_picture"
                            />
                          </div>
                        </div>
                        <div className="pull_right avatar_link">
                          <div
                            onClick={() => {
                              uploadRef.click();
                            }}
                          >
                            Edit Avatar
                          </div>
                          <div
                            type="reset"
                            onClick={() => setFieldValue("imageSrc", "")}
                          >
                            Clear Avatar
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="active_check w-100">
                        <span className="pull_left">Active</span>
                        <input
                          className="pull_right"
                          type="checkbox"
                          name="is_active"
                          onChange={handleChange}
                          value={values.is_active}
                          //   onChange={handleIsActive}
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="active_check w-100">
                        <span className="pull_left">Admin</span>
                        <input
                          className="pull_right"
                          type="checkbox"
                          name="is_admin"
                          value={values.is_admin}
                          onChange={handleChange}
                          //   onChange={handleIsAdmin}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="second_row row mb-3">
                    <div className="col-4 first_details">
                      <div className="first_name w-100">
                        <label
                          htmlFor="first_name"
                          className="form-label pull_left"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            touched?.first_name &&
                            errors?.first_name &&
                            "invalid-input"
                          }`}
                          id="first_name"
                          name="first_name"
                          onChange={handleChange}
                          value={values.first_name}
                        />
                        {errors.first_name && touched.first_name && (
                          <p className="form-error">{errors.first_name}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-4 first_details">
                      <div className="last_name w-100">
                        <label
                          htmlFor="last_name"
                          className="form-label pull_left"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            touched?.last_name &&
                            errors?.last_name &&
                            "invalid-input"
                          }`}
                          id="last_name"
                          name="last_name"
                          onChange={handleChange}
                          value={values.last_name}
                        />
                        {errors.last_name && touched.last_name && (
                          <p className="form-error">{errors.last_name}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-4 first_details">
                      <div className="email w-100">
                        <label htmlFor="email" className="form-label pull_left">
                          Email
                        </label>
                        <input
                          type="email"
                          className={`form-control ${
                            touched?.email && errors?.email && "invalid-input"
                          }`}
                          id="email"
                          name="email"
                          onChange={handleChange}
                          value={values.email}
                          autoComplete="off"
                        />
                        {errors.email && touched.email && (
                          <p className="form-error">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="third_row row mb-3">
                    <div className="col-4 first_details ">
                      <div className="phone w-100">
                        <label htmlFor="phone" className="form-label pull_left">
                          Phone
                        </label>
                        <input
                          maxLength={10}
                          type="number"
                          className={`form-control ${
                            touched?.phone && errors?.phone && "invalid-input"
                          }`}
                          id="phone"
                          name="phone"
                          onChange={handleChange}
                          value={values.phone}
                        />
                        {errors.phone && touched.phone && (
                          <p className="form-error">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-4 first_details">
                      <div className="birth_date w-100">
                        <label
                          htmlFor="birth_date"
                          className="form-label pull_left"
                        >
                          Birth Date
                        </label>
                        <input
                          type="date"
                          className={`form-control ${
                            touched?.birth_date &&
                            errors?.birth_date &&
                            "invalid-input"
                          }`}
                          id="birth_date"
                          name="birth_date"
                          onChange={handleChange}
                          value={values.birth_date}
                          max={Date.now()}
                        />
                        {errors.birth_date && touched.birth_date && (
                          <p className="form-error">{errors.birth_date}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-4 first_details">
                      <div className="hire_date w-100">
                        <label
                          htmlFor="hire_date"
                          className="form-label pull_left"
                        >
                          Hire Date
                        </label>
                        <input
                          type="date"
                          className={`form-control ${
                            touched?.hire_date &&
                            errors?.hire_date &&
                            "invalid-input"
                          }`}
                          id="hire_date"
                          name="hire_date"
                          onChange={handleChange}
                          value={values.hire_date}
                          max={Date.now()}
                        />
                        {errors.hire_date && touched.hire_date && (
                          <p className="form-error">{errors.hire_date}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="forth_row row mb-3">
                    <div className="col-4 first_details ">
                      <div className="address w-100">
                        <label
                          htmlFor="address"
                          className="form-label pull_left"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            touched?.address &&
                            errors?.address &&
                            "invalid-input"
                          }`}
                          id="address"
                          name="address"
                          onChange={handleChange}
                          value={values.address}
                          //   onChange={handleInputChange}
                        />
                        {errors.address && touched.address && (
                          <p className="form-error">{errors.address}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-4 first_details">
                      <div className="city w-100">
                        <label htmlFor="city" className="form-label pull_left">
                          City
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            touched?.city && errors?.city && "invalid-input"
                          }`}
                          id="city"
                          name="city"
                          onChange={handleChange}
                          value={values.city}
                        />
                        {errors.city && touched.city && (
                          <p className="form-error">{errors.city}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-4 first_details">
                      <div className="password w-100">
                        <label
                          htmlFor="password"
                          className="form-label pull_left"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className={`form-control ${
                            touched?.password &&
                            errors?.password &&
                            "invalid-input"
                          }`}
                          id="password"
                          name="password"
                          onChange={handleChange}
                          value={values.password}
                          autoComplete="off"
                        />
                        {errors.password && touched.password && (
                          <p className="form-error">{errors.password}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="fifth_row row mb-3">
                    <div className="col-4 first_details">
                      <div className="state w-100">
                        <label htmlFor="state" className="form-label pull_left">
                          State
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            touched?.state && errors?.state && "invalid-input"
                          }`}
                          id="state"
                          name="state"
                          onChange={handleChange}
                          value={values.state}
                        />
                        {errors.state && touched.state && (
                          <p className="form-error">{errors.state}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-4 first_details">
                      <div className="zip w-100">
                        <label htmlFor="zip" className="form-label pull_left">
                          Zip Code
                        </label>
                        <input
                          type="number"
                          className={`form-control ${
                            touched?.zip && errors?.zip && "invalid-input"
                          }`}
                          id="zip"
                          name="zip"
                          onChange={handleChange}
                          value={values.zip}
                          //   onChange={handleInputChange}
                        />
                        {errors.zip && touched.zip && (
                          <p className="form-error">{errors.zip}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-4 first_details">
                      <div className="confirm_password w-100">
                        <label
                          htmlFor="confirm_password"
                          className="form-label pull_left"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className={`form-control ${
                            touched?.confirm_password &&
                            errors?.confirm_password &&
                            "invalid-input"
                          }`}
                          id="confirm_password"
                          name="confirm_password"
                          onChange={handleChange}
                          value={values.confirm_password}
                          autoComplete="off"
                        />
                        {errors.confirm_password &&
                          touched.confirm_password && (
                            <p className="form-error">
                              {errors.confirm_password}
                            </p>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="sixth_row row mb-3 ">
                    <div className="col-4 first_details">
                      <div className="salary w-100">
                        <label
                          htmlFor="salary"
                          className="form-label pull_left"
                        >
                          Salary
                        </label>
                        <input
                          type="number"
                          className={`form-control ${
                            touched?.salary && errors?.salary && "invalid-input"
                          }`}
                          id="salary"
                          name="salary"
                          onChange={handleChange}
                          value={values.salary}
                        />
                        {errors.salary && touched.salary && (
                          <p className="form-error">{errors.salary}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="seventh_row row  mb-0">
                    <div
                      className="col-4 first_details"
                      style={{ justifyContent: "space-around" }}
                    >
                      <button
                        className="col-4 btn btn-primary custom_button"
                        type="submit"
                      >
                        SAVE
                      </button>
                      <button
                        className="col-4 btn btn-primary custom_button"
                        type="button"
                      >
                        CANCLE
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Form;
