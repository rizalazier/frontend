<template>
  <form @submit.prevent="handleSubmit" class="login-form card p-4 shadow-sm mx-auto" style="max-width: 350px;">
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required placeholder="Enter your email" class="form-control" />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required placeholder="Enter your password" class="form-control" />
    </div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <button type="submit" :disabled="loading" class="btn btn-success btn-block">
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      this.error = '';
      this.loading = true;
      try {
        const response = await axios.post('/api/login', {
          email: this.email,
          password: this.password,
        });
        const data = response.data;
        if (data.token) {
          // Store JWT in localStorage
          localStorage.setItem('jwt', data.token);
          // Emit token to parent
          this.$emit('login-success', data.token);
        } else {
          this.error = 'No token received.';
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message;
        } else {
          this.error = 'Network error. Please try again.';
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  margin: 2rem auto;
  background: #fff;
}
</style> 