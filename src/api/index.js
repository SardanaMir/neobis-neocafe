import axios from "axios";
import Cookies from "js-cookie";

const URL = "https://helsinki-backender.org.kg/";

const API = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export const login = async (data) => {
  const res = await API.post("users/login/admin/", data);
  return res.data;
};
export const getMenu = async () => {
  const res = await API.get("menu/menus/");
  return res;
};
export const deleteItem = async (id) => {
  const res = await API.delete(`menu/menus/${id}/`);
  return res;
};
export const getStock = async () => {
  const res = await API.get("storage/");
  return res;
};
export const createNewItem = async (data) => {
  const res = await API.post("menu/menus/", data);
  return res;
};

export const createNewCategory = async (data) => {
  const res = await API.post("menu/categories/", data);
  return res;
};
export const getAllCategories = async () => {
  const res = await API.get("menu/categories/");
  return res;
};
export const deleteCategory = async (id) => {
  const res = await API.delete(`menu/categories/${id}/`);
  return res;
};
export const addNewItem = async (formData) => {
  const res = await API.post("menu/menus/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
export const editItemInfo = async (id, formData) => {
  const res = await API.patch(`menu/menus/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const createNewStaff = async (data) => {
  const res = await API.post("employees/staff/create/", data);
  return res;
};
export const changeStaffInfo = async (id, data) => {
  const res = await API.patch(`employees/staff/${id}/`, data);
  return res;
};
export const deleteStaffInfo = async (id) => {
  const res = await API.delete(`employees/staff/${id}/`);
  return res;
};
export const getBranches = async () => {
  const res = await API.get("branches/");
  return res;
};
export const getAllStaff = async () => {
  const res = await API.get("employees/staff/list/");
  return res;
};
