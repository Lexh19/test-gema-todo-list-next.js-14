import { instance } from "../axios";

const getAllTodos = async () => {
  try {
    const response = await instance.get("/todos");
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const getAllTodosByUserId = async (id) => {
  try {
    const response = await instance.get(`/todos/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const getDetailTodo = async (id) => {
  try {
    const response = await instance.get(`/todos/detail/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const addTodos = async (id, { todo, description, datetime }) => {
  try {
    const response = await instance.post(`/todos/${id}`, {
      todo,
      description,
      datetime,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const updateTodos = async (id, { todo, description, datetime }) => {
  try {
    const response = await instance.put(`/todos/${id}`, {
      todo,
      description,
      datetime,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const updateStatusTodo = async (id, status) => {
  try {
    const response = await instance.put(`/todos/status/${id}`, { status })
    return response.data
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const deleteTodos = async (id) => {
  try {
    const response = await instance.delete(`/todos/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

export {
  getAllTodos,
  getAllTodosByUserId,
  getDetailTodo,
  addTodos,
  updateTodos,
  updateStatusTodo,
  deleteTodos,
};
