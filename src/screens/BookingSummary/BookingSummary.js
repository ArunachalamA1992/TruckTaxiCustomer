import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../components/Colors';
import Snackbar from 'react-native-snackbar';

const BookingSummary = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: width* 0.04}}
              onPress={() => navigation.toggleDrawer()}>
              <Icon name="reorder" size={25} color="#000" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              <Text style={{color: 'black', fontSize: 18}}>Book a Pickup</Text>
              <Icon2 name="truck" size={20} color="#000" />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{marginRight: width* 0.04}} onPress={() => navigation.navigate("Notifications")}>
              <Text style={{position: "absolute", top: -4, right: -4, backgroundColor: Colors.red, fontSize: 12, paddingHorizontal: width* 0.01,borderRadius: 25,zIndex: 5,}}>1</Text>
              <Icon name="bell" size={23} color={Colors.primaryColor} />
            </TouchableOpacity>
          )
        });
      }, []);

  const confirmBooking = () => {
    Snackbar.show({
      text: 'BOOKED',
      duration: Snackbar.LENGTH_SHORT,
      textColor: Colors.white,
      backgroundColor: Colors.black,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Summary</Text>
      <View style={styles.container2}>
        <View style={styles.container3}>
          <Text style={styles.type}>Pickup Time :</Text>
          <Text style={styles.type}>Trip Type :</Text>
          <Text style={styles.type}>Regular Charges :</Text>
          <Text style={styles.type}>Peak Time Fare :</Text>
          <Text style={styles.type}>Approximate Fees :</Text>
          <Text style={styles.type}>Pickup :</Text>
          <Text style={styles.type}>Drop :</Text>
        </View>
        <View style={styles.container3}>
          <Text style={styles.value}>29/10/2023-16:52</Text>
          <Text style={styles.value}>Meter Fare</Text>
          <Text style={styles.value}>Rs.288</Text>
          <Text style={styles.value}>Rs.0</Text>
          <Text style={styles.value}>Rs.0</Text>
          <Text style={styles.value}>Gandhipuram</Text>
          <Text style={styles.value}>Railway Station</Text>
        </View>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.input} placeholder='Enter Coupon Code' placeholderTextColor={Colors.black3}/>
        <TouchableOpacity>
          <Text style={styles.applyButton}>Apply</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.confirmView}>
      <TouchableOpacity>
          <Text style={styles.enquiry}>Enquiry</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmBooking()}>
          <Text style={styles.confirm}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BookingSummary

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    padding: width* 0.04,
  },
  header: {
    color: Colors.black,
    fontSize: 19,
    fontWeight: "500",
    marginVertical: height* 0.02,
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width* 0.04,
    margin: width* 0.01,
    borderRadius: width* 0.015,
    borderWidth: 1,
    borderColor: Colors.black3,
  },
  container3: {
    gap: height* 0.012,
  },
  type: {
    color: Colors.shadow,
    fontSize: 14,
    
  },
  value: {
    color: Colors.black2,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
  },
  inputView: {
    flexDirection: "row",
    marginTop: height* 0.04,
    gap: width* 0.05,
    alignItems: "center",
  },
  input: {
    width: width* 0.6,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: width* 0.015,
    paddingHorizontal: width* 0.02,
  },
  applyButton: {
    color: Colors.white,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: width* 0.08,
    paddingVertical: width* 0.04,
    borderRadius: width* 0.014,
  },
  confirmView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height* 0.28,
  },
  enquiry: {
    color: Colors.black,
    backgroundColor: Colors.black3,
    paddingHorizontal: width* 0.16,
    paddingVertical: width* 0.04,
    borderRadius: width* 0.014,
  },
  confirm: {
    color: Colors.white,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: width* 0.08,
    paddingVertical: width* 0.04,
    borderRadius: width* 0.014,
  }
})