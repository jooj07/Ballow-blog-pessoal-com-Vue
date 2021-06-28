<template>
  <v-form>
    <v-layout wrap>
      <v-flex lg12 md12 sm12 xs12>
        <v-btn icon small :to="{ path: '/admin' }" class="ml-6">
          <v-icon>mdi-arrow-left-bold-outline</v-icon> dashboard
        </v-btn>
      </v-flex>
      <v-flex lg12 md12 sm12 xs12>
        <h1>Users</h1>
        <h2 v-if="editOrDel">New user</h2>
        <h2 v-if="!editOrDel">Edit or delete user</h2>
      </v-flex>
      <v-flex lg6 md12 sm12 xs12 v-if="editOrDel">
        <v-text-field
          outlined
          label="Name"
          class="mx-2"
          v-model="userForm.name"
        ></v-text-field>
      </v-flex>
      <v-flex lg6 md12 sm12 xs12 v-if="editOrDel">
        <v-text-field
          outlined
          type="email"
          label="E-mail"
          class="mx-2"
          v-model="userForm.email"
        ></v-text-field>
      </v-flex>
      <v-flex lg6 md12 sm12 xs12 v-if="editOrDel">
        <v-text-field
          outlined
          type="password"
          label="Passowrd"
          class="mx-2"
          v-model="userForm.password"
        ></v-text-field>
      </v-flex>
      <v-flex lg6 md12 sm12 xs12 v-if="editOrDel">
        <v-text-field
          outlined
          type="password"
          label="Confirm your Passowrd"
          class="mx-2"
          v-model="userForm.confirmPassword"
        ></v-text-field>
      </v-flex>
      <v-flex lg6 md6 sm12 xs12 v-if="editOrDel">
        <v-switch
          inset
          label="Administrador?"
          v-model="userForm.admin"
        ></v-switch>
      </v-flex>
      <v-flex lg6 md12 sm12 xs12 v-if="!editOrDel">
        <v-text-field
          outlined
          label="Edit Name"
          class="mx-2"
          v-model="userEdit.name"
        ></v-text-field>
      </v-flex>
      <v-flex lg6 md12 sm12 xs12 v-if="!editOrDel">
        <v-text-field
          outlined
          type="email"
          label="E-mail"
          class="mx-2"
          v-model="userEdit.email"
        ></v-text-field>
      </v-flex>
      <v-flex lg6 md12 sm12 xs12 v-if="!editOrDel">
        <v-text-field
          outlined
          type="text"
          label="Passowrd"
          class="mx-2"
          v-model="userEdit.password"
        ></v-text-field>
      </v-flex>
      <v-flex lg6 md12 sm12 xs12 v-if="!editOrDel">
        <v-text-field
          outlined
          type="password"
          label="Confirm your Passowrd"
          class="mx-2"
          v-model="userEdit.confirmPassword"
        ></v-text-field>
      </v-flex>
      <v-flex lg6 md6 sm12 xs12 v-if="!editOrDel">
        <v-switch
          inset
          label="Administrador?"
          v-model="userEdit.admin"
        ></v-switch>
      </v-flex>
      <v-flex lg6 md6 sm12 xs12>
        <v-btn outlined block color="secondary" v-if="editOrDel" @click="save">
          <v-icon left>mdi-check-outline</v-icon>Save</v-btn
        >
        <v-btn
          outlined
          class="my-1"
          block
          color="error"
          v-if="!editOrDel"
          @click="delet"
        >
          <v-icon left>mdi-delete-outline</v-icon> Delete</v-btn
        >
        <v-btn
          outlined
          class="my-1"
          block
          color="secondary"
          v-if="!editOrDel"
          @click="edit"
        >
          <v-icon left>mdi-pencil-outline</v-icon> Edit</v-btn
        >
        <v-btn outlined class="my-1" block v-if="!editOrDel" @click="reset">
          <v-icon left>mdi-close</v-icon> cancel</v-btn
        >
      </v-flex>
      <v-flex lg12 md12 sm12 xs12 v-if="users">
        <h2 class="mt-2">User table</h2>
        <v-data-table
          :items="usersArray['data']"
          :headers="headers"
          class="elevation-0"
          item-key="id"
          hide-default-footer
        >
        </v-data-table>
        <v-pagination
          v-if="usersArray && length > 1"
          v-model="page"
          :length="4"
          circle
        ></v-pagination>

        <h2>Want to edit an user?</h2>
        <span class="text-caption grey--text">Pick one bellow:</span>
        <v-combobox
          :items="usersArray['data']"
          v-model="selected"
          item-text="email"
          label="Select an user: "
          outlined
          single-line
          return-object
        ></v-combobox>
        <v-btn outlined block v-if="selected.id" @click="editProfile">
          <v-icon left>mdi-pencil-outline</v-icon> edit this profile</v-btn
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
import { showError } from "@/global.js";
export default {
  name: "usersOverview",
  data: () => ({
    page: 1,
    count: 0,
    limit: 0,
    length: 0,
    editOrDel: true,
    value: true,
    userForm: {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      admin: false,
    },
    userEdit: {},
    selected: [],
    usersArray: [],
  }),
  methods: {
    async editProfile() {
      await this.getUser(this.selected.id);
      let cloneNoRef = JSON.stringify(this.selectedUser);
      this.userEdit = JSON.parse(cloneNoRef);
      this.editOrDel = false;
      let rootElement = document.documentElement;
      rootElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    ...mapActions("admin", [
      "getUsers",
      "editUser",
      "deleteUser",
      "createUser",
      "getUser",
    ]),

    reset() {
      let cloneNoRef = JSON.stringify({});
      this.userEdit = JSON.parse(cloneNoRef);
      this.selected = [];
      this.editOrDel = !this.editOrDel;
    },
    resetForm() {
      this.userForm = {
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
        admin: false,
      };
    },
    async edit() {
      try {
        await this.editUser(this.userEdit);
        await this.reset();
      } catch (error) {
        showError(error);
      }
    },
    async delet() {
      try {
        await this.deleteUser(this.userEdit.id);
        await this.reset();
      } catch (error) {
        showError(error);
      }
    },
    async save() {
      try {
        await this.createUser(this.userForm);
        await this.resetForm();
      } catch (error) {
        showError(error);
      }
    },
  },
  computed: {
    ...mapState("admin", ["users", "selectedUser"]),
    headers() {
      return [
        { text: "Id", value: "id" },
        { text: "Name", value: "name" },
        { text: "E-mail", value: "email" },
        { text: "Admin", value: "admin" },
      ];
    },
  },
  watch: {
    users() {
      this.usersArray = this.users;
    },
    page() {
      this.getUsers(Number(this.page));
    },
  },
  async created() {
    await this.getUsers(1);
    this.usersArray = this.users;
    this.count = this.usersArray.count;
    this.limit = this.usersArray.limit;
    this.length = Math.round(this.count / this.limit);
  },
};
</script>

<style></style>
