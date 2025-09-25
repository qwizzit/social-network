export interface randomUserPost {
    userId: number;
    userName: string;
    photoUrl: string;
    post: {
        id: string;
        body: string;
        title:  string;
    }
}