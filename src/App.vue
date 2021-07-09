<template>
  <div id="app">
    <div v-if="isIdle && loggedIn">
      <ModalIdle />
    </div>
    <router-view/>
  </div>
</template>
<script>
import ModalIdle from '@/components/Sections/ModalIdle.vue'
import { mapGetters } from 'vuex';
export default {
  components:{
    ModalIdle
  },
  computed: {
    ...mapGetters('user', ['loggedIn']),
    isIdle() {
			return this.$store.state.idleVue.isIdle;
		}
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&family=Raleway:wght@100;300&display=swap');
@import './assets/css/custom.css';
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
