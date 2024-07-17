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
      <Image style={styles.image} source={require("../../asset/image/welcomScreenImg.png")} />
      <Text style={styles.header}>Enable  Location</Text>
      <Text style={styles.text}>Please enable your location for {"\n"} using the app smoothly</Text>
      <TouchableOpacity onPress={() => requestPermission()}
        style={{ width: '80%', height: 45, backgroundColor: Colors.primaryColor, borderRadius: 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
        <Text style={styles.allow}>Allow Location</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert("Location permission denied")}
        style={{ width: '80%', height: 45, borderColor: Colors.primaryColor, borderRadius: 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
        <Text style={styles.deny}>Deny</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WelcomeScreen

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: width * 0.9,
    height: height * 0.32,
    resizeMode: "contain"
  },
  header: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: height * 0.015,
  },
  text: {
    color: Colors.shadow,
    textAlign: "center",
    fontSize: 14,
  },
  allow: {
    fontSize: 16,
    color: Colors.white,
  },
  deny: {
    color: Colors.primaryColor,
    fontSize: 16,
  }
})