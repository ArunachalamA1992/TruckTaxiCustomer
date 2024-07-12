import { ActivityIndicator, Dimensions, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Colors from '../../components/Colors';
import { Manrope } from '../../Global/FontFamily';


const scr_height = Dimensions.get('window').height;
const scr_width = Dimensions.get('window').width;

const Notifications = () => {

  const navigation = useNavigation();
  const token = useSelector(state => state.token);
  const [notifyData, setNotifyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      fetch("https://trucktaxi.co.in/api/customer/getnotifications?customerid=1", requestOptions)
        .then((response) => response.json())
        .then((result) => { setNotifyData(result?.data), setLoading(false) })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log("catch in use_Effect :", error);
    }
  }, [])

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
  //         <Ionicons name="arrow-back" size={25} color="#000" />
  //       </TouchableOpacity>
  //     ),
  //     headerTitle: () => (
  //       <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5, }}>
  //         <Text style={{ color: "black", fontSize: 18, }}>Notifications</Text>
  //         {/* <Icon name="bell" size={20} color="#000" /> */}
  //       </View>
  //     ),
  //   })
  // }, [])

  return (
    <View style={{
      width: scr_width,
      height: scr_height * 1 - 100, backgroundColor: Colors.white
    }}>

      {!loading ?
        <FlatList
          data={notifyData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.NotificationView}>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.time}>{moment(item.senttime).format('DD-MM-YYYY hh:mm a')}</Text>
              </View>
            )
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  width: scr_width,
                  height: scr_height,
                  // height: scr_height / 1.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.black,
                  }}>
                  No Data
                </Text>
              </View>
            );
          }}
        />
        :
        <View style={styles.load}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        </View>}
    </View>
  )
}

export default Notifications

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  NotificationView: {
    width: '100%',
    backgroundColor: Colors.steel,
    padding: 10,
    marginVertical: 10,
    borderRadius: width * 0.01,
  },
  message: {
    textAlign: 'justify',
    alignSelf: "flex-start", paddingVertical: 5,
    fontSize: 14, letterSpacing: 0.5, lineHeight: 22,
    color: Colors.black, fontFamily: Manrope.SemiBold
  },
  time: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: Colors.black3,
  },
  load: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
})