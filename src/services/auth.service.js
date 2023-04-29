import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.clear();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.roles && user.roles.includes("ROLE_ADMIN");
};

const AuthService = {
  register,
  login,
  // updatepassword,
  logout,
  getCurrentUser,
  isAdmin,
};

export default AuthService;
