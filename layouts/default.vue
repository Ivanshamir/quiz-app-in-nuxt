<template>
  <v-app>
    <notifications group="notify" />
    <v-main>
        <v-toolbar color="indigo" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <n-link to="/">
            <v-toolbar-title>Home</v-toolbar-title>
          </n-link>

          <v-spacer></v-spacer>

          <v-btn text >
            <n-link to="/weather-app">Weather App</n-link>
          </v-btn>
          <v-btn text >
            <n-link to="/quiz">Quiz App</n-link>
          </v-btn>
          <v-btn text v-if="$auth()" @click="logout">Logout</v-btn>
        </v-toolbar>
        <transition>
          <nuxt />
        </transition>
    
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods:{
    logout(){
      this.$cookies.remove('token');
      this.$store.commit('auth/setLoggedIn', false);
      this.$router.push('/admin/login');
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
  color: white !important;
}
</style>
