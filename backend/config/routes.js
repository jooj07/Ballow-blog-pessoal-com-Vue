const admin = require("./admin.js");

module.exports = (app) => {
  // app.post("/signup", app.api.user.save);
  app.post("/signup", app.api.userSignup.saveUser);
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);

  app.route("/feed").get(app.api.article.get);
  app.route("/feed/:id").get(app.api.article.getById); //carregar conteudo

  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .post(admin(app.api.user.save)) //.post(admin(app.api.user.save))
    .get(admin(app.api.user.get)); // .get(admin(app.api.user.get));

  app
    .route("/users/:id")
    .all(app.config.passport.authenticate())
    .put(admin(app.api.user.save)) //.put(admin(app.api.user.save))
    .get(admin(app.api.user.getById)) //    .get(admin(app.api.user.getById))
    .delete(admin(app.api.user.remove)); //    .delete(admin(app.api.user.remove))

  app.route("/categories").get(app.api.category.get);

  // app.route("/categories/tree").get(app.api.category.getTree);

  app.route("/categories/:id").get(app.api.category.getById);

  app
    .route("/newcategory")
    .post(app.api.category.save);

  app
    .route("/managecategories/:id")
    .all(app.config.passport.authenticate())
    .put(admin(app.api.category.save))
    .delete(admin(app.api.category.remove));

  app
    .route("/yourArticles/:userId")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getUserArticles);

  app
    .route("/editYourArticle/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getById)
    .put(app.api.article.save)
    .delete(app.api.article.remove);

  app
    .route("/articles")
    .all(app.config.passport.authenticate())
    .get(app.api.article.get)
    .post(app.api.article.save);

  app
    .route("/article/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getById)
    .put(admin(app.api.article.save)) //mudar pra poder editar só os próprios artigos put(admin(app.api.article.save))
    .delete(admin(app.api.article.remove));

  app.route("/categories/:id/articles").get(app.api.article.getByCategory);

  app
    .route("/stats")
    .all(app.config.passport.authenticate())
    .get(admin(app.api.stat.get));
};
