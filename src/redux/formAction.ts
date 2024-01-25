export const ADD_USER_DETAILS = "ADD_USER_DETAILS";
export const ADD_OTHER_DETAILS = "ADD_OTHER_DETAILS";  
export const ADD_USER_DATA = "ADD_USER_DATA";
export const RESET_FORM = "RESET_FORM";
export const REMOVE_USER_DATA = "REMOVE_USER_DATA";


export const addUserDetails = (field: string, value: any) => ({
  type: ADD_USER_DETAILS,
  field,
  value,
});

export const addOtherDetails = (field: string, value: any) => ({
  type: ADD_OTHER_DETAILS,
  field,
  value,
});

export const addUserData = (userData: any) => ({
  type: ADD_USER_DATA,
  userData,
});

export const removeUserData = (index: number) => ({
  type: REMOVE_USER_DATA,
  index,
});
