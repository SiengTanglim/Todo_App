import { TERM } from "../constants";

export const loadTermAndCondition = (term_and_condition: any) => {
  return (dispatch: any) => {
    dispatch({type: TERM, term_and_condition});
  };
};
