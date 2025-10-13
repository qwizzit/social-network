import {AlbumDto} from "../Models/Dto/AlbumDto.ts";
import {UserDto} from "../Models/Dto/UserDto.ts";
import {PostDto} from "../Models/Dto/PostDto.ts";
import {PhotoDto} from "../Models/Dto/PhotoDto.ts";
import {randomUserPost} from "../Models/InterfaceRandomUserPost.ts";

export const usersData = {
    getUsers:  () => {
        const users = localStorage.getItem("users");
        return users ? JSON.parse(users) as UserDto[] : [];
    },
    getAlbums: () => {
        const albums = localStorage.getItem("albums");
        return albums ? JSON.parse(albums) as AlbumDto[] : [];
    },
    getPhotos: () => {
        const photos = localStorage.getItem("photos");
        return photos ? JSON.parse(photos) as PhotoDto[] : [];
    },
    getPosts: () => {
        const posts = localStorage.getItem("posts");
        return posts ? JSON.parse(posts) as PostDto[] : [];
    },
    getUploadedPosts: () => {
        const uploadedPosts = localStorage.getItem("uploadedPosts");
        return uploadedPosts ? JSON.parse(uploadedPosts) as randomUserPost[] : [];
    }
}

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
export function randomPhoto(user: number){

    const randomPhotoId = getRandomInt(1, 50)
    const userAlbums = usersData.getAlbums().filter((album : AlbumDto) => {
        // console.log(album.userId, user);
        return album.userId === user
    }); // передеалть
    const randomAlbum = userAlbums[getRandomInt(0, userAlbums.length - 1)];
    for(let i = 0; i < usersData.getPhotos().length; i += 50){
        if(usersData.getPhotos()[i].albumId === randomAlbum.id) {

            return usersData.getPhotos()[i + randomPhotoId].url as string
        }
    }

}


