import { Dimensions, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../components/Colors';

const Notifications = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity style={{marginLeft: 20}} onPress={() => navigation.toggleDrawer()}>
                <Icon name="reorder" size={25} color="#000" />
            </TouchableOpacity>
        ),
        headerTitle: () => (
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5,}}>
                <Text style={{color: "black",fontSize: 18,}}>Notifications</Text>
                <Icon name="bell" size={20} color="#000" />
            </View>
        ),
    })
},[])

const Notification = [
  {
    Id: 0,
    message: "hello hiiiiiiiii",
    time: "27-03-2024/ 5:14 pm",
  },
  {
    Id: 1,
    message: "hello hiiiiiiiii",
    time: "27-03-2024/ 5:14 pm",
  },
  {
    Id: 2,
    message: "hello hiiiiiiiii",
    time: "27-03-2024/ 5:14 pm",
  },
]

  return (
    <ImageBackground style={styles.container} source={require("../../asset/image/Truckbg.png")} resizeMode="center">
      <FlatList data={Notification} showsVerticalScrollIndicator={false} renderItem={({item,index}) => {
        return (
          <View style={styles.NotificationView}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )
      }} />
    </ImageBackground>
  )
}

export default Notifications

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  NotificationView: {
    backgroundColor: Colors.steel,
    padding: width* 0.02,
    margin: width* 0.04,
    borderRadius: width* 0.01,
  },
  message: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: Colors.primaryColor,
  },
  time: {
    alignSelf: "flex-end",
    fontSize: 11,
    color: Colors.black2,
  },
})