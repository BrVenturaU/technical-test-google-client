import router from '@/router';
import {authService} from '../../services/AuthService';
import { userService } from '../../services/UserService';
import { getError } from '../../utils/ErrorHandlerManager';
import { localStorageManager } from '../../utils/LocalStorageManager';

const namespaced = true;

const state = {
    user: null,
    loading: false,
    errors: null,
    errorMessage: null
};


const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    },
    SET_ERROR(state, error) {
        state.errorMessage = error?.message;
        state.errors = error?.errors;
    },
};

const actions = {
    async login({ commit, dispatch, state }, user) {
        try {
            commit('SET_LOADING', true);
            const response = await authService.login(user);
            const responseBody = response.data.body;
            
            localStorageManager.setToLocalStorage("session_token", responseBody.token);
            commit("SET_ERROR", null);
            commit('SET_LOADING', false);
            await dispatch('getProfile');
            localStorageManager.setToLocalStorage("user", JSON.stringify(state.user));
            alert("Ha iniciado sesión correctamente");
            router.push({name: 'Dashboard'});
        } catch (error) {
            commit("SET_ERROR", getError(error));
            commit('SET_LOADING', false);
        }
    },
    async register({ commit }, user) {
        try {
            commit('SET_LOADING', true);
            const data = {
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
                password: user.password,
                passwordConfirmation: user.passwordConfirmation,
            };
            const response = await authService.register(data);
            commit("SET_ERROR", null);
            commit('SET_LOADING', false);
            alert(response.data.message);
            router.push("/login");
        } catch (error) {
            commit("SET_ERROR", getError(error));
            commit('SET_LOADING', false);
        }
    },
    async getProfile({commit}){
        try {
            const response = await userService.profile();
            const responseBody = response.data.body;
            commit("SET_USER", responseBody);
        } catch (error) {
            commit("SET_ERROR", error);
        }
    },
    async update({commit}, user){
        try {
            commit('SET_LOADING', true);
            const response = await userService.update(user);
            const responseBody = response.data.body;
            localStorageManager.setToLocalStorage("user", JSON.stringify(responseBody));
            commit("SET_USER", responseBody);
            commit("SET_ERROR", null);
            commit('SET_LOADING', false);
            alert(response.data.message);
        } catch (error) {
            commit("SET_ERROR", getError(error));
            commit('SET_LOADING', false);
        }
    },
    logout({commit}){
        try {
            
            authService.logout();
            alert("Sesión finalizada con éxito.");
            commit("SET_ERROR", null);
            commit("SET_USER", null);
            router.push("/login");

        } catch (error) {
            commit("SET_ERROR", getError(error));
        }
    }
};

const getters = {
    authUser: () => {
        const user = JSON.parse(localStorageManager.getFromLocalStorage('user'));
        return user;
    },
    error: (state) => {
        return state.error;
    },
    loading: (state) => {
        return state.loading;
    },
    loggedIn: (state) => {
        return !!state.user;
    },
    guest: () => {
        // const storageItem = AuthServiceInstance.getFromLocalStorage("guest");
        // if (!storageItem) return false;
        // if (storageItem === "isGuest") return true;
        // if (storageItem === "isNotGuest") return false;
    },
};

export default {
    namespaced,
    state,
    mutations,
    actions,
    getters
}