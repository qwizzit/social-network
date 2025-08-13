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
