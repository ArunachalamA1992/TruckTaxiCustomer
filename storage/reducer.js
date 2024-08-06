import { LOGIN, SIGNOUT, UPDATEPROFILE } from "./constants";


initialState = {
  isLoggedIn: false,
  token: '',
  userName: '',
  mobileNumber: '',
  profileImage: '',
  address: '',
  cityCode: '',
  customerType: '',
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
        userName: action.playload.userName,
        mobileNumber: action.playload.mobileNumber,
        address: action.playload.address,
        cityCode: action.playload.cityCode,
        customerType: action.playload.customerType,
        companyName: action.playload.companyName,
        GSTNumber: action.playload.GSTNumber,
        companyAddress: action.playload.companyAddress,
        profileImage: action.playload.profileImage,
      };
    case SIGNOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: '',
        userName: '',
        mobileNumber: '',
        address: '',
        cityCode: '',
        customerType: '',
        companyName: '',
        GSTNumber: '',
        companyAddress: '',
        profileImage: '',
      };
    case UPDATEPROFILE:
      return {
        ...state,
        userName: action.playload.userName,
        mobileNumber: action.playload.mobileNumber,
        address: action.playload.address,
        cityCode: action.playload.cityCode,
        customerType: action.playload.customerType,
        companyName: action.playload.companyName,
        GSTNumber: action.playload.GSTNumber,
        companyAddress: action.playload.companyAddress,
        profileImage: action.playload.profileImage,
      };
    default:
      return state;
  }
};
