import axios from 'axios'
import { localStorageManager } from '../utils/LocalStorageManager';

class AuthService{
    #authClient;
    #sessionTokenKeyName;
    constructor(){
        this.path = '/authentication';
        this.#sessionTokenKeyName = 'session_token';
        this.#authClient = this.#configureAxios();
        this.#setRequestInterceptors();
    }

    #configureAxios(){
        return axios.create({
            baseURL: process.env.VUE_APP_API_URL
        });
    }

    // eslint-disable-next-line no-dupe-class-members
    #setRequestInterceptors(){
        this.#authClient.interceptors.request.use((request) => {
            if(request.url.includes('login') || request.url.includes('register'))
                return request;
            request.headers['Authorization'] = `Bearer ${localStorageManager.getFromLocalStorage(`${this.#sessionTokenKeyName}`)}`;
            return request;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    login(payload){
        return this.#authClient.post(`${this.path}/login`, payload);
    }

    register(payload){
        return this.#authClient.post(`${this.path}/register`, payload);
    }

    refreshToken(){
        return this.#authClient.get(`${this.path}/refresh`);
    }

    logout(){
        localStorageManager.clearLocalStorage();
    }
}

export const authService = new AuthService();
export default{
    AuthService
}