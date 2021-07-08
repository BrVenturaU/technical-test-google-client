<template>
  <div class="hello">
        <h1>{{ msg }}: {{authUser.fullName}}</h1>
        <h2 v-if="userLocation">Geo: {{userLocation.latitude}}, {{userLocation.longitude}}</h2>
        <div class="map" v-if="userLocation">
            <mapbox-map
                style="height: 400px"
                :access-token="access_token"
                map-style="mapbox://styles/mapbox/streets-v11"
                :center="[userLocation.longitude, userLocation.latitude]"
                :zoom="1">
                <mapbox-marker :lng-lat="[userLocation.longitude, userLocation.latitude]" />
            </mapbox-map>
        </div>
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
import { mapActions, mapGetters, mapState } from 'vuex';
export default {
    name: 'GoogleMap',
    props: {
        msg: String
    },
    created(){
        this.access_token = process.env.VUE_APP_MAP_KEY;
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
