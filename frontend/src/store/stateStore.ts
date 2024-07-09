import { makeAutoObservable } from 'mobx';

class StateStore {
    openSnackbar:boolean = false;
    message?:string = "";

    constructor() {
        makeAutoObservable(this);
    }

    setOpenSnackbar(open:boolean, message?:string) {
        this.openSnackbar = open;
        this.message = message;
    }
}

const stateStore = new StateStore();
export default stateStore;
