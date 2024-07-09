// blogStore.js
import { makeAutoObservable } from 'mobx';
import { Post } from '../DataTypes';

class PostStore {
    postList:Post[] = [];
    selectedPost?:Post | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setPostList(posts:Post[]) {
        this.postList = posts;
    }

    selectPost(post:Post) {
        this.selectedPost = post;
    }
}

const postStore = new PostStore();
export default postStore;
