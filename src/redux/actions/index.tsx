import { SET_LOADING, SET_SUBSCRIBE_MODAL, SET_TRACK_MODAL } from "../constants"

export const setSpinnerLoading = (value: any) => {
    return (dispatch: any) => {
        dispatch({ type: SET_LOADING, value })
    }
}

export const setSubscribeModal = (value: any) => {
    return (dispatch: any) => {
        dispatch({ type: SET_SUBSCRIBE_MODAL, value })
    }
}

// export const setTrackModal = (value: any) => {
//     return (dispatch: any) => {
//         dispatch({ type: SET_TRACK_MODAL, value })
//     }
// }

// export const showDownload = (dispatch: any, download: any) => {
//     dispatch({ type: SHOW_DOWNLOAD, download });
//   };