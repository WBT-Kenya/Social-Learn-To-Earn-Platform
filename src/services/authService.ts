import axios from "axios";

const API_URL = "http://localhost:500/api/auth/";

// interface RegisterData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   password: string;
// }

export const register = (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string
) => {
  return axios.post(API_URL + "signup", {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  });
};

export const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
