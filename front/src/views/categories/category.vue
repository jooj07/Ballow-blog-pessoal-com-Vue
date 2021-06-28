<template>
  <v-app>
    <v-container>
      
      <v-row>
        <v-col cols="12">
          <v-toolbar
            class="rounded-pill __mobile hidden-md-and-up"
            flat
            dense
            floating
          >
            <v-btn class="hidden-md-and-up" icon @click="$router.go(-1)"
              ><v-icon>mdi-arrow-left</v-icon></v-btn
            >

            <h1 class="ml-2">{{ id }}</h1>
          </v-toolbar>
        </v-col>
      </v-row>
      <v-row v-if="contetArray.length > 0">
        <v-col cols="12" class="d-flex flex-column flex-wrap">
          <v-card
            class="mb-4 text-xs-center rounded-xl"
            flat
            outlined
            width="400"
            v-for="(article, index) in contetArray"
            :key="index"
            :to="{ path: `/article/${article.id}`, params: `${article.id}` }"
          >
            <v-img
              v-if="article.imageUrl"
              height="300"
              :src="article.imageUrl"
            ></v-img>
            <v-card-title class="text-h5">{{ article.name }}</v-card-title>
            <v-card-text class="text-caption my-0">{{
              article.author
            }}</v-card-text>
            <v-card-text class="text-body-1">{{ article.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="d-flex flex-column">
          <h1>Oh boy, this category is empty!&#128561;</h1>
          <v-btn block large outlined to="/write">
            What about write something? &#129300;</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex flex-row align-center justify-center ">
          <v-btn v-if="loadMoreBtn" @click="loadMore" class="mr-10" outlined small> <v-icon>mdi-download</v-icon> load more</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex flex-column">
          <v-pagination
            v-if="categoryArticles && length > 1"
            v-model="page"
            :length="length"
            circle
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["id"],
  data: () => ({
    contetArray: [],
    page: 1,
    count: 0,
    limit: 0,
    length: 1,
    loadMoreBtn: true,
    catgName: null,
  }),
  computed: {
    ...mapState("categories", ["categoryArticles", "feedCategories"]),
  },
  methods: {
    ...mapActions("categories", ["getCategoryArticles"]),
    async loadMore() {
      await this.getCategoryArticles({
        id: Number(this.id),
        page: this.page++,
      });
      this.contetArray = this.contetArray.concat(this.categoryArticles);
      if (this.categoryArticles.length === 0) {
        this.loadMoreBtn = false;
      }
    },
    categoryName() {
      let obj = this.feedCategories.data.find((o) => o.id === this.id);
      this.catgName = obj;
    },
  },
 
  async created() {
    await this.getCategoryArticles({ id: Number(this.id), page: 1 });
    if (this.categoryArticles.length > 0) {
     this.loadMore()
    } else {
      this.loadMoreBtn = false;
    }
    if (this.feedCategories) {
      this.categoryName();
    }
  },
};
</script>

<style></style>
