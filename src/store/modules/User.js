import router from '@/router';
import {authService} from '../../services/AuthService';
import { getError } from '../../utils/ErrorHandlerManager';

const namespaced = true;

const state = {
    user: null,
    loading: false,
    error: null,
};


const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
};

const actions = {
    async login({ commit }, user) {
        try {
            commit('SET_LOADING', true);
            const data = { email: user.email, password: user.password };
            const response = await authService.login(data);
            const responseBody = response.data.body;
            
            authService.setToLocalStorage("token", responseBody.token);
            commit("SET_ERROR", null);
            commit('SET_LOADING', false);
            // commit("SET_USER", {name:responseBody.name, email: responseBody.email});
            // AuthServiceInstance.setToLocalStorage('user', JSON.stringify({name:responseBody.name, email: responseBody.email}));
            alert("Ha iniciado sesión correctamente");
            router.push("/");
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
    async logout({commit}){
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
        //const user = JSON.parse(AuthServiceInstance.getFromLocalStorage('user'));
        return null;
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