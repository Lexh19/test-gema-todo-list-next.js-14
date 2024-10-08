const axios = require('axios')
require("dotenv").config();

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://gema-test.vercel.app/api";

const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

module.exports = { instance };
