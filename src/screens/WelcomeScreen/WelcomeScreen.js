import { Dimensions, Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../components/Colors'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {

  const navigation = useNavigation()

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'TruckTaxi',
          message: 'App access to your location',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.replace("Login")
      } else {
        console.log("Location permission denied");
        alert("Location permission denied");
        navigation.navigate("Login")
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../asset/image/welcomScreenImg.png")}/>
      <Text style={styles.header}>Enable  Location</Text>
      <Text style={styles.text}>Please enable your location for {"\n"} using the app smoothly</Text>
      <TouchableOpacity onPress={() => requestPermission()}>
        <Text style={styles.allow}>Allow Location</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert("Location permission denied")}>
      <Text style={styles.deny}>Deny</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WelcomeScreen

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: width* 0.9,
    height: height* 0.32,
    resizeMode: "contain"
  },
  header: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: height* 0.015,
  },
  text: {
    color: Colors.shadow,
    textAlign: "center",
    fontSize: 14,
  },
  allow: {
    fontSize: 18,
    color: Colors.white,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: width* 0.14,
    paddingVertical: height* 0.01,
    borderRadius: width* 0.015,
    marginTop: height* 0.04,
  },
  deny: {
    color: Colors.black2,
    fontSize: 18,
    marginVertical: height* 0.02,
  }
})