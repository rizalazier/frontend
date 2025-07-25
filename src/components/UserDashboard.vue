<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <div v-if="loading">Loading user count...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <p>Total registered users: <strong>{{ userCount }}</strong></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserDashboard',
  data() {
    return {
      userCount: 0,
      loading: true,
      error: '',
    };
  },
  created() {
    this.fetchUserCount();
  },
  methods: {
    async fetchUserCount() {
      this.loading = true;
      this.error = '';
      try {
        // Adjust the endpoint as needed to match your Express API
        const token = localStorage.getItem('jwt');
        const response = await axios.get('/api/users/count', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.userCount = response.data.count;
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch user count.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}
.error {
  color: #d00;
}
</style> 