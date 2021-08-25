import { SCHEDULE } from "../types/ScheduleTypes";

const initialState = {
  schedule_res: {},
};
const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCHEDULE:
      return {
        ...state,
        schedule_res: action.schedule_res,
      };
    default:
      return state;
  }
};

export default scheduleReducer;
