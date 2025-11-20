import axios from "axios";
import {PhotoDto} from "../Models/Dto/PhotoDto.ts";
import {UserDto} from "../Models/Dto/UserDto.ts";
import {AlbumDto} from "../Models/Dto/AlbumDto.ts";
import {PostDto} from "../Models/Dto/PostDto.ts";
import {getRandomInt} from "../composition/metods.ts";

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

export const UserApi = {
    async getAllUsers() : Promise<UserDto[]>{
        return await axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(resp => {
                return resp.data
            })
    },
    async getUser(userId: number): Promise<UserDto>{
        return await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(resp => resp.data)
    }
}

export const PostApi = {
    async getAllUserPosts(userID: number) : Promise<PostDto[]> {
        return await axios.get(`https://jsonplaceholder.typicode.com/users/${userID}/posts`)
            .then(resp => resp.data)
    },
    // async getUserPost(userID: number, postId: number){
    //     return this.getAllUserPosts(userID)
    //         .then(async resp => {
    //             const
    //         })
    // }
}
export async function randomPhoto(userId: number){
    return await AlbumsApi.getAllUserAlbums(userId)
        .then(async resp => {
            return await AlbumsApi.getUserAlbum(userId, resp[getRandomInt(0, 10)].id)
                .then(resp => resp.images[getRandomInt(0, 50)])
        })
}
export const AlbumsApi = {
    async getAllUserAlbums(userID: number) : Promise<AlbumDto[]>{
        return await axios.get(`https://jsonplaceholder.typicode.com/users/${userID}/albums`)
            .then(resp  => {
                return resp.data
            })
    },
    async getUserAlbum(userID: number, albumId: number) {
        return this.getAllUserAlbums(userID)
            .then(async resp => {
                const photosInAlbum = await axios
                    .get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
                    .then(resp => resp.data.map((photo: PhotoDto) => photo.url) as string[])
                return {
                    title: resp[albumId % 10].title as string,
                    id: resp[albumId % 10].id as number,
                    userId: userID,
                    images: photosInAlbum
                }
            })
    }
}

