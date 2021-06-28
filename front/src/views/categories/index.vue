<template>
  <v-app fluid>
    <h1>Categories</h1>
    <v-layout wrap>
      <v-flex
        xs12
        sm12
        md6
        lg6
        class="__normal hidden-sm-and-down"
        v-if="feedCategories"
      >
        <v-card
          flat
          outlined
          class="text-xs-center ma-3 rounded-xl"
          v-for="(category, index) in categoriesArray.data"
          :key="index"
          :to="{ name: `category`, params: { id: category.id } }"
        >
          <v-card-title class="text-h6">{{ category.name }}</v-card-title>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        sm12
        md6
        lg6
        class="__normal hidden-sm-and-down"
        v-if="feedCategories"
      >
        <router-view :key="key" />
      </v-flex>
      <v-flex
        xs12
        sm12
        md6
        lg6
        class="__mobile hidden-md-and-up"
        v-if="feedCategories"
      >
        <v-card
          flat
          outlined
          class="text-xs-center ma-3 rounded-xl"
          v-for="(category, index) in categoriesArray.data"
          :key="index"
          :to="{ name: `categoryMobile`, params: { id: category.id } }"
        >
          <v-card-title class="text-h6">{{ category.name }}</v-card-title>
        </v-card>
        <v-pagination
          v-if="feedCategories && length > 1"
          v-model="page"
          :length="length"
          circle
        ></v-pagination>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12 v-else>
        <template>
          <v-row>
            <v-col class="d-flex justify-center align-center" cols="12">
              <loading />
            </v-col>
          </v-row>
        </template>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    categoryId: null,
    categoriesArray: [],
    page: 1,
    count: 0,
    limit: 0,
    length: 1,
  }),
  computed: {
    ...mapState("categories", ["feedCategories"]),
    key() {
      return this.$route.path + Math.random();
    },
  },
  methods: {
    ...mapActions("categories", ["getFeedCategories"]),
  },
  watch: {
    async page() {
      await this.getFeedCategories(Number(this.page));
      let rootElement = document.documentElement;
      rootElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.categoriesArray = this.feedCategories;
    },
    categoryId() {
      // console.log(this.categoryId.id.index);
      this.$router.push({
        name: "category",
        params: { id: this.categoryId.id },
      });
    },
  },
  async created() {
    await this.getFeedCategories();
    this.categoriesArray = this.feedCategories;
    this.count = this.categoriesArray.count;
    this.limit = this.categoriesArray.limit;
    this.length = Math.round(this.count / this.limit);
  },
};
</script>

<style></style>
