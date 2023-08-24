import { USER } from "../constants"

export const loadUser = (user: any) => {
    return (dispatch: any) => {
        dispatch({ type: USER, user })
    }
}