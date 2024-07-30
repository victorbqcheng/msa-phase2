export type Post = {
    id: string,
    title: string,
    content: string,
    authorName: string,
    createdAt: string;
};

export type User = {
    id:string;
    userName:string;
    email:string;
    token: string;
};