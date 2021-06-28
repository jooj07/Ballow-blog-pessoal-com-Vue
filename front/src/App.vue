<template>
  <v-app>
    <v-app-bar hide-on-scroll app color="background" flat>
      <!-- <v-container class="py-0 fill-height d-flex align-center"> -->

      <v-layout class="d-flex justify-space-between align-center">
        <router-link class="flex-grow-1" id="ballon" :to="{ path: '/feed' }">
          <v-icon color="accent" x-large> mdi-balloon </v-icon></router-link
        >

        <v-btn class="hidden-sm-and-down" text v-if="loggedUser" to="/write">
          <v-icon left>mdi-pencil</v-icon>write</v-btn
        >
        <v-btn class="hidden-sm-and-down" text v-if="loggedUser" @click="exit">
          <v-icon left>mdi-exit-run</v-icon>exit</v-btn
        >
        <v-btn icon class="pa-2 mx-1" @click="darkmode">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
        <v-btn
          v-if="loggedUser && loggedUser.admin"
          icon
          class="pa-2 mx-1"
          to="/admin"
        >
          <v-icon>mdi-cog-outline</v-icon>
        </v-btn>

        <v-btn text v-if="!loggedUser" to="/login">
          <v-icon left>mdi-login-variant</v-icon> login</v-btn
        >
        <v-btn icon v-if="loggedUser" to="/yourArticles">
          <v-icon left>mdi-account-circle-outline</v-icon></v-btn
        >
      </v-layout>
      <!-- </v-container> -->
    </v-app-bar>
    <v-main>
      <v-container v-if="validatingToken === false">
        <v-row>
          <v-col cols="2" class="hidden-sm-and-down mr-3">
            <v-container class="d-flex flex-column px-0" wrap>
              <v-btn outlined small class="mb-4" :to="{ path: '/feed' }">
                <v-icon class="pr-2">mdi-newspaper</v-icon>
                feed
              </v-btn>

              <v-btn outlined small :to="{ path: '/categories' }">
                <v-icon class="pr-2">mdi-filter-variant</v-icon>
                Categories
              </v-btn>
            </v-container>
          </v-col>

          <v-col class="ml-4">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <template>
      <v-row v-if="validatingToken === true">
        <v-col class="d-flex justify-center align-center" cols="12">
          <loading />
          Validating token...
        </v-col>
      </v-row>
    </template>

    <v-footer
      color="background"
      padless
      :class="{
        'mb-10': $vuetify.breakpoint.smAndDown,
        'ma-0': $vuetify.breakpoint.mdAndUp,
      }"
    >
      <v-col cols="12" class="d-flex justify-center align-center">
        {{ new Date().getFullYear() }} — <strong>Ballow</strong>
        <v-btn icon>
          <v-icon color="blue">mdi-facebook</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="blue lighten-2">mdi-twitter</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="pink">mdi-instagram</v-icon>
        </v-btn>
      </v-col>
    </v-footer>
    <v-bottom-navigation app class="hidden-md-and-up mr-3"
      ><v-btn icon :to="{ path: '/feed' }">
        <v-icon>mdi-newspaper</v-icon>
      </v-btn>

      <v-btn icon :to="{ path: '/categories' }">
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>
      <v-btn text v-if="loggedUser" to="/write">
        <v-icon left>mdi-pencil</v-icon></v-btn
      >
      <v-btn text v-if="loggedUser" @click="exit">
        <v-icon left>mdi-exit-run</v-icon></v-btn
      ></v-bottom-navigation
    >
  </v-app>
</template>

<script>
import { storageName } from "@/global.js";
import { api } from "@/api.js";
import { mapState, mapMutations } from "vuex";
import loading from "@/components/pageLoading.vue";

export default {
  components: {
    loading,
  },
  data: () => ({
    validatingToken: true,
  }),
  methods: {
    ...mapMutations(["loadLogged"]),
    async validateToken() {
      this.validatingToken = true;
      const json = localStorage.getItem(storageName);
      const userData = JSON.parse(json);
      this.loadLogged(null);

      if (!storageName) {
        this.validatingToken = false;
        this.$router.push("/login");
        return;
      }
      const res = await api.post("validateToken", userData);

      if (res.data) {
        this.loadLogged(userData);
      } else {
        localStorage.removeItem(storageName);
        this.$router.push("/");
      }
      this.validatingToken = false;
    },
    darkmode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("themeState", this.$vuetify.theme.dark.toString());
      
    },
    exit() {
      localStorage.removeItem(storageName);
      this.loadLogged(null);
    },
  },
  computed: {
    ...mapState(["loggedUser"]),
  },
  created() {
    this.validateToken();
   
  },
  mounted(){
     const themeState = localStorage.getItem("themeState");
    console.log(themeState)
    if (themeState) {
      if (themeState == "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }
  },
  
};
</script>
<style>
#ballon {
  text-decoration: none;
}
</style>
