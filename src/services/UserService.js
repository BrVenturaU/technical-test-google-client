import { apiClient } from '../utils/BaseApiClient';
import { localStorageManager } from '../utils/LocalStorageManager';

class UserService{
    #sessionTokenKeyName;
    constructor(){
        this.path = '/user';
        this.#sessionTokenKeyName = 'session_token';
        this.#setRequestInterceptors();
    }
    // eslint-disable-next-line no-dupe-class-members
    #setRequestInterceptors(){
        apiClient.interceptors.request.use((request) => {
            request.headers['Authorization'] = `Bearer ${localStorageManager.getFromLocalStorage(`${this.#sessionTokenKeyName}`)}`;
            return request;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    profile(){
        return apiClient.get(`${this.path}/profile`);
    }

    update(payload){
        return apiClient.put(`${this.path}/profile`, payload);
    }
}

export const userService = new UserService();
export default{
    UserService
}