<template>
  <v-app>
    <v-container fluid>
      <v-flex xs12 xm12 md12 lg12>
        <v-dialog v-model="modal" width="500" persistent>
          <v-card>
            <v-card-title class="text-h3"> Warning! </v-card-title>

            <v-card-text class="text-body-1">
              Are you sure? that means this article is gone forever &#128561;
            </v-card-text>

            <v-divider inset></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="deleteArticle(parsedId)">
                <v-icon color="error">mdi-trash-can-outline</v-icon>
              </v-btn>
              <v-btn color="primary" text @click="modal = false">
                <v-icon color="green">mdi-close-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex xs12 xm12 md12 lg12>
        <v-btn icon small :to="{ path: '/yourArticles' }" class="ml-2">
          <v-icon>mdi-arrow-left-bold-outline</v-icon> back
        </v-btn>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12>
        <v-text-field
          outlined
          label="title"
          class=""
          v-model="article.name"
        ></v-text-field>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12>
        <v-combobox
          :items="categoriesArray"
          v-model="article.categoryId"
          item-text="name"
          label="Select a category: "
          outlined
          single-line
          return-object
        ></v-combobox>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12>
        <v-text-field
          outlined
          label="Description"
          class=""
          v-model="article.description"
        ></v-text-field>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12>
        <v-text-field
          outlined
          label="Header image URL"
          class=""
          v-model="article.imageUrl"
        ></v-text-field>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12>
        <VueEditor v-if="article.content" v-model="article.content"></VueEditor>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12>
        <v-btn icon @click="modal = true" color="error">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
        <v-btn icon color="accent" @click="editArticle()">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { VueEditor } from "vue2-editor";
import { showError } from "@/global.js";
export default {
  components: { VueEditor },
  data: () => ({
    article: [],
    modal: false,
    parsedId: null,
    categoriesArray: [],
    categoryId: null,
  }),
  props: ["id"],
  computed: {
    ...mapState("user", ["myArticle"]),
    ...mapState(["loggedUser"]),
    ...mapState("admin", ["categories"]),
  },
  methods: {
    ...mapActions("user", [
      "getMyArticle",
      "deleteMyArticle",
      "editMyArticle",
      "getMyArticles",
    ]),
    ...mapActions("admin", ["getCategories"]),

    async deleteArticle(id) {
      try {
        await this.deleteMyArticle(id);
        await this.getMyArticles({ page: 1, userId: this.loggedUser.id });
        this.modal = await false;
        await this.$router.push("/yourArticles");
      } catch (error) {
        showError(error);
      }
    },
    async editArticle() {
      try {
        let category = this.article.categoryId["id"];
        let toAssing = { categoryId: category };
        let assigned = Object.assign(this.article, toAssing);
        await this.editMyArticle(assigned);
        await this.getMyArticles({ page: 1, userId: this.loggedUser.id });
      } catch (error) {
        showError(error);
      }
    },
  },
  async created() {
    this.parsedId = Number(this.id);
    await this.getMyArticle(this.parsedId);
    try {
      if (this.myArticle.userId === this.loggedUser.id) {
        this.article = this.myArticle;
      } else {
        this.$router.push("/yourArticles");
      }
    } catch (error) {
      this.$router.push("/yourArticles");
    }
    await this.getCategories();
    this.categoriesArray = await this.categories;
  },
};
</script>

<style></style>
