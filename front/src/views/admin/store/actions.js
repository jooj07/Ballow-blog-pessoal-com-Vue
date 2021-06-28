import { api } from "@/api.js";
import axios from "axios";
import { baseApiUrl } from "@/global";

export const getStats = async ({ commit }) => {
  const url = `${baseApiUrl}/stats`;
  const data = await axios.get(url);
  commit("loadStats", data.data);
};

export const getUsers = async ({ commit }, page) => {
  const url = `${baseApiUrl}/users?page=${page}`;
  const data = await axios.get(url);
  commit("loadUsers", data.data);
};

export const getUser = async ({ commit }, id) => {
  const data = await axios.get(`${baseApiUrl}/users/${id}`);
  commit("loadSelectedUser", data.data);
}; //load the CONTENT

export const editUser = async ({ commit }, payload) => {
  const url = `${baseApiUrl}/users/${payload.id}`;
  await axios.put(url, payload);
  const data = await axios.get(`${baseApiUrl}/users`);
  commit("loadUsers", data.data);
};

export const deleteUser = async ({ commit }, id) => {
  const url = `${baseApiUrl}/users/${id}`;
  await axios.delete(url);
  const data = await axios.get(`${baseApiUrl}/users`);
  commit("loadUsers", data.data);
};

export const createUser = async ({ commit }, payload) => {
  const url = `${baseApiUrl}/users`;
  await axios.post(url, payload);
  const data = await axios.get(`${baseApiUrl}/users`);
  commit("loadUsers", data.data);
};

export const getCategories = async ({ commit }, page) => {
  const url = `${baseApiUrl}/categories?page=${page}`;
  const data = await axios.get(url);
  commit("loadCategories", data.data);
};

export const getCategory = async ({ commit }, id) => {
  const url = `${baseApiUrl}/categories/${id}`;

  const data = await axios.get(url);
  commit("loadCategory", data.data);
};

export const createCategory = async ({ commit }, payload) => {
  const url = `${baseApiUrl}/newcategory`;
  await api.post(url, payload);
  const data = await axios.get(`${baseApiUrl}/categories`);
  commit("loadCategories", data.data);
};

export const deleteCategory = async ({ commit }, id) => {
  await axios.delete(`${baseApiUrl}/managecategories/${id}`);
  const data = await axios.get(`${baseApiUrl}/categories`);
  commit("loadCategories", data.data);
};

export const editCategory = async ({ commit }, payload) => {
  await axios.put(`${baseApiUrl}/managecategories/${payload.id}`, payload);
  const data = await axios.get(`${baseApiUrl}/categories`);
  commit("loadCategories", data.data);
};

export const getArticles = async ({ commit }, page) => {
  const url = `${baseApiUrl}/feed?page=${page}`;
  const data = await axios.get(url);
  commit("loadArticles", data.data);
};

export const getArticle = async ({ commit }, id) => {
  const data = await axios.get(`${baseApiUrl}/article/${id}`);
  commit("loadArticle", data.data);
}; //load the CONTENT

export const createArticle = async ({ commit }, payload) => {
  await axios.post(`${baseApiUrl}/articles`, payload);
  const data = await axios.get(`${baseApiUrl}/articles`);
  commit("loadArticles", data.data);
};

export const deleteArticle = async ({ commit }, id) => {
  await axios.delete(`${baseApiUrl}/article/${id}`);
  const data = await axios.get(`${baseApiUrl}/articles`);
  commit("loadArticles", data.data);
};

export const editArticleAction = async ({ commit }, payload) => {
  await axios.put(`${baseApiUrl}/article/${payload.id}`, payload);
  const data = await axios.get(`${baseApiUrl}/articles`);
  commit("loadArticles", data.data);
};
