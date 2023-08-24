import { USER } from "../constants";

export const User = (state = null, action: any) => {
    switch (action.type) {
        case USER:
            return action.user;
        default:
            return state;
    }
}