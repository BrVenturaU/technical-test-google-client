<template>
  <div class="hello">
        <h1>{{ msg }}: {{authUser.fullName}}</h1>
        <h2 v-if="userLocation">Geo: {{userLocation.latitude}}, {{userLocation.longitude}}</h2>
        <div class="text-center mt-4" v-if="loading">
            <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
        <div class="text-center mt-4" v-if="locationMessage">
            <strong class="text-success">{{locationMessage}}</strong>
        </div>
        <div class="text-center mt-4" v-if="errorMessage">
            <strong class="text-danger">{{errorMessage}}</strong>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    name: 'GoogleMap',
    props: {
        msg: String
    },
    created(){
        document.body.classList.remove('register-bg-image');
        document.body.classList.remove('login-bg-image');
    },
    mounted(){
        this.getUserGeolocation();
    },
    computed:{
        ...mapState('location', ['loading', 'errorMessage', 'locationMessage']),
        ...mapGetters('user', ['authUser']),
        ...mapGetters('location', ['userLocation'])
    },
    methods:{
        ...mapActions('location', ['getUserGeolocation'])
    }
}
</script>

<style scoped>

</style>
