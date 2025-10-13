export interface randomUserPost {
    userId: number;
    userName: string;
    photoUrl: string;
    post: {
        id: number;
        body: string;
        title:  string;
    }
}