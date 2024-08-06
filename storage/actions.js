import { LOGIN, SIGNOUT, UPDATEPROFILE } from "./constants"


export const login = data => ({
    type: LOGIN,
    playload: {
        userId: data.userId,
        token: data.token,
        mobileNumber: data.mobileNumber,
        userName: data.userName,
        profileImage: data.profileImage,
        address: data.address,
        cityCode: data.cityCode,
        customerType: data.customerType,
        companyName: data.companyName,
        GSTNumber: data.GSTNumber,
        companyAddress: data.companyAddress,
    }
})

export const update = data => ({
    type: UPDATEPROFILE,
    playload: {
        mobileNumber: data.mobileNumber,
        userName: data.userName,
        address: data.address,
        cityCode: data.cityCode,
        customerType: data.customerType,
        companyName: data.companyName,
        GSTNumber: data.GSTNumber,
        companyAddress: data.companyAddress,
        profileImage: data.profileImage,
    }
})

export const signOut = data => ({
    type: SIGNOUT,
    playload: {}
})