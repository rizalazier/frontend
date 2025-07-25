<template>
  <div class="app-layout container-fluid p-3" style="min-height: 100vh;">
    <div class="row border rounded">
      <!-- Sidebar -->
      <div class="col-2 border-right p-0 bg-light" style="min-height: 90vh;">
        <div class="p-3 border-bottom font-weight-bold" style="font-size: 1.2rem;">LOGO APP</div>
        <nav class="nav flex-column">
          <router-link to="/dashboard" class="nav-link" active-class="active">Dashboard</router-link>
          <router-link to="/users" class="nav-link" active-class="active">User Management</router-link>
        </nav>
      </div>
      <!-- Main Content -->
      <div class="col-10 p-0">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center border-bottom p-3">
          <div></div>
          <button class="btn btn-outline-dark btn-sm" @click="logout">Logout</button>
        </div>
        <div class="p-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.app-layout {
  background: #fafafa;
}
.nav-link.active {
  background: #e9ecef;
  font-weight: bold;
}
</style> 