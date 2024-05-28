import { LOGIN, SIGNOUT, UPDATEPROFILE } from "./constants";

export const login = data => ({
    type: LOGIN,
    playload: {
        // userId: data.userId,
        token: data.token,
        mobileNumber: data.mobileNumber,
    }
})

export const update = data => ({
    type: UPDATEPROFILE,
    playload: {
        userId: data.userId,
        userName: data.userName,
        mobileNumber: data.mobileNumber,
        profileImage: data.profileImage,
        address: data.address,
        cityCode: data.cityCode,
        companyName: data.companyName,
        GSTNumber: data.GSTNumber,
        companyAddress: data.companyAddress,
    }
})

export const signOut = data => ({
    type: SIGNOUT,
    playload: {}
})