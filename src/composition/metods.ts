export const usersData = {
    getUsers:  () => {
        const users = localStorage.getItem("users");
        return users ? JSON.parse(users) : [];
    },
    getAlbums: () => {
        const albums = localStorage.getItem("albums");
        return albums ? JSON.parse(albums) : [];
    },
    getPhotos: () => {
        const photos = localStorage.getItem("photos");
        return photos ? JSON.parse(photos) : [];
    }
}

export function debounce(delay: number, fn: CallableFunction) {
    let timer : number;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(), delay);
    }
}
export function getRandomInt(min: number, max: number){
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
