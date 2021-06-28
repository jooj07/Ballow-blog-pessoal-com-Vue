export default {
  loadArticles(state, payload) {
    state.articles = payload;
  },
  loadCategories(state, payload) {
    state.categories = payload;
  },
  loadMyArticles(state, payload) {
    state.myArticles = payload;
  },
  loadMyArticle(state, payload) {
    state.myArticle = payload;
  },
};
