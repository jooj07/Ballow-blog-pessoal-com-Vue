<template>
  <v-app>
    <v-sheet fill-width class="my-2 px-5 rounded-xl">
      <h1>Dashboard</h1>
      <v-layout wrap>
        <v-flex v-if="stats" lg6 md12 sm12 xs12>
          <v-card flat class="text-xs-center ma-3 rounded-xl" outlined>
            <v-card-title class="text-h3"
              ><v-icon x-large left
                >mdi-newspaper-variant-multiple-outline</v-icon
              >Articles</v-card-title
            >
            <v-card-text class="text-h1 d-flex justify-center">{{
              stats.articles
            }}</v-card-text>
            <v-card-actions>
              <v-hover v-slot:default="{ hover }">
                <v-btn
                  :elevation="hover ? 4 : 0"
                  :to="{ path: '/dashArticles' }"
                  outlined
                  small
                  class="ml-3"
                  color="primary"
                  >More</v-btn
                ></v-hover
              >
            </v-card-actions>
          </v-card>
          <v-card> </v-card>
        </v-flex>
        <v-flex v-if="stats" xs12 sm12 md6 lg6>
          <v-card flat class="text-xs-center ma-3 rounded-xl" outlined>
            <v-card-title class="text-h3"
              ><v-icon x-large left>mdi-filter-variant</v-icon
              >Categories</v-card-title
            >
            <v-card-text class="text-h1 d-flex justify-center">{{
              stats.categories
            }}</v-card-text>
            <v-card-actions>
              <v-hover v-slot:default="{ hover }">
                <v-btn
                  :elevation="hover ? 4 : 0"
                  :to="{ path: '/dashCategories' }"
                  outlined
                  small
                  class="ml-3"
                  color="primary"
                  >More</v-btn
                ></v-hover
              >
            </v-card-actions>
          </v-card>
          <v-card> </v-card>
        </v-flex>
        <v-flex v-if="stats" xs12 sm12 md6 lg12>
          <v-card flat class="text-xs-center ma-3 rounded-xl" outlined>
            <v-card-title class="text-h3"
              ><v-icon x-large left>mdi-account-circle-outline</v-icon
              >Users</v-card-title
            >
            <v-card-text class="text-h1 d-flex justify-center">{{
              stats.users
            }}</v-card-text>
            <v-card-actions>
              <v-hover v-slot:default="{ hover }">
                <v-btn
                  :elevation="hover ? 4 : 0"
                  :to="{ path: '/dashUsers' }"
                  outlined
                  small
                  class="ml-3"
                  color="primary"
                  >More</v-btn
                ></v-hover
              >
            </v-card-actions>
          </v-card>
          <v-card> </v-card>
        </v-flex>
        <v-row v-else>
          <v-col class="d-flex justify-center align-center" cols="12">
            <loading />
            carregando...
          </v-col>
        </v-row>
      </v-layout>
    </v-sheet>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "adminPanel",
  computed: {
    ...mapState("admin", ["stats"]),
  },
  methods: {
    ...mapActions("admin", ["getStats"]),
  },
  created() {
    this.getStats();
  },
};
</script>

<style></style>
