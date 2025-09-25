export const AccessApi = {
    logIn(id: number){
        localStorage.setItem('token', id.toString());
        window.location.reload();
    },
    logOut(){
        localStorage.removeItem('token')
        window.location.reload();
    }
}