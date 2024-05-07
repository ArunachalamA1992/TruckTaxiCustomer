import {LOGIN, SIGNOUT, UPDATEPROFILE} from './constants';

initialState = {
  isLoggedIn: false,
  userName: '',
  mobileNumber: '',
  profileImage: '',
  address: '',
  cityCode: '',
  companyName: '',
  GSTNumber: '',
  companyAddress: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        mobileNumber: action.mobileNumber,
      };
    case SIGNOUT:
      return {
        ...state,
        isLoggedIn: false,
        userName: '',
        mobileNumber: '',
        profileImage: '',
        address: '',
        cityCode: '',
        companyName: '',
        GSTNumber: '',
        companyAddress: '',
      };
    case UPDATEPROFILE:
      return {
        ...state,
        userName: action.userName,
        mobileNumber: action.mobileNumber,
        profileImage: action.profileImage,
        address: action.address,
        cityCode: action.cityCode,
        companyName: action.companyName,
        GSTNumber: action.GSTNumber,
        companyAddress: action.companyAddress,
      };
    default:
      return state;
  }
};
