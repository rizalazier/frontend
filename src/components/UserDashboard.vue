<template>
  <div class="dashboard card p-4 shadow-sm mx-auto" style="max-width: 400px;">
    <h2 class="mb-4">Dashboard</h2>
    <div v-if="loading">Loading user count...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
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
  margin: 2rem auto;
  background: #fff;
}
</style> 