import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Colors from '../../components/Colors';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Call from 'react-native-vector-icons/Ionicons';
import Sms from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';


const ContactUs = () => {
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
  //         <Text style={{color: 'black', fontSize: 18}}>Contact</Text>
  //         <Call name="call" size={20} color="#000" />
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

  const data = [
    {
      Id: 0,
      name: "www.trucktaxi.com",
      icon: <Icon2 name="web" size={25} color="#000" />
    },
    {
      Id: 1,
      name: "www.trucktaxi.com",
      icon: <Call name="call" size={25} color="#000" />
    },
    {
      Id: 2,
      name: "www.trucktaxi.com",
      icon: <Sms name="sms" size={25} color="#000" />
    },
    {
      Id: 3,
      name: "www.trucktaxi.com",
      icon: <Icon name="whatsapp" size={25} color="#000" />
    },
    {
      Id: 4,
      name: "www.trucktaxi.com",
      icon: <Icon2 name="facebook" size={25} color="#000" />
    }, {
      Id: 5,
      name: "www.trucktaxi.com",
      icon: <Icon2 name="instagram" size={25} color="#000" />
    },
    {
      Id: 6,
      name: "www.trucktaxi.com",
      icon: <Icon name="linkedin-square" size={25} color="#000" />
    },
  ]

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity key={index} style={styles.content}>
            {item.icon}
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default ContactUs

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flexDirection: "row",
    padding: width * 0.04,
    gap: width * 0.02,
  },
  name: {
    color: Colors.black2,
  }
})