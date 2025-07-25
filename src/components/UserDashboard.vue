<template>
  <AppLayout>
    <div>
      <h5 class="mb-3">User List</h5>
      <div v-if="loading" class="text-center my-4">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-if="alert.message" :class="['alert', alert.type, 'alert-dismissible', 'fade', 'show']" role="alert">
        {{ alert.message }}
        <button type="button" class="close" @click="alert.message = ''">
          <span>&times;</span>
        </button>
      </div>
      <table v-if="!loading" class="table table-bordered">
        <thead class="thead-light">
          <tr>
            <th style="width: 50px;">#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th style="width: 140px;">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, idx) in users" :key="user._id">
            <td>{{ idx + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>Active</td>
            <td>
              <button class="btn btn-sm btn-info mr-2" @click="goToUpdate(user._id)">update</button>
              <button class="btn btn-sm btn-danger" :disabled="deletingId === user._id" @click="deleteUser(user._id)">
                <span v-if="deletingId === user._id" class="spinner-border spinner-border-sm mr-1"></span>
                delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from './AppLayout.vue';
import axios from 'axios';

export default {
  name: 'UserDashboard',
  components: { AppLayout },
  data() {
    return {
      users: [],
      loading: true,
      error: '',
      deletingId: '',
      alert: {
        message: '',
        type: 'alert-success',
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.users = response.data;
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch users.';
      } finally {
        this.loading = false;
      }
    },
    goToUpdate(id) {
      this.$router.push(`/users/${id}`);
    },
    async deleteUser(id) {
      if (!confirm('Are you sure you want to delete this user?')) return;
      this.deletingId = id;
      try {
        const token = localStorage.getItem('jwt');
        await axios.delete(`http://localhost:3000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.alert = { message: 'User deleted successfully.', type: 'alert-success' };
        this.fetchUsers();
      } catch (err) {
        this.alert = { message: err.response?.data?.message || 'Failed to delete user.', type: 'alert-danger' };
      } finally {
        this.deletingId = '';
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