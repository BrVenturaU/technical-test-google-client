[1mdiff --git a/src/services/AuthService.js b/src/services/AuthService.js[m
[1mindex 40be091..f390a96 100644[m
[1m--- a/src/services/AuthService.js[m
[1m+++ b/src/services/AuthService.js[m
[36m@@ -1,25 +1,18 @@[m
[31m-import axios from 'axios'[m
[32m+[m[32mimport { apiClient } from '../utils/BaseApiClient';[m
 import { localStorageManager } from '../utils/LocalStorageManager';[m
 [m
 class AuthService{[m
[31m-    #authClient;[m
     #sessionTokenKeyName;[m
     constructor(){[m
         this.path = '/authentication';[m
         this.#sessionTokenKeyName = 'session_token';[m
[31m-        this.#authClient = this.#configureAxios();[m
         this.#setRequestInterceptors();[m
     }[m
 [m
[31m-    #configureAxios(){[m
[31m-        return axios.create({[m
[31m-            baseURL: process.env.VUE_APP_API_URL[m
[31m-        });[m
[31m-    }[m
 [m
     // eslint-disable-next-line no-dupe-class-members[m
     #setRequestInterceptors(){[m
[31m-        this.#authClient.interceptors.request.use((request) => {[m
[32m+[m[32m        apiClient.interceptors.request.use((request) => {[m
             if(request.url.includes('login') || request.url.includes('register'))[m
                 return request;[m
             request.headers['Authorization'] = `Bearer ${localStorageManager.getFromLocalStorage(`${this.#sessionTokenKeyName}`)}`;[m
[36m@@ -30,15 +23,15 @@[m [mclass AuthService{[m
     }[m
 [m
     login(payload){[m
[31m-        return this.#authClient.post(`${this.path}/login`, payload);[m
[32m+[m[32m        return apiClient.post(`${this.path}/login`, payload);[m
     }[m
 [m
     register(payload){[m
[31m-        return this.#authClient.post(`${this.path}/register`, payload);[m
[32m+[m[32m        return apiClient.post(`${this.path}/register`, payload);[m
     }[m
 [m
     refreshToken(){[m
[31m-        return this.#authClient.get(`${this.path}/refresh`);[m
[32m+[m[32m        return apiClient.get(`${this.path}/refresh`);[m
     }[m
 [m
     logout(){[m
[1mdiff --git a/src/services/UserService.js b/src/services/UserService.js[m
[1mindex b735006..6c1e0dd 100644[m
[1m--- a/src/services/UserService.js[m
[1m+++ b/src/services/UserService.js[m
[36m@@ -1,25 +1,16 @@[m
[31m-import axios from 'axios'[m
[32m+[m[32mimport { apiClient } from '../utils/BaseApiClient';[m
 import { localStorageManager } from '../utils/LocalStorageManager';[m
 [m
 class UserService{[m
[31m-    #userClient;[m
     #sessionTokenKeyName;[m
     constructor(){[m
         this.path = '/user';[m
         this.#sessionTokenKeyName = 'session_token';[m
[31m-        this.#userClient = this.#configureAxios();[m
         this.#setRequestInterceptors();[m
     }[m
[31m-[m
[31m-    #configureAxios(){[m
[31m-        return axios.create({[m
[31m-            baseURL: process.env.VUE_APP_API_URL[m
[31m-        });[m
[31m-    }[m
[31m-[m
     // eslint-disable-next-line no-dupe-class-members[m
     #setRequestInterceptors(){[m
[31m-        this.#userClient.interceptors.request.use((request) => {[m
[32m+[m[32m        apiClient.interceptors.request.use((request) => {[m
             request.headers['Authorization'] = `Bearer ${localStorageManager.getFromLocalStorage(`${this.#sessionTokenKeyName}`)}`;[m
             return request;[m
         }, (error) => {[m
[36m@@ -28,11 +19,11 @@[m [mclass UserService{[m
     }[m
 [m
     profile(){[m
[31m-        return this.#userClient.get(`${this.path}/profile`);[m
[32m+[m[32m        return apiClient.get(`${this.path}/profile`);[m
     }[m
 [m
     update(payload){[m
[31m-        return this.#userClient.put(`${this.path}/profile`, payload);[m
[32m+[m[32m        return apiClient.put(`${this.path}/profile`, payload);[m
     }[m
 }[m
 [m
