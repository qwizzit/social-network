import {PublicRouter} from "../Routes/PublicRouter.ts";
import {MainRouter} from "../Routes/MainRouter.ts";

export function getUsers() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
}
export function debounce<T extends CallableFunction>(delay: number, fn: T){
    let timer : number;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(), delay);
    }
}
export async function setupRouter() {
    return localStorage.getItem('token') === null ? PublicRouter : MainRouter;
}
