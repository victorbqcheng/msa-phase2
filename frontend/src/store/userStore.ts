import { makeAutoObservable } from "mobx";
import { User } from "../DataTypes";


class UserStore{
    user:User | null = this.getUserFromLocalStorage();
    constructor(){
        makeAutoObservable(this);
    }
    setUser(user:User|null){
        this.user = user;
        if(user !== null)
            localStorage.setItem('user', JSON.stringify(user));
        else
            localStorage.removeItem('user');
    }

    private getUserFromLocalStorage():User|null{
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}
const userStore = new UserStore();
export default userStore;