import { HOME } from "../constants";

export const Home = (state = null, action: any) => {
    switch (action.type) {
        case HOME:
            return action.home;
        default:
            return state;
    }
}