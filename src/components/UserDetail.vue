<template>
  <div class="user-detail card p-4 shadow-sm mx-auto" style="max-width: 400px;">
    <h2 class="mb-4">User Detail</h2>
    <div v-if="loading">Loading user...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label>Name:</label>
          <input v-model="form.name" required class="form-control" />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input v-model="form.email" required type="email" class="form-control" />
        </div>
        <div class="form-group">
          <label>New Password:</label>
          <input v-model="form.password" placeholder="Leave blank to keep current" type="password" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success btn-block">Update User</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserDetail',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      loading: true,
      error: '',
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      this.loading = true;
      this.error = '';
      try {
        const token = localStorage.getItem('jwt');
        const userId = this.$route.params.id;
        const response = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.form.name = response.data.name;
        this.form.email = response.data.email;
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch user.';
      } finally {
        this.loading = false;
      }
    },
    async updateUser() {
      try {
        const token = localStorage.getItem('jwt');
        const userId = this.$route.params.id;
        const updateData = {
          name: this.form.name,
          email: this.form.email,
        };
        if (this.form.password) updateData.password = this.form.password;
        await axios.put(`/api/users/${userId}`, updateData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('User updated successfully!');
        this.form.password = '';
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to update user.';
      }
    },
  },
};
</script>

<style scoped>
.user-detail {
  margin: 2rem auto;
  background: #fff;
}
</style> 