<template>
  <v-app>
    <h1>Feed</h1>
    <v-sheet fill-width class="my-2 rounded-xl">
      <v-layout v-if="articles" wrap>
        <v-flex
          xs12
          sm6
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
              alt="Article image"
              :src="article.imageUrl"
            ></v-parallax>
            <v-parallax
              v-else
              height="300"
              alt="Article image"
              src="@/assets/article.png"
            ></v-parallax>
            <v-card-title>{{ article.name }}</v-card-title>
            <v-card-text>{{ article.description }}</v-card-text>
          </v-card>
          <v-card> </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 xm12 md12 lg12>
          <v-pagination
            v-if="articles && length>1"
            v-model="page"
            :length="length"
            circle
          ></v-pagination>
        </v-flex>
      </v-layout>
    </v-sheet>

    
    <v-row v-if="!articles">
      <v-col class="d-flex justify-center align-center" cols="12">
        <loading />
        carregando...
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "feed",
  data: () => ({
    page: 1,
    count: 0,
    limit: 0,
    length: 0,
    articlesArray: [],
  }),
  computed: {
    ...mapState("feed", ["articles", "article"]),
  },
  methods: {
    ...mapActions("feed", ["getArticles"]),
  },
  watch: {
    page() {
      this.getArticles(this.page);
      let rootElement = document.documentElement;
      rootElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  
  async beforeMount() {
    await this.getArticles();
    this.articlesArray = this.articles;
    this.count = this.articlesArray.count;
    this.limit = this.articlesArray.limit;
    this.length = Math.round(this.count / this.limit);
  },
};
</script>

<style></style>
