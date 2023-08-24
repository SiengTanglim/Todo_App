import { TERM } from "../constants";

export const TermAndCondition = (
  state = null,
  action: {type: any; term_and_condition: any[]; error: any},
) => {
  switch (action.type) {
    case TERM:
      return action.term_and_condition;
    default:
      return state;
  }
};
