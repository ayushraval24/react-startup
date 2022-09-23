import axios from "axios";

import settings from "../settings";

const apiConfig = (flag = false) => {
  if (localStorage.getItem("loginAccessToken")) {
    return {
      headers: {
        Authorization: `Token ${localStorage.loginAccessToken}`,
        "Content-Type": flag
          ? "multipart/form-data, application/json"
          : "application/json",
      },
      method: "PUT,DELETE,POST,GET,OPTION",
    };
  }
  return {};
};

export const getApi = (url, params) => {
  return axios.get(`${settings.endPoint}${url}`, {
    params: params,
    ...apiConfig(),
  });
};

export const fullGetApi = (url, params) => {
  console.log("This is url: ", url);
  return axios.get(`${url}`, {
    ...apiConfig(),
  });
};

export const postApi = (url, apiData, flag) => {
  return axios.post(`${settings.endPoint}${url}`, apiData, apiConfig(flag));
};

export const putApi = (url, apiData, flag) => {
  return axios.put(`${settings.endPoint}${url}`, apiData, apiConfig(flag));
};

export const deleteApi = (url) => {
  return axios.delete(`${settings.endPoint}${url}`, apiConfig());
};

export const deleteApiWithData = (url, apiData, flag) => {
  return axios.delete(`${settings.endPoint}${url}`, {
    data: apiData,
    ...apiConfig(),
  });
};

export const setupInterceptors = (store) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && [401].includes(error.response.status)) {
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );
};
