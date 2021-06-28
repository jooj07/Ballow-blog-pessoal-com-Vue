export default {
  loadStats(state, payload) {
    state.stats = payload;
  },
  loadUsers(state, payload) {
    state.users = payload;
  },
  loadCategories(state, payload) {
    state.categories = payload;
  },
  loadCategory(state, payload) {
    state.category = payload;
  },
  loadArticles(state, payload) {
    state.articles = payload;
  },
  loadArticle(state, payload) {
    state.article = payload;
  },
  loadSelectedUser(state, payload) {
    state.selectedUser = payload;
  },
};
