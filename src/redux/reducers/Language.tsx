import { LANGUAGE } from "../constants";

const Language = (state = {}, action: any) => {
    switch (action.type) {
        case LANGUAGE:
            return action.lang;
        default:
            return state;
    }
}
export default Language;