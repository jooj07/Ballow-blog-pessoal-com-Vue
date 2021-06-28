export default {
  loadArticles(state, payload) {
    state.articles = payload;
  },
  loadArticle(state, payload) {
    state.article = payload;
  },
};
