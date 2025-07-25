<template>
  <div class="user-page container mt-4">
    <h2 class="mb-4">User Management</h2>
    <div v-if="loading">Loading users...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else>
      <button @click="showCreateForm = true" class="btn btn-primary mb-3">Create New User</button>
      <div v-if="showCreateForm" class="card p-3 mb-3">
        <h5>Create User</h5>
        <form @submit.prevent="createUser">
          <div class="form-group">
            <input v-model="form.name" placeholder="Name" required class="form-control mb-2" />
            <input v-model="form.username" placeholder="Username" required class="form-control mb-2" />
            <input v-model="form.email" placeholder="Email" required type="email" class="form-control mb-2" />
            <input v-model="form.password" placeholder="Password" required type="password" class="form-control mb-2" />
          </div>
          <button type="submit" class="btn btn-success mr-2">Create</button>
          <button type="button" @click="resetForm" class="btn btn-secondary">Cancel</button>
        </form>
      </div>
      <ul class="user-list list-group mb-3">
        <li v-for="user in users" :key="user._id" class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ user.name }} ({{ user.email }})</span>
          <button @click="editUser(user)" class="btn btn-sm btn-info">Edit</button>
        </li>
      </ul>
      <div v-if="showEditForm" class="card p-3 mb-3">
        <h5>Edit User</h5>
        <form @submit.prevent="updateUser">
          <div class="form-group">
            <input v-model="form.name" placeholder="Name" required class="form-control mb-2" />
            <input v-model="form.username" placeholder="Username" required class="form-control mb-2" />
            <input v-model="form.email" placeholder="Email" required type="email" class="form-control mb-2" />
            <input v-model="form.password" placeholder="New Password (leave blank to keep)" type="password" class="form-control mb-2" />
          </div>
          <button type="submit" class="btn btn-success mr-2">Update</button>
          <button type="button" @click="resetForm" class="btn btn-secondary">Cancel</button>
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
        username: '',
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
        const response = await axios.get('http://localhost:3000/api/users', {
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
        await axios.post('http://localhost:3000/api/users', {
          name: this.form.name,
          username: this.form.username,
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
      if (!this.form.username) this.form.username = '';
      this.showEditForm = true;
      this.showCreateForm = false;
    },
    async updateUser() {
      try {
        const token = localStorage.getItem('jwt');
        const updateData = {
          name: this.form.name,
          username: this.form.username,
          email: this.form.email,
        };
        if (this.form.password) updateData.password = this.form.password;
        await axios.put(`http://localhost:3000/api/users/${this.form._id}`, updateData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.resetForm();
        this.fetchUsers();
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to update user.';
      }
    },
    resetForm() {
      this.form = { _id: '', name: '', username: '', email: '', password: '' };
      this.showCreateForm = false;
      this.showEditForm = false;
    },
  },
};
</script>

<style scoped>
.user-page {
  max-width: 600px;
}
</style> 