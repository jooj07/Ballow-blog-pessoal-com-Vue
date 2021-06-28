<template>
  <v-form>
    <v-layout wrap>
      <v-flex lg12 md12 sm12 xs12>
        <v-btn icon small :to="{ path: '/' }" class="ml-6">
          <v-icon>mdi-arrow-left-bold-outline</v-icon> back
        </v-btn>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12>
        <h1>Articles</h1>
        <h2>New Article</h2>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12>
        <v-text-field
          outlined
          label="title"
          class=""
          v-model="articleForm.name"
        ></v-text-field>
      </v-flex>

      <v-flex lg12 md12 sm12 xs12>
        <v-combobox
          :items="combobox"
          v-model="categoryId"
          v-if="combobox"
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
          v-model="articleForm.description"
        ></v-text-field>
      </v-flex>

      <v-flex lg12 md12 sm12 xs12>
        <v-text-field
          outlined
          label="Header image URL"
          class=""
          v-model="articleForm.imageUrl"
        ></v-text-field>
      </v-flex>

      <v-flex lg12 md12 sm12 xs12 class="mb-2">
        <VueEditor v-model="content" />
      </v-flex>

      <v-flex lg12 md12 sm12 xs12>
        <v-btn outlined block color="secondary" @click="save" class="my-4">
          <v-icon left>mdi-check-outline</v-icon>Save</v-btn
        >
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapState, mapActions } from "vuex";
import { showError } from "@/global.js";
export default {
  name: "articlesOverview",
  data: () => ({
    content: null,
    value: true,
    articleForm: { name: null, description: null, content: null },
    categoryId: null,
    userId: null,
    combobox: null,
  }),
  components: {
    VueEditor,
  },
  methods: {
    ...mapActions("user", ["createArticle", "getCategories", "getMyArticles"]),

    reset() {
      let cloneNoRef = JSON.stringify({});
      this.articleForm = JSON.parse(cloneNoRef);
    },

    async save() {
      try {
        let toAssign = {
          categoryId: this.categoryId.id,
          userId: this.userId,
          content: this.content,
        };
        this.articleForm = Object.assign(this.articleForm, toAssign);
        await this.createArticle(this.articleForm);
        await this.getMyArticles({ userId: this.userId, page: 1 });
        await this.reset();
        await this.$router.push("/yourArticles");
      } catch (error) {
        showError(error);
      }
    },
  },
  computed: {
    ...mapState("user", ["categories"]),
    ...mapState(["loggedUser"]),
  },

  async created() {
    await this.getCategories();
    this.combobox = this.categories.data;
    this.userId = this.loggedUser.id;
  },
};
</script>

<style></style>
