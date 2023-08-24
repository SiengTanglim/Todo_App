import { HOME } from "../constants"

export const loadHome = (home: any) => {
    return (dispatch: any) => {
        dispatch({ type: HOME, home })
    }
}