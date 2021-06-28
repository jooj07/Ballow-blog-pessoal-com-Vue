<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="text-h3"> Login or sign-up </v-card-title>
        <v-form
          class="d-flex flex-column ml-2 mr-4"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            prepend-icon="mdi-at"
            outlined
            dense
            label="email"
            :rules="emailRules"
            v-model="loginForm.email"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-account-cowboy-hat"
            v-if="hasAcct === false"
            outlined
            dense
            label="name"
            :rules="nameRules"
            v-model="name"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-key-outline"
            :append-icon="showPassord ? 'mdi-eye-off' : 'mdi-eye'"
            outlined
            dense
            :type="showPassord ? 'text' : 'password'"
            label="password"
            v-model="loginForm.password"
            :rules="passwordRules"
            @click:append="() => (showPassord = !showPassord)"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-key-chain"
            :append-icon="showPassord ? 'mdi-eye-off' : 'mdi-eye'"
            v-if="hasAcct === false"
            outlined
            dense
            :type="showPassord ? 'text' : 'password'"
            label="confirm password"
            v-model="confirmPassword"
            :rules="passwordconfirmRules"
            @click:append="() => (showPassord = !showPassord)"
          ></v-text-field>
          <a v-if="hasAcct === true" @click="hasAcct = false"
            >Or create an account here!</a
          >
          <a v-if="hasAcct === false" @click="hasAcct = true">Back to login</a>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="hasAcct === true"
            color="primary"
            outlined
            @click="signin"
            :disabled="!valid"
          >
            ok
          </v-btn>
          <v-btn
            v-if="hasAcct === false"
            color="primary"
            outlined
            @click="signup"
            :disabled="!valid"
          >
            create
          </v-btn>
          <v-btn color="error" outlined @click="dialog = false" to="/">
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      nameRules: [
        (v) => v.length >= 5 || "Name must be less than 5 characters",
      ],
      emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      passwordRules: [
        (v) => v.length >= 5 || "password must be less than 5 characters",
      ],
      passwordconfirmRules: [
        (v) => v === this.loginForm.password || "passwords must match",
      ],
      showPassord: false,
      name: '',
      confirmPassword: '',
      loginForm: {
        email: '',
        password: '',
      },
      dialog: true,
      hasAcct: true,
    };
  },
  computed: {
    ...mapState(["loggedUser"]),
  },
  methods: {
    ...mapActions(["login", "create"]),
    signin() {
      this.login(this.loginForm);
      this.$router.push("/feed");
    },
    signup() {
      let toAssing = { name: this.name, confirmPassword: this.confirmPassword };
      let signupForm = Object.assign(this.loginForm, toAssing);
      this.create(signupForm);
      this.$router.push("/feed");
    },
  },
};
</script>

<style></style>
