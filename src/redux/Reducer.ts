import { combineReducers } from "redux";
import {
  ADD_USER_DETAILS,
  ADD_OTHER_DETAILS,
  ADD_USER_DATA,
  REMOVE_USER_DATA,
} from "./formAction";

interface UserDetailsAction {
  type: typeof ADD_USER_DETAILS;
  field: string;
  value: any;
}

interface OtherDetailsAction {
  type: typeof ADD_OTHER_DETAILS;
  field: string;
  value: any;
}

interface UserDataAction {
  type: typeof ADD_USER_DATA;
  userData: any;
}

interface UserDataState {
  userDetails: {
    firstname: string;
    lastname: string;
    email: string;
    dob: string;
    gender: string;
  };
  otherDetails: {
    address1: string;
    address2: string;
    country: string;
    state: string;
    mobile: string;
  };
  userRecords: any[]; // Adjust the type accordingly based on your data structure
}

interface RemoveUserDataAction {
  type: typeof REMOVE_USER_DATA;
  index: number;
}

const initialUserDetails = {
  firstname: "",
  lastname: "",
  email: "",
  dob: "",
  gender: "",
};

const initialOtherDetails = {
  address1: "",
  address2: "",
  country: "",
  state: "",
  mobile: "",
};

const userDetailsReducer = (
  state = initialUserDetails,
  action: UserDetailsAction
) => {
  switch (action.type) {
    case ADD_USER_DETAILS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

const otherDetailsReducer = (
  state = initialOtherDetails,
  action: OtherDetailsAction
) => {
  // console.log(action);
  switch (action.type) {
    case ADD_OTHER_DETAILS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

const initialUserData: UserDataState = {
  userDetails: {
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    gender: "",
  },
  otherDetails: {
    address1: "",
    address2: "",
    country: "",
    state: "",
    mobile: "",
  },
  userRecords: [], // Include userRecords in the initial state
};

const userDataReducer = (
  state = initialUserData,
  action: UserDetailsAction | OtherDetailsAction | UserDataAction | RemoveUserDataAction
): UserDataState => {
  switch (action.type) {
    case ADD_USER_DETAILS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          [action.field]: action.value,
        },
      };
    case ADD_OTHER_DETAILS:
      return {
        ...state,
        otherDetails: {
          ...state.otherDetails,
          [action.field]: action.value,
        },
      };
    case ADD_USER_DATA:
      return {
        ...state,
        userRecords: [...(state.userRecords || []), action.userData],
      };
    case REMOVE_USER_DATA:
      if (typeof action.index === "number") {
        const updatedUserRecords = state.userRecords.filter(
          (_, i) => i !== action.index
        );
        return {
          ...state,
          userRecords: updatedUserRecords,
        };
      }
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  otherDetails: otherDetailsReducer,
  userData: userDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
