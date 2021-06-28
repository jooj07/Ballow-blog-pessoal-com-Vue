<template>
  <v-form>
    <v-layout wrap>
      <v-flex lg12 md12 sm12 xs12>
        <v-btn icon small :to="{ path: '/admin' }" class="ml-6">
          <v-icon>mdi-arrow-left-bold-outline</v-icon> dashboard
        </v-btn>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12>
        <h1>Categories</h1>
        <h2 v-if="editOrDel === false">New category</h2>
        <h2 v-if="editOrDel === true">Edit or delete category</h2>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12 v-if="editOrDel === false">
        <v-text-field
          outlined
          label="Name"
          class=""
          v-model="categoryForm.name"
        ></v-text-field>
      </v-flex>

      <v-flex lg12 md12 sm12 xs12 v-if="editOrDel === true">
        <v-text-field
          outlined
          label="Name"
          class=""
          v-model="categoryEdit.name"
        ></v-text-field>
      </v-flex>

      <v-flex lg12 md12 sm12 xs12>
        <v-btn
          outlined
          block
          color="secondary"
          v-if="editOrDel === false"
          @click="save"
          class="my-1"
        >
          <v-icon left>mdi-check-outline</v-icon>Save</v-btn
        >
        <v-btn
          outlined
          class="my-1"
          block
          color="error"
          v-if="editOrDel === true"
          @click="delet"
        >
          <v-icon left>mdi-delete-outline</v-icon> Delete</v-btn
        >
        <v-btn
          outlined
          class="my-4"
          block
          color="secondary"
          v-if="editOrDel === true"
          @click="edit"
        >
          <v-icon left>mdi-pencil-outline</v-icon> Edit</v-btn
        >
        <v-btn
          outlined
          class="my-4"
          block
          v-if="editOrDel === true"
          @click="reset"
        >
          <v-icon left>mdi-pencil-outline</v-icon> cancel</v-btn
        >
      </v-flex>
      <v-flex lg12 md12 sm12 xs12>
        <h2>Categories table</h2>
        <p class="text-caption grey--text my-0">
          Select one bellow to edit or delete.
        </p>
        <p class="text-caption red--text">
          Remeber: If your category has articles,
          <strong>you must to delete them first!</strong>
        </p>
      </v-flex>

      <v-flex lg12 md12 sm12 xs12 v-if="categories">
        <v-data-table
          :items="categoriesArray['data']"
          :headers="headers"
          class="elevation-0"
          item-key="id"
          hide-no-data
          readonly
          hide-default-footer
        >
        </v-data-table>
        <v-pagination
          v-if="categoriesArray && length > 1"
          v-model="page"
          :length="length"
          circle
        ></v-pagination>
        <h2>Want to edit an article?</h2>
        <span class="text-subtitle-2 grey--text">Pick one bellow:</span>
        <v-combobox
          :items="categoriesArray['data']"
          v-model="selected"
          item-text="name"
          label="Select a article: "
          outlined
          single-line
          return-object
        ></v-combobox>
        <v-btn outlined block v-if="selected.id" @click="editArticle">
          <v-icon left>mdi-pencil-outline</v-icon> edit this article</v-btn
        >
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
  </v-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {showError} from "@/global.js"
export default {
  name: "categoriesOverview",
  data: () => ({
    page: 1,
    count: 0,
    limit: 0,
    length: 0,
    editOrDel: false,
    value: true,
    categoryForm: { name: null },
    categoryEdit: {},
    selected: [],
    categoriesArray: [],
  }),
  methods: {
    ...mapActions("admin", [
      "getCategories",
      "createCategory",
      "deleteCategory",
      "editCategory",
      "getCategory",
    ]),
    async editArticle() {
      this.editOrDel = true;
      await this.getCategory(this.selected.id);
      let cloneNoRef = JSON.stringify(this.category);
      this.categoryEdit = JSON.parse(cloneNoRef);
      let rootElement = document.documentElement;
      rootElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    reset() {
      let cloneNoRef = JSON.stringify({});
      this.categoryEdit = JSON.parse(cloneNoRef);
      this.selected = [];
      this.editOrDel = false;
      this.getCategories();
    },
    edit() {
      this.editCategory(this.categoryEdit);
      this.reset();
    },
    delet() {
      this.deleteCategory(this.categoryEdit.id);
      this.reset();
    },
    async save() {
      try {
         await this.createCategory(this.categoryForm);
      } catch (error) {
        showError(error)
      }
     
      (this.categoryForm = { name: null }), (this.page = 1);
    },
  },
  computed: {
    ...mapState("admin", ["categories", "category"]),
    headers() {
      return [
        { text: "Id", value: "id" },
        { text: "Name", value: "name" },
      ];
    },
  },
  watch: {
    categories() {
      this.categoriesArray = this.categories;
    },
    async page() {
      await this.getCategories(this.page);
    },
  },
  async created() {
    await this.getCategories(1);
    this.categoriesArray = this.categories;
    this.count = this.categoriesArray.count;
    this.limit = this.categoriesArray.limit;
    this.length = Math.round(this.count / this.limit);
    // this.translateBool(this.users);
  },
};
</script>

<style></style>
