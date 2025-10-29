import axios from "axios";
import {PhotoDto} from "../Models/Dto/PhotoDto.ts";

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


// function getRandomImage(): string

export const AlbumsApi = {
    async getUserAlbum(userID: number, numberOfAlbum: number) {
        return axios.get(`https://jsonplaceholder.typicode.com/users/${userID}/albums`)
            .then(async resp => {
                const photosInAlbum = await axios.get(`https://jsonplaceholder.typicode.com/albums/${numberOfAlbum}/photos`)
                    .then(resp => {
                        resp.data.map((photo: PhotoDto) => photo.url)
                        return resp.data as string[]
                    })
                return {
                    title: resp.data[numberOfAlbum].title,
                    userId: userID,
                    images: photosInAlbum
                }
            })
    }
}