import axios from "axios";
import { SCHEDULE } from "../types/ScheduleTypes";

const scheduleAction = (schedule_info) => {
  return async (dispatch) => {
    try {

      const res = await axios.post(
        "https://stream-new-2142d-default-rtdb.firebaseio.com/schedule.json",
        schedule_info,
      );
      console.log("THIS IS SCHEDULE RESPONSE", res);
      const { data } = res;

      dispatch({
        type: SCHEDULE,
        schedule_res: data,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export default scheduleAction;
