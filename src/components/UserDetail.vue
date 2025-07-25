<template>
  <div class="user-detail">
    <h2>User Detail</h2>
    <div v-if="loading">Loading user...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <form @submit.prevent="updateUser">
        <div>
          <label>Name:</label>
          <input v-model="form.name" required />
        </div>
        <div>
          <label>Email:</label>
          <input v-model="form.email" required type="email" />
        </div>
        <div>
          <label>New Password:</label>
          <input v-model="form.password" placeholder="Leave blank to keep current" type="password" />
        </div>
        <button type="submit">Update User</button>
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
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}
.user-detail label {
  display: block;
  margin-bottom: 0.25rem;
}
.user-detail input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
}
.error {
  color: #d00;
  margin-bottom: 1rem;
}
</style> 