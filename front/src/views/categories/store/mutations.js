export default {
  loadFeedCategories(state, payload) {
    state.feedCategories = payload;
  },
  loadCategoryArticles(state, payload) {
    state.categoryArticles = payload;
  }
  
};
