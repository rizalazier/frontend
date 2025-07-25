<template>
  <div id="app">
    <router-view @login-success="onLoginSuccess" />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    onLoginSuccess(token) {
      // Store JWT in localStorage
      localStorage.setItem('jwt', token);
      // Redirect to dashboard
      this.$router.push('/dashboard');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
