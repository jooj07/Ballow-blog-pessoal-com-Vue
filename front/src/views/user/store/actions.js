import axios from "axios";
import { baseApiUrl } from "@/global";

export const createArticle = async ({ commit }, payload) => {
  await axios.post(`${baseApiUrl}/articles`, payload);
  const data = await axios.get(`${baseApiUrl}/articles`);
  commit("loadArticles", data.data);
};
export const getCategories = async ({ commit }) => {
  const data = await axios.get(`${baseApiUrl}/categories`);
  commit("loadCategories", data.data);
};
export const getMyArticles = async ({ commit }, payload) => {
  const data = await axios.get(
    `${baseApiUrl}/yourArticles/${payload.userId}?page=${payload.page}`
  );
  commit("loadMyArticles", data.data);
};

export const getMyArticle = async ({ commit }, id) => {
  const data = await axios.get(`${baseApiUrl}/editYourArticle/${id}`);
  commit("loadMyArticle", data.data);
};

export const deleteMyArticle = async ({ commit }, id) => {
  await axios.delete(`${baseApiUrl}/editYourArticle/${id}`);
  const data = await axios.get(`${baseApiUrl}/articles`);
  commit("loadArticles", data.data);
};

export const editMyArticle = async ({ commit }, payload) => {
  console.log(payload);
  await axios.put(`${baseApiUrl}/editYourArticle/${payload.id}`, payload);
  const data = await axios.get(`${baseApiUrl}/articles`);
  commit("loadArticles", data.data);
};
