
class LocalStorageManager{
    constructor(){

    }

    setToLocalStorage(key, value){
        localStorage.setItem(key, value);
    }

    getFromLocalStorage(key){
        return localStorage.getItem(key);
    }

    removeFromLocalStorage(key){
        localStorage.removeItem(key);
    }

    clearLocalStorage(){
        localStorage.clear();
    }
}

export const localStorageManager = Object.freeze(new LocalStorageManager());
export default{
    LocalStorageManager
}