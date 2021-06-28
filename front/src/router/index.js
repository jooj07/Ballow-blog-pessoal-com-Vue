import Vue from "vue";
import VueRouter from "vue-router";
import { storageName } from "../global";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Feed" */ "@/views/feed"),
    children: [
      {
        path: "/feed",
        name: "feed",
        component: () => import(/* webpackChunkName: "Feed" */ "@/views/feed"),
      },
    ],
  },
  {
    path: "/article/:id",
    name: "",
    props: true,
    component: () =>
      import(/* webpackChunkName: "Article's page" */ "@/views/feed/article"),
  },
  {
    path: "/admin",
    name: "",
    props: true,
    component: () =>
      import(/* webpackChunkName: "Admin's dashboard" */ "@/views/admin"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/dashUsers",
    name: "dashUsers",
    component: () =>
      import(
        /* webpackChunkName: "Admin's dashboard - users" */ "@/views/admin/admUsers.vue"
      ),
  },
  {
    path: "/dashCategories",
    name: "dashCategories",
    component: () =>
      import(
        /* webpackChunkName: "Admin's dashboard - categories" */ "@/views/admin/admCategories.vue"
      ),
  },
  {
    path: "/dashArticles",
    name: "dashArticles",
    component: () =>
      import(
        /* webpackChunkName: "Admin's dashboard - articles" */ "@/views/admin/admArticles.vue"
      ),
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/auth"),
  },
  {
    path: "/write",
    name: "write",
    component: () =>
      import(
        /* webpackChunkName: "User's post article view" */ "@/views/user/newArticle.vue"
      ),
  },
  {
    path: "/yourArticles",
    name: "yourArticles",
    component: () =>
      import(
        /* webpackChunkName: "User's post article view" */ "@/views/user/yourArticles.vue"
      ),
  },
  {
    path: "/EditYourArticles/:id",
    name: "EditYourArticles",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "User's edit own article page" */ "@/views/user/editArticle.vue"
      ),
  },
  {
    path: "/categories",
    name: "categories",
    children: [
      {
        path: ":id",
        name: "category",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "User's edit own article page" */ "@/views/categories/category"
          ),
      },
    ],
    component: () =>
      import(
        /* webpackChunkName: "User's edit own article page" */ "@/views/categories"
      ),
  },
  {
    path: "/categoryMobile/:id",
    name: "categoryMobile",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "User's edit own article page" */ "@/views/categories/category"
      ),
  },

  {
    path: "*",
    name: "E404",
    component: () =>
      import(/* webpackChunkName: "Error 404" */ "@/views/error"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(storageName);

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    const user = JSON.parse(json);
    user && user.admin ? next() : next({ path: "/" });
  } else {
    next();
  }
});

export default router;
