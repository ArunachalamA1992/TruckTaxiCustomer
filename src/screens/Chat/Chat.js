import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Sms from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../components/Colors';

const Chat = () => {

  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity
  //         style={{marginLeft: width * 0.04}}
  //         onPress={() => navigation.toggleDrawer()}>
  //         <Icon name="reorder" size={25} color="#000" />
  //       </TouchableOpacity>
  //     ),
  //     headerTitle: () => (
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           gap: 5,
  //         }}>
  //         <Text style={{color: 'black', fontSize: 18}}>Chat Support</Text>
  //         <Sms name="sms" size={25} color="#000" />
  //       </View>
  //     ),
  //     headerRight: () => (
  //       <TouchableOpacity
  //         style={{marginRight: width * 0.04}}
  //         onPress={() => navigation.navigate('Book a Pickup')}>
  //         <Icon2 name="home" size={25} color={Colors.primaryColor} />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.sms} resizeMode="center">

        <Text>ggg</Text>
      </ImageBackground>
      <View style={styles.inputContainer}>
        <View style={styles.inputContainer2}>
          <Icon3 name="images" size={20} color={Colors.black2} />
          <TextInput style={styles.input} />
        </View>
        <TouchableOpacity>
          <Icon name="arrow-circle-right" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Chat

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end"
  },
  sms: {
    height: height * 0.8
  },
  inputContainer: {
    backgroundColor: Colors.primaryColor,
    padding: width * 0.04,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer2: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.01,
    gap: width * 0.04,
  },
  input: {
    width: width * 0.64,
    color: Colors.black
  }
})