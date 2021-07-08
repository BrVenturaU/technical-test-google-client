import { locationService } from "../../services/LocationService";
import { getError } from "../../utils/ErrorHandlerManager";

const namespaced = true;

const state = {
    location: null,
    loading: false,
    errors: null,
    errorMessage: null
}

const mutations = {
    SET_LOCATION(state, payload){
        state.location = payload;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    },
    SET_ERROR(state, error) {
        state.errorMessage = error?.message;
        state.errors = error?.errors;
    },
}

const actions = {
    async getUserGeolocation({commit}){
        try {
            commit('SET_LOADING', true);
            const location = await locationService.getGeolocation();
            console.log(location);
            commit('SET_LOCATION', location)
            commit('SET_ERROR', null);
            commit('SET_LOADING', false);
        } catch (error) {
            commit('SET_ERROR', {message:"Error al obtener la geolocalización."});
            getError(error);
            commit('SET_LOADING', false);
        }
    }
}

const getters = {
    userGeolocation: (state) => {
        return state.location;
    }
}

export default {
    namespaced,
    state,
    mutations,
    actions,
    getters
}