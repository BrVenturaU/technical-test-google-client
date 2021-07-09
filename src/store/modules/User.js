import router from '@/router';
import jwtDecode from 'jwt-decode';
import {authService} from '../../services/AuthService';
import { userService } from '../../services/UserService';
import { getError } from '../../utils/ErrorHandlerManager';
import { localStorageManager } from '../../utils/LocalStorageManager';

const namespaced = true;

const state = {
    user: null,
    loading: false,
    errors: null,
    errorMessage: null,
    refreshTask: null
};


const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_REFRESH_TASK(state, taskId){
        state.refreshTask = taskId;
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
            dispatch('autoRefreshTask');
            const responseBody = response.data.body;
            localStorageManager.setToLocalStorage("session_token", responseBody.token);
            commit("SET_ERROR", null);
            commit('SET_LOADING', false);
            await dispatch('getProfile');
            localStorageManager.setToLocalStorage("user", JSON.stringify(state.user));
            alert("Ha iniciado sesión correctamente");
            router.push({name: 'Map'});
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
            router.push({name: 'Login'});
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
    async refreshToken({dispatch}){
        try {
            const response = await authService.refreshToken();
            const responseBody = response.data.body;
            localStorageManager.setToLocalStorage("session_token", responseBody.token);
            dispatch('autoRefreshTask');
        } catch (error) {
            getError(error);
        }
    },
    autoRefreshTask({commit, dispatch}){
        const sessionToken = localStorageManager.getFromLocalStorage("session_token");
        const {exp} = jwtDecode(sessionToken);
        const now = Date.now() / 1000;
        let timeToRefresh = exp - now;
        timeToRefresh -= process.env.VUE_APP_REFRESH_TOKEN;
        const taskId = setTimeout(() => dispatch('refreshToken'), timeToRefresh * 1000);
        commit('SET_REFRESH_TASK', taskId);
    }, 
    logout({commit, state}){
        try {
            
            localStorageManager.clearLocalStorage();
            clearInterval(state.refreshTask);
            alert("Sesión finalizada con éxito.");
            commit('SET_REFRESH_TASK', null);
            commit("SET_ERROR", null);
            commit("SET_USER", null);
            router.push({name: 'Login'});

        } catch (error) {
            commit("SET_ERROR", getError(error));
        }
    }
};

const getters = {
    authUser: (state) => {
        const user = JSON.parse(localStorageManager.getFromLocalStorage('user'));
        return user ?? state.user ?? null;
    },
    error: (state) => {
        return state.error;
    },
    loading: (state) => {
        return state.loading;
    },
    loggedIn: (state) => {
        const user = JSON.parse(localStorageManager.getFromLocalStorage('user'));
        return !!state.user || !!user;
    }
};

export default {
    namespaced,
    state,
    mutations,
    actions,
    getters
}