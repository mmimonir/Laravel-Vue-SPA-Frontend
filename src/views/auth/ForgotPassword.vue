<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Forgot Password Form</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form ref="forgotPasswordForm">
                <v-text-field label="Email" name="email" type="email" v-model="email" />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="sendForgotPassword">Send Email</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn color="pink" text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    <router-link :to="{ name: 'login' }">Login</router-link>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      snackbar: {
        text: "",
        show: false
      }
    };
  },
  methods: {
    ...mapActions({
      forgotPassword: "user/forgotPassword"
    }),
    sendForgotPassword() {
      if (this.$refs.forgotPasswordForm.validate()) {
        this.forgotPassword({ email: this.email })
          .then(() => {
            this.snackbar = {
              text: "Email Sent!",
              show: true
            };
          })
          .catch(() => {
            this.snackbar = {
              text: "Failed to send email",
              show: false
            };
          });
      }
    }
  }
};
</script>
