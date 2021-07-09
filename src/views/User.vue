<template>
  <div>
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Sections/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  created(){
      document.body.classList.remove('register-bg-image');
      document.body.classList.remove('login-bg-image');
  }
}
</script>
