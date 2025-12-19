export interface InterfaceCommentInPost{
    briefUserInfo: {
        id: number,
        name: string,
        photoUrl: string,
    }
    comment: {
        id: number,
        body: string,
        tittle: string
    }
    commentLikes: number
}
