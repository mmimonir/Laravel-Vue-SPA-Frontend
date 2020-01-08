<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Larave - VUE</h1>
      </div>

      <v-spacer></v-spacer>
      <v-btn small @click="logout" v-if="loggedIn">Logout</v-btn>
      <v-btn href="#" text>
        <span class="mr-2">Issue Tracker</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    loggedIn: false
  }),
  created() {
    if (localStorage.getItem("token")) {
      this.loggedIn = true;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    }
  }
};
</script>
