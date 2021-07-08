import { locationService } from "../../services/LocationService";
import { getError } from "../../utils/ErrorHandlerManager";

const namespaced = true;

const state = {
    geolocation: null,
    ipLocation: null,
    loading: false,
    errors: null,
    errorMessage: null,
    locationMessage: null
}

const mutations = {
    SET_GEOLOCATION(state, payload){
        state.geolocation = payload;
    },
    SET_IPLOCATION(state, payload){
        state.ipLocation = payload;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    },
    SET_ERROR(state, error) {
        state.errorMessage = error?.message;
        state.errors = error?.errors;
    },
    SET_LOCATIONMESSAGE(state, message){
        state.locationMessage = message;
    }
}

const actions = {
    async getUserGeolocation({commit, dispatch}){
        try {
            commit('SET_LOADING', true);
            const geolocation = await locationService.getGeolocation();
            console.log(geolocation);
            commit('SET_GEOLOCATION', geolocation)
            commit('SET_ERROR', null);
            commit('SET_LOADING', false);
        } catch (error) {
            commit('SET_ERROR', {message:"Error al obtener la geolocalización local."});
            commit('SET_LOCATIONMESSAGE', "Obteniendo localización remota.");
            getError(error);
            dispatch('getUserIpLocation');
        }
    },
    async getUserIpLocation({commit}){
        try {
            const response = await locationService.getLocationByIp();
            const responseBody = response.data.body;
            console
            commit('SET_IPLOCATION', responseBody);
            commit('SET_ERROR', null);
            commit('SET_LOADING', false);
            commit('SET_LOCATIONMESSAGE', null);
        } catch (error) {
            commit('SET_ERROR', getError(error));
            commit('SET_LOCATIONMESSAGE', null);
            commit('SET_LOADING', false);
        }
    }
}

const getters = {
    userLocation: (state) => {
        const {geolocation, ipLocation} = {geolocation: state.geolocation, ipLocation: state.ipLocation};
        return geolocation ?? ipLocation;
    }
}

export default {
    namespaced,
    state,
    mutations,
    actions,
    getters
}