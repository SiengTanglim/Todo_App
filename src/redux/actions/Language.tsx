import { LANGUAGE } from "../constants";

export const loadLanguage = (lang: any) => {
    return (dispatch: any) => {
        dispatch({ type: LANGUAGE, lang });
    }
}