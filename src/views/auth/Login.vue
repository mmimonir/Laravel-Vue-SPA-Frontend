<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form ref="loginForm">
                <v-text-field label="Email" name="email" type="email" v-model="user.email" />
                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  v-model="user.password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="loginUser">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <router-link :to="{ name: 'register' }">Register</router-link>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions({
      login: "user/loginUser"
    }),
    loginUser() {
      if (this.$refs.loginForm.validate()) {
        this.login(this.user)
          .then(() => {
            this.$router.push({ name: "dashboard" });
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  }
};
</script>
