// export const usersData = {
//     getUsers:  () => {
//         const users = localStorage.getItem("users");
//         return users ? JSON.parse(users) as UserDto[] : [];
//     },
//     getAlbums: () => {
//         const albums = localStorage.getItem("albums");
//         return albums ? JSON.parse(albums) as AlbumDto[] : [];
//     },
//     getPhotos: () => {
//         const photos = localStorage.getItem("photos");
//         return photos ? JSON.parse(photos) as PhotoDto[] : [];
//     },
//     getPosts: () => {
//         const posts = localStorage.getItem("posts");
//         return posts ? JSON.parse(posts) as PostDto[] : [];
//     },
//     getUploadedPosts: () => {
//         const uploadedPosts = localStorage.getItem("uploadedPosts");
//         return uploadedPosts ? JSON.parse(uploadedPosts) as randomUserPost[] : [];
//     }
// }

export const isUser ={
    isAuthenticated: () => {
        return !!localStorage.getItem('token')
    },
    id: () =>{
        return localStorage.getItem('token')
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
export function randomUser() {
    return getRandomInt(1, 10)
}
export const imageFiles = Object.values(import.meta.glob('/src/assets/pictures/*', { eager: true, as: 'url' }))
export function imageUrlAlt(event: Event) { //  узнать чо не так
    event.target.src = imageFiles[getRandomInt(0, imageFiles.length)];
}


