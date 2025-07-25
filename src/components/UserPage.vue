<template>
  <div class="user-page">
    <h2>User Management</h2>
    <div v-if="loading">Loading users...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <button @click="showCreateForm = true">Create New User</button>
      <div v-if="showCreateForm" class="modal">
        <h3>Create User</h3>
        <form @submit.prevent="createUser">
          <input v-model="form.name" placeholder="Name" required />
          <input v-model="form.email" placeholder="Email" required type="email" />
          <input v-model="form.password" placeholder="Password" required type="password" />
          <button type="submit">Create</button>
          <button type="button" @click="resetForm">Cancel</button>
        </form>
      </div>
      <ul class="user-list">
        <li v-for="user in users" :key="user._id">
          <span>{{ user.name }} ({{ user.email }})</span>
          <button @click="editUser(user)">Edit</button>
        </li>
      </ul>
      <div v-if="showEditForm" class="modal">
        <h3>Edit User</h3>
        <form @submit.prevent="updateUser">
          <input v-model="form.name" placeholder="Name" required />
          <input v-model="form.email" placeholder="Email" required type="email" />
          <input v-model="form.password" placeholder="New Password (leave blank to keep)" type="password" />
          <button type="submit">Update</button>
          <button type="button" @click="resetForm">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserPage',
  data() {
    return {
      users: [],
      loading: true,
      error: '',
      showCreateForm: false,
      showEditForm: false,
      form: {
        _id: '',
        name: '',
        email: '',
        password: '',
      },
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = '';
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.users = response.data;
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch users.';
      } finally {
        this.loading = false;
      }
    },
    async createUser() {
      try {
        const token = localStorage.getItem('jwt');
        await axios.post('/api/users', {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.resetForm();
        this.fetchUsers();
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to create user.';
      }
    },
    editUser(user) {
      this.form = { ...user, password: '' };
      this.showEditForm = true;
      this.showCreateForm = false;
    },
    async updateUser() {
      try {
        const token = localStorage.getItem('jwt');
        const updateData = {
          name: this.form.name,
          email: this.form.email,
        };
        if (this.form.password) updateData.password = this.form.password;
        await axios.put(`/api/users/${this.form._id}`, updateData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.resetForm();
        this.fetchUsers();
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to update user.';
      }
    },
    resetForm() {
      this.form = { _id: '', name: '', email: '', password: '' };
      this.showCreateForm = false;
      this.showEditForm = false;
    },
  },
};
</script>

<style scoped>
.user-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}
.user-list {
  list-style: none;
  padding: 0;
}
.user-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
.modal {
  background: #f9f9f9;
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 6px;
}
.error {
  color: #d00;
  margin-bottom: 1rem;
}
</style> 