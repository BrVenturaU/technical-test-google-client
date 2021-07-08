import axios from 'axios';
import { localStorageManager } from '../utils/LocalStorageManager';

class LocationService{
    #locationClient;
    #sessionTokenKeyName;
    constructor(){
        this.path = '/location';
        this.#sessionTokenKeyName = 'session_token';
        this.#locationClient = this.#configureAxios();
        this.#setRequestInterceptors();
    }

    #configureAxios(){
        return axios.create({
            baseURL: process.env.VUE_APP_API_URL
        });
    }

    // eslint-disable-next-line no-dupe-class-members
    #setRequestInterceptors(){
        this.#locationClient.interceptors.request.use((request) => {
            request.headers['Authorization'] = `Bearer ${localStorageManager.getFromLocalStorage(`${this.#sessionTokenKeyName}`)}`;
            return request;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    async getLocationByIp(){
        const myIpResponse = await this.#getMyIp();
        const ip = myIpResponse.data.ip;
        return this.#locationClient.get(`${this.path}/${ip}`);
    }

    // eslint-disable-next-line no-dupe-class-members
    #getMyIp(){
        return axios.get("https://api.ipify.org/?format=json");
    }

    getGeolocation(){
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(position => {
                    const location = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                    resolve(location)
                }, error => reject(error));
            } else {
                return reject('La geolocalización no esta soportada en tu navegador.');
            }
        });
    }
}

export const locationService = new LocationService();
export default{
    LocationService
}