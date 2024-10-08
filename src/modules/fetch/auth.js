import { instance } from "../axios";

const login = async (email, password) => {
  try {
    const response = await instance.post("/auth/login", { email, password });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const register = async (name, email, password) => {
  try {
    const response = await instance.post("/auth/register", { name, email, password })
    return response.data
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

export { login, register };
