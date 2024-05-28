import {LOGIN, SIGNOUT, UPDATEPROFILE} from './constants';

initialState = {
  isLoggedIn: false,
  token: "",
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
        token: action.playload.token,
        mobileNumber: action.playload.mobileNumber,
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
        userName: action.playload.userName,
        mobileNumber: action.playload.mobileNumber,
        profileImage: action.playload.profileImage,
        address: action.playload.address,
        cityCode: action.playload.cityCode,
        companyName: action.playload.companyName,
        GSTNumber: action.playload.GSTNumber,
        companyAddress: action.playload.companyAddress,
      };
    default:
      return state;
  }
};
