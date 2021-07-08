<template>
  <div class="mt-5">
    <GoogleMap msg="Bienvenido"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMap from '@/components/GoogleMap.vue'

export default {
  name: 'Home',
  components: {
    GoogleMap
  }
}
</script>
