<template>
  <div>
    <b-modal id="modal" v-model="show"  size="md" title="¿Sigues ahí?" button-size="sm" ok-only>
      <div class="d-block text-center">
        <p>Has dejado tu sesión abierta.</p>
        <p>Tienes {{seconds}} segundos para regresar, de lo contrario se cerrará automaticamente.</p>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  created(){
    const vm = this;
    if(vm.authUser){
      let timerId = setInterval(() => {
      vm.time -= 1000;
      if (!vm.$store.state.idleVue.isIdle) clearInterval(timerId);
      if (vm.time < 1) {
        clearInterval(timerId);
        vm.logout();
      }
    }, 1000);
    }
  },
  data() {
    return {
      show: true,
      time: 10000
    }
  },
  computed:{
    ...mapGetters('user', ['authUser']),
      seconds(){
        return this.time/1000;
      }
  },
  methods: {
    ...mapActions('user', ['logout'])
  }
}
</script>
<style lang="postcss" scoped>

</style>