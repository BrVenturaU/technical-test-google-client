import axios from 'axios'
import { localStorageManager } from '../utils/LocalStorageManager';

class UserService{
    #userClient;
    #sessionTokenKeyName;
    constructor(){
        this.path = '/user';
        this.#sessionTokenKeyName = 'session_token';
        this.#userClient = this.#configureAxios();
        this.#setRequestInterceptors();
    }

    #configureAxios(){
        return axios.create({
            baseURL: process.env.VUE_APP_API_URL
        });
    }

    // eslint-disable-next-line no-dupe-class-members
    #setRequestInterceptors(){
        this.#userClient.interceptors.request.use((request) => {
            request.headers['Authorization'] = `Bearer ${localStorageManager.getFromLocalStorage(`${this.#sessionTokenKeyName}`)}`;
            return request;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    profile(){
        return this.#userClient.get(`${this.path}/profile`);
    }

    update(payload){
        return this.#userClient.put(`${this.path}/profile`, payload);
    }
}

export const userService = new UserService();
export default{
    UserService
}