export const AccessApi = {
    logIn(){
        localStorage.setItem('token', 'asd')
        window.location.reload();
    },
    logOut(){
        localStorage.removeItem('token')
        window.location.reload();
    }
}