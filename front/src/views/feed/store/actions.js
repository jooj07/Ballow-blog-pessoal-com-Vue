// import {api} from "@/api.js"
import { baseApiUrl } from "@/global";
import axios from "axios";

export const getArticles = async ({ commit }, page) => {
  const url = `${baseApiUrl}/feed?page=${page}`;
  const data = await axios.get(url);
  commit("loadArticles", data.data);
};
export const getArticle = async ({ commit }, id) => {
  const url = `${baseApiUrl}/feed/${id}`;
  const data = await axios.get(url);
  commit("loadArticle", data.data);
};
