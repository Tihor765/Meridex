import axios from "axios";

const API = axios.create({
  baseURL: "https://novacart-a3wx.onrender.com/api"
});

export default API;