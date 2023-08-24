import { Dispatch } from "react";
import { loadHome } from "../redux/actions/Home";
import { loadUser } from "../redux/actions/User";
import { fetchAPI, fetchBasicApi, MethodType } from "./api";

export async function loadData(dispatch: Dispatch<any>) {
  // loadHomeData(dispatch);
  // fetchBasicApi('agreement?').then(result => {
  //   dispatch(loadTermAndCondition(result));
  // });
  // fetchBasicApi('subject/list').then((subject: any) => {
  //   dispatch(loadSubject(subject));
  // });
}

export const loadUserData = async (dispatch: any) => {
  fetchAPI(MethodType.GET, 'user/profile').then(async (result: any) => {
    dispatch(loadUser(result.user));
    loadLessonData(dispatch, result.user)
  });
}

export const loadHomeData = async (dispatch: any) => {
  fetchBasicApi('home?').then((home: any) => {
    dispatch(loadHome(home));
  });
}

export const loadLessonData = async (dispatch: any, user: any = null) => {
  // (user ? fetchAPI(MethodType.GET, `college-class?`) : fetchBasicApi(`college-class?`)).then((lesson: any) => {
  //   dispatch(loadLesson(lesson));
  // })
}