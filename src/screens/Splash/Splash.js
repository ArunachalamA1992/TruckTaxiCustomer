import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../components/Colors'

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../asset/image/TruckTaxiLogo.png")}/>
      <ActivityIndicator size="large" color={Colors.white}/>
    </View>
  )
}

export default Splash

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    padding: width* 0.05,
    gap: height* 0.38
  },
  image: {
    width: width* 0.6,
    height: height* 0.3,
    resizeMode: "contain",
  }
})