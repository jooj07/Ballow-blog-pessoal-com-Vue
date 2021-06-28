<template>
  <v-form>
    <v-layout wrap>
      <v-flex lg12 md12 sm12 xs12>
        <v-btn icon small :to="{ path: '/admin' }" class="ml-6">
          <v-icon>mdi-arrow-left-bold-outline</v-icon> dashboard
        </v-btn>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12>
        <h1>Articles</h1>
        <h2 v-if="editOrDel">New Article</h2>
        <h2 v-if="!editOrDel">Edit or delete article</h2>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12 v-if="editOrDel">
        <v-text-field
          outlined
          label="title"
          class=""
          v-model="articleForm.name"
        ></v-text-field>
      </v-flex>

      <v-flex lg12 md12 sm12 xs12 v-if="!editOrDel">
        <v-text-field
          outlined
          label="title"
          class=""
          v-model="articleEdit.name"
        ></v-text-field>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12 v-if="editOrDel">
        <v-combobox
          :items="combobox.categories.data"
          v-model="categoryId"
          item-text="name"
          label="Select a category: "
          outlined
          single-line
          return-object
        ></v-combobox>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12 v-if="editOrDel">
        <v-combobox
          :items="combobox.users.data"
          v-model="userId"
          item-text="name"
          label="Select a user:"
          outlined
          single-line
          return-object
        ></v-combobox>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12 v-if="!editOrDel">
        <v-combobox
          :items="combobox.categories.data"
          v-model="articleEdit.categoryId"
          item-text="name"
          label="Select a category: "
          outlined
          single-line
          return-object
        ></v-combobox>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12 v-if="!editOrDel">
        <v-combobox
          :items="combobox.users.data"
          v-model="articleEdit.userId"
          item-text="name"
          label="Select a user:"
          outlined
          single-line
          return-object
        ></v-combobox>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12 v-if="editOrDel">
        <v-text-field
          outlined
          label="Description"
          class=""
          v-model="articleForm.description"
        ></v-text-field>
      </v-flex>

      <v-flex lg12 md12 sm12 xs12 v-if="!editOrDel">
        <v-text-field
          outlined
          label="Description"
          class=""
          v-model="articleEdit.description"
        ></v-text-field>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12 v-if="editOrDel">
        <v-text-field
          outlined
          label="Header image URL"
          class=""
          v-model="articleForm.imageUrl"
        ></v-text-field>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12 v-if="!editOrDel">
        <v-text-field
          outlined
          label="Header image URL"
          class=""
          v-model="articleEdit.imageUrl"
        ></v-text-field>
      </v-flex>

      <v-flex lg12 md12 sm12 xs12 class="mb-2">
        <VueEditor v-if="editOrDel" v-model="content" />
      </v-flex>
      <v-flex lg12 md12 sm12 xs12 v-if="!editOrDel">
        <VueEditor
          v-if="articleEdit.content"
          v-model="articleEdit.content"
        ></VueEditor>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12>
        <v-btn
          outlined
          block
          color="secondary"
          v-if="editOrDel"
          @click="save"
          class="my-4"
        >
          <v-icon left>mdi-check-outline</v-icon>Save</v-btn
        >

        <v-btn
          outlined
          class="my-4"
          block
          color="secondary"
          v-if="!editOrDel"
          @click="edit"
        >
          <v-icon left>mdi-pencil-outline</v-icon> Edit</v-btn
        >
        <v-btn
          outlined
          class="my-4"
          block
          color="error"
          v-if="!editOrDel"
          @click="delet"
        >
          <v-icon left>mdi-delete-outline</v-icon> Delete</v-btn
        >
        <v-btn outlined class="my-4" block v-if="!editOrDel" @click="reset">
          <v-icon left>mdi-cancel</v-icon> cancel</v-btn
        >
      </v-flex>

      <v-flex lg12 md12 sm12 xs12 v-if="articles">
        <h2>Articles table</h2>
        <v-data-table
          hide-default-footer
          :items="articlesArray['data']"
          :headers="headers"
          class="elevation-0"
          item-key="id"
          hide-no-data
        >
        </v-data-table>

        <v-pagination
          v-if="articlesArray && length > 1"
          v-model="page"
          :length="length"
          circle
        ></v-pagination>
        <h2>Want to edit an article?</h2>
        <span class="text-subtitle-2 grey--text">Pick one bellow:</span>
        <v-combobox
          :items="articlesArray['data']"
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
import { VueEditor } from "vue2-editor";
import { mapState, mapActions } from "vuex";
import { showError } from "@/global.js";
export default {
  name: "articlesOverview",
  data: () => ({
    page: 1,
    count: 0,
    limit: 0,
    length: 0,
    editOrDel: true,
    content: null,
    editor: false,
    value: true,
    articleForm: { name: null, description: null, content: null },
    categoryId: null,
    userId: null,
    articleEdit: {},
    selected: [],
    articlesArray: [],
    combobox: {
      users: [],
      categories: [],
    },
  }),
  components: {
    VueEditor,
  },

  methods: {
    ...mapActions("admin", [
      "getUsers",
      "getCategories",
      "getArticles",
      "getArticle",
      "createArticle",
      "deleteArticle",
      "editArticleAction",
    ]),

    reset() {
      let cloneNoRef = JSON.stringify({});
      this.articleEdit = JSON.parse(cloneNoRef);
      this.selected = [];
      this.editOrDel = !this.editOrDel;
    },
    async edit() {
      let edit = JSON.stringify(this.articleEdit);
      edit = JSON.parse(edit);
      try {
        if (this.articleEdit.categoryId.id || this.articleEdit.userId.id) {
          let category = this.articleEdit.categoryId.id
            ? this.articleEdit.categoryId.id
            : edit.categoryId;
          let user = this.articleEdit.userId.id
            ? this.articleEdit.userId.id
            : edit.userId;
          let toAssign = { categoryId: category, userId: user };
          edit = Object.assign(edit, toAssign);
          await this.editArticleAction(edit);
          await this.reset();
        } else {
          await this.editArticleAction(edit);
          await this.reset();
        }
      } catch (error) {
        showError(error);
      }
    },
    async delet() {
      try {
        await this.deleteArticle(this.selected.id);
        this.articleForm = await {
          name: null,
          description: null,
          content: null,
        };
        (this.content = null), (this.categoryId = null), (this.userId = null);
        await this.reset();
        let rootElement = document.documentElement;
        rootElement.scrollTo({
          top: 1000,
          behavior: "smooth",
        });
      } catch (error) {
        showError(error);
      }
    },
    async save() {
      try {
        let toAssign = {
          categoryId: this.categoryId.id,
          userId: this.userId.id,
          content: this.content,
        };
        this.articleForm = Object.assign(this.articleForm, toAssign);
        await this.createArticle(this.articleForm);
        this.articleForm = await {
          name: null,
          description: null,
          content: null,
        };
        (this.content = null), (this.categoryId = null), (this.userId = null);
        let rootElement = document.documentElement;
        rootElement.scrollTo({
          top: 1000,
          behavior: "smooth",
        });
      } catch (error) {
        showError(error);
      }
    },
    // trigger() {
    //   let cloneNoRef = JSON.stringify(this.selected);
    //   this.articleEdit = JSON.parse(cloneNoRef)[0];
    //   this.editOrDel = !this.editOrDel;
    // },
    async editArticle() {
      try {
        await this.getArticle(this.selected.id);
        this.editOrDel = await false;
        let cloneNoRef = await JSON.stringify(this.article);
        this.articleEdit = await JSON.parse(cloneNoRef);
        let rootElement = document.documentElement;
        rootElement.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        showError(error);
      }
    },
  },
  computed: {
    ...mapState("admin", ["articles", "users", "categories", "article"]),
    headers() {
      return [
        { text: "Id", value: "id" },
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Category", value: "categoryId" },
        { text: "Author ID", value: "userId" },
      ];
    },
  },
  watch: {
    users() {
      this.combobox.users = this.users;
    },
    categories() {
      this.combobox.categories = this.categories;
    },
    articles() {
      this.articlesArray = this.articles;
    },
    page() {
      this.getArticles(this.page);
    },
  },
  async created() {
    await this.getArticles();
    await this.getUsers();
    await this.getCategories();
    await this.getArticles();
    this.combobox.users = this.users;
    this.combobox.categories = this.categories;
    this.articlesArray = this.articles;
    this.count = this.articlesArray.count;
    this.limit = this.articlesArray.limit;
    this.length = Math.round(this.count / this.limit);
  },
};
</script>

<style></style>
