<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required placeholder="Enter your password" />
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <button type="submit" :disabled="loading">{{ loading ? 'Logging in...' : 'Login' }}</button>
  </form>
</template>

<script>
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
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          this.error = data.message || 'Login failed.';
        } else if (data.token) {
          // Store JWT in localStorage
          localStorage.setItem('jwt', data.token);
          // Emit token to parent
          this.$emit('login-success', data.token);
        } else {
          this.error = 'No token received.';
        }
      } catch (err) {
        this.error = 'Network error. Please try again.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}
.login-form div {
  margin-bottom: 1rem;
}
.login-form label {
  display: block;
  margin-bottom: 0.5rem;
}
.login-form input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
.login-form .error {
  color: #d00;
  margin-bottom: 1rem;
}
.login-form button {
  width: 100%;
  padding: 0.75rem;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}
.login-form button:disabled {
  background: #aaa;
  cursor: not-allowed;
}
</style> 