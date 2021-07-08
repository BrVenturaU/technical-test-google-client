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
  }
}
</script>
