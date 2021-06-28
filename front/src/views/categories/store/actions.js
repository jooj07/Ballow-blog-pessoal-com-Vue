
import axios from "axios";
import { baseApiUrl } from "@/global";

export const getFeedCategories = async ({ commit },page) => {

  const url = `${baseApiUrl}/categories?page=${page}`;
  
  const data = await axios.get(url);
  commit("loadFeedCategories", data.data);
};

export const getCategoryArticles = async ({ commit },payload) => {
  
  const url = `${baseApiUrl}/categories/${payload.id}/articles?page=${payload.page}`;
  const data = await axios.get(url);
  commit("loadCategoryArticles", data.data);
};


