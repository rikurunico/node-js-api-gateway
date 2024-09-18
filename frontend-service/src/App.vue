<template>
    <router-view />
</template>


<script>
export default {
  name: 'App',
  mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/login');  // Arahkan ke login jika token tidak ada
    } else {
      this.$router.push('/items');  // Arahkan ke items jika ada token
    }
  }
}
</script>
