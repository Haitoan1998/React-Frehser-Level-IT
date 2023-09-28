import CustomizeAxios from "./CustomizeAxios";

const fetchAllUsers = (page) => {
  return CustomizeAxios.get(`/api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
  return CustomizeAxios.post("/api/users", { name, job });
};

const putUpdateUser = (name, job, id) => {
  return CustomizeAxios.put(`/api/users/${id}`, { name, job });
};

const DeleteUser = (id) => {
  return CustomizeAxios.delete(`/api/users/${id}`);
};

const LoginUser = (email, password) => {
  return CustomizeAxios.post(`/api/login`, { email, password });
};

export { fetchAllUsers, postCreateUser, putUpdateUser, DeleteUser, LoginUser };
