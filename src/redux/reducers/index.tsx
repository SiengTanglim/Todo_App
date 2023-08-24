import { combineReducers } from "redux";
import { CONNECTION, SET_LOADING, SET_SUBSCRIBE_MODAL, SET_TRACK_MODAL } from "../constants";
import { Home } from "./Home";
import Language from "./Language";
import { TermAndCondition } from "./TermAndCondition";
import { User } from "./User";

const Connection = (state = false, action: any) => {
    switch (action.type) {
        case CONNECTION:
            return action.value
        default:
            return state;
    }
    return state;
}

const Loading = (state = false, action: any) => {
    switch (action.type) {
        case SET_LOADING:
            return action.value
        default:
            return state;
    }
}

const SubscribeModal = (state = false, action: any) => {
    switch (action.type) {
        case SET_SUBSCRIBE_MODAL:
            return action.value
        default:
            return state;
    }
}

const TrackModal = (state = false, action: any) => {
    switch (action.type) {
        case SET_TRACK_MODAL:
            return action.value
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    user: User,
    lang: Language,
    no_connection: Connection,
    home: Home,
    loading: Loading,
    term_and_condition: TermAndCondition,
})

export type ReducerProps = ReturnType<typeof rootReducer>;

export default rootReducer;