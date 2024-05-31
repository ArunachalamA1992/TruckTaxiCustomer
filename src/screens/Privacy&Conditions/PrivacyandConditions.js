import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const PrivacyandConditions = () => {
  const token = useSelector(state => state.token)
  const mobileNumber = useSelector(state => state.mobileNumber);

console.log(mobileNumber,token)
const formattedNo = "+91"+7708773906
console.log(formattedNo,"formattednoooooo")
  const call = async() => {
    const profileResponse = await fetch(
      `https://trucktaxi.co.in/api/customer/getprofiledetails?mobileno=${+917708773906}}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const profileData = await profileResponse.json();
    console.log(profileData)
  }

  return (
    <View>
      <TouchableOpacity onPress={() => call()}>
      <Text>Coming Soon.......</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PrivacyandConditions

const styles = StyleSheet.create({})