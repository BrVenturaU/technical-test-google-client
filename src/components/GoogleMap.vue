<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12">
                <h1 class="text-dark">The only true map for: <small class="text-muted">{{authUser.fullName}}</small></h1>
                <h2 class="text-dark" v-if="userLocation && userLocation.city">{{userLocation.city}}</h2>
                <h3 class="text-dark" v-if="userLocation">Geo: {{userLocation.latitude}}, {{userLocation.longitude}}</h3>
                
                <div class="text-center mt-2" v-if="loading">
                    <b-spinner type="grow" label="Loading..."></b-spinner>
                </div>
                <div class="text-center" v-if="locationMessage">
                    <strong class="text-success">{{locationMessage}}</strong>
                </div>
                <div class="text-center" v-if="errorMessage">
                    <strong class="text-danger">{{errorMessage}}</strong>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-sm-8 col-md-6 mx-auto">
                <div class="map shadow" style=" border-radius: 10px;" v-if="userLocation">
                    <mapbox-map
                        style="height: 600px; border-radius: 10px;"
                        :access-token="access_token"
                        map-style="mapbox://styles/mapbox/streets-v11"
                        :center="[userLocation.longitude, userLocation.latitude]"
                        :zoom="16">
                        <mapbox-geolocate-control />
                        <mapbox-navigation-control position="bottom-right" />
                        <mapbox-popup :lng-lat="[userLocation.longitude, userLocation.latitude]">
                            <p>Hola: {{authUser.userName}}</p>
                        </mapbox-popup>
                        <mapbox-marker :lng-lat="[userLocation.longitude, userLocation.latitude]" />
                    </mapbox-map>
                </div>
            </div>
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
