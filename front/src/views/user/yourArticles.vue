<template>
  <v-app>
    <v-sheet fill-width class="my-2 rounded-xl">
      <h1 v-if="loggedUser">
        Hi, {{ loggedUser.name }}, these are your articles!
      </h1>
      <v-layout v-if="articles" wrap>
        <v-flex
          xs12
          xm6
          md6
          lg6
          v-for="article in articles.data"
          :key="article.id"
        >
          <v-card
            flat
            class="text-xs-center ma-3 rounded-xl"
            outlined
            :to="{ path: `/article/${article.id}`, params: `${article.id}` }"
          >
            <v-parallax
              v-if="article.imageUrl"
              height="300"
              :src="article.imageUrl"
            ></v-parallax>
            <v-parallax
              v-else
              height="300"
              src="@/assets/article.png"
            ></v-parallax>
            <v-card-title>{{ article.name }}</v-card-title>
            <v-card-text>{{ article.description }}</v-card-text>
            <v-card-actions
              ><v-btn
                icon
                :to="{ name: 'EditYourArticles', params: { id: article.id } }"
                ><v-icon>mdi-pencil</v-icon></v-btn
              ></v-card-actions
            >
          </v-card>
          <v-card> </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 xm12 md12 lg12>
          <v-pagination
            v-if="articles && length > 1"
            v-model="page"
            :length="length"
            circle
          ></v-pagination>
        </v-flex>
      </v-layout>
    </v-sheet>

    <!-- <v-row v-if="!articles">
      <v-col class="d-flex justify-center align-center" cols="12">
        <loading />
        carregando...
      </v-col>
    </v-row> -->
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    userId: null,
    articles: null,
    page: 1,
    count: 0,
    limit: 0,
    length: 0,
  }),

  computed: {
    ...mapState("user", ["myArticles"]),
    ...mapState(["loggedUser"]),
  },
  methods: {
    ...mapActions("user", ["getMyArticles"]),
    editArticle(idArticle) {
      console.log(idArticle);
      this.$router.push({
        path: "EditYourArticles",
        params: { id: idArticle },
      });
    },
  },
  watch: {
    page() {
      this.getMyArticles({ page: this.page, userId: this.userId });
      this.articles = this.myArticles;
      let rootElement = document.documentElement;
      rootElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    myArticles() {
      this.articles = this.myArticles;
    },
  },
  async created() {
    this.userId = await this.loggedUser["id"];
    await this.getMyArticles({ page: this.page, userId: this.userId });
    this.articles = await this.myArticles;

    this.count = this.myArticles.count;
    this.limit = this.myArticles.limit;
    this.length = Math.round(this.count / this.limit);
  },
};
</script>

<style></style>
