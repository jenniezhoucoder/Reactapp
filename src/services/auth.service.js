import axios from "axios";
import authHeader from "./auth-header";
import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        //   localStorage.setItem("user", JSON.stringify(response.data));
        // }
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.accessToken)
        );
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.clear();
};

const getCurrentUser = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    try {
      const response = await axios.get(API_URL + "user", {
        headers: authHeader(),
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
  return null;
};

const isAdmin = async () => {
  const user = await getCurrentUser();
  return user && user.roles && user.roles.includes("ROLE_ADMIN");
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  isAdmin,
};

export default AuthService;
