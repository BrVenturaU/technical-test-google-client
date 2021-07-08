<template>
  <div class="hello">
        <h1>{{ msg }}: {{authUser.fullName}}</h1>
        <h2>Geo: {{userGeolocation.latitude}}, {{userGeolocation.longitude}}</h2>
        <div class="text-center mt-4" v-if="loading">
            <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
        <!-- <div class="text-center mt-4" v-if="errorMessage">
            <strong class="text-danger">{{errorMessage}}</strong>
        </div> -->
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    name: 'GoogleMap',
    props: {
        msg: String
    },
    mounted(){
        this.getUserGeolocation();
    },
    computed:{
        ...mapState('location', ['loading', 'erorrMessage']),
        ...mapGetters('user', ['authUser']),
        ...mapGetters('location', ['userGeolocation'])
    },
    methods:{
        ...mapActions('location', ['getUserGeolocation'])
    }
}
</script>

<style scoped>

</style>
