import { apiClient } from '../utils/BaseApiClient';
import { localStorageManager } from '../utils/LocalStorageManager';

class AuthService{
    #sessionTokenKeyName;
    constructor(){
        this.path = '/authentication';
        this.#sessionTokenKeyName = 'session_token';
        this.#setRequestInterceptors();
    }


    // eslint-disable-next-line no-dupe-class-members
    #setRequestInterceptors(){
        apiClient.interceptors.request.use((request) => {
            if(request.url.includes('login') || request.url.includes('register'))
                return request;
            request.headers['Authorization'] = `Bearer ${localStorageManager.getFromLocalStorage(`${this.#sessionTokenKeyName}`)}`;
            return request;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    login(payload){
        return apiClient.post(`${this.path}/login`, payload);
    }

    register(payload){
        return apiClient.post(`${this.path}/register`, payload);
    }

    refreshToken(){
        return apiClient.get(`${this.path}/refresh`);
    }

    logout(){
        localStorageManager.clearLocalStorage();
    }
}

export const authService = new AuthService();
export default{
    AuthService
}