// import {currentRouter, reloadRouter} from "../main.ts";

export const AccessApi = {
    logIn(){
        window.location.reload();
        localStorage.setItem('token', 'asd')
        console.log(localStorage)
    },
    logOut(){
        window.location.reload();
        localStorage.removeItem('token')
        console.log(localStorage)
    }
}