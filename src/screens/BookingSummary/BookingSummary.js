import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../components/Colors';
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux';
import OTPInput from '../../components/OTPInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingSummary = ({ route, navigation }) => {
  const [data] = useState(route.params);
  const token = useSelector(state => state.token);
  console.log('token', token);
  const mobileNumber = useSelector(state => state.mobileNumber);
  const cityCode = useSelector(state => state.cityCode);
  const userName = useSelector(state => state.userName);
  const [code, setCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const [bookingOTPVisible, setBookingOTPVisible] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [coupon, setCoupon] = useState('');
  const [customerid, setCustomerID] = useState('');
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: width * 0.04 }}
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
          <Text style={{ color: 'black', fontSize: 18 }}>Book a Pickup</Text>
          <Icon2 name="truck" size={20} color="#000" />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: width * 0.04 }}
          onPress={() => navigation.navigate('Notifications')}>
          <Text
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              backgroundColor: Colors.red,
              fontSize: 12,
              paddingHorizontal: width * 0.01,
              borderRadius: 25,
              zIndex: 5,
            }}>
            1
          </Text>
          <Icon name="bell" size={23} color={Colors.primaryColor} />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    fetchCustomerDetails();
  }, [token]);

  const fetchCustomerDetails = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append(
        'x-access-token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1EMTIzIiwicm9sZSI6MSwiaWF0IjoxNTk3MjIxMzA1LCJleHAiOjE1OTczMDc3MDV9.Tj0B6Jh1EQySEtJvMFcxM5e4w0rNTDMKN1eqPze8sLk',
      );
      myHeaders.append('Authorization', 'Bearer ' + token);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(
        `https://trucktaxi.co.in/api/customer/getprofiledetails?mobileno=+91${mobileNumber}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          setCustomerID(result?.data?.[0]?.customerid);
          AsyncStorage.setItem('customerID', JSON.stringify(result?.data?.[0]?.customerid));
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const confirmBooking = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);
    var confirmData = {
      cityid: cityCode,
      mobileno: mobileNumber,
      name: userName,
      fromloc: data?.pickup,
      fromloclat: data?.address?.pickup?.position?.latitude,
      fromloclong: data?.address?.pickup?.position?.longitude,
      toloc: data?.drop,
      toloclat: data?.address?.drop?.position?.latitude,
      toloclong: data?.address?.drop?.position?.longitude,
      tripdate: data?.datetosend,
      triptime: data?.time,
      vechicletype: data?.selectedvehcilelist?.id,
      goodstype: data?.goodValue,
      fromaddress: data?.pickup,
      toaddress: data?.drop,
      triptype: data?.fare,
      customerid: customerid,
      noofbookings: data?.noVehicles,
    };

    if (coupon != '') {
      confirmData.offercode = coupon;
    }

    const raw = JSON.stringify(confirmData);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://trucktaxi.co.in/api/customer/booknow', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("confirm booking =================:", result);
        setBookingOTPVisible(true);
        setBookingData(result?.data?.[0]);
        ToastAndroid.show(result?.data?.[0]?.message, ToastAndroid.SHORT);
      })
      .catch(error => console.error(error));
  };

  const setVerifyOTP = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer ' + token);
      const raw = JSON.stringify({
        bookid: bookingData?.bookid,
        OTP: code,
      });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      console.log("requestOptions =============== : ", JSON.stringify(requestOptions));
      fetch(
        'https://trucktaxi.co.in/api/customer/verifyTripOTP',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log('result ******************', result);
          if (result?.status == 200) {
            ToastAndroid.show(result?.message, ToastAndroid.SHORT);
            setBookingOTPVisible(false);
            navigation.replace('MyBookings');
          } else {
            ToastAndroid.show(result?.message, ToastAndroid.SHORT);
          }
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Summary</Text>
      <View style={styles.container2}>
        <View style={styles.container3}>
          <Text style={styles.type}>Pickup Time :</Text>
          <Text style={styles.type}>Trip Type :</Text>
          <Text style={styles.type}>Regular Charges :</Text>
          {/* <Text style={styles.type}>Peak Time Fare :</Text> */}
          {data?.fare != 1 && (
            <Text style={styles.type}>Approximate Fees :</Text>
          )}
          <Text style={styles.type}>Pickup :</Text>
          <Text style={styles.type}>Drop :</Text>
        </View>
        <View style={styles.container3}>
          <Text style={styles.value}>{data?.datetosend}</Text>
          <Text style={styles.value}>{data?.fareName}</Text>
          <Text style={styles.value}>₹ 0</Text>
          {/* <Text style={styles.value}>Rs.0</Text> */}
          {data?.fare != 1 && (
            <Text style={styles.value}>
              ₹{' '}
              {data?.fare == 2
                ? data?.Packagevalue?.basefare
                : data?.fare == 3
                  ? data?.intercitytype?.basefare
                  : data?.nighttype?.basefare}
            </Text>
          )}
          <Text style={styles.value}>{data?.pickup}</Text>
          <Text style={styles.value}>{data?.drop}</Text>
        </View>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          value={coupon}
          placeholder="Enter Coupon Code"
          placeholderTextColor={Colors.black3}
          onChangeText={text => {
            setCoupon(text);
          }}
        />
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
      <Modal
        visible={bookingOTPVisible}
        transparent={true}
        animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000050',
          }}>
          <View style={{ flex: 1 }} />
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.header}>Enter Your Booking OTP</Text>
            <OTPInput
              code={code.toString()}
              setCode={setCode}
              setIsPinReady={setIsPinReady}
              maximumLength={6}
              inputRef={inputRef}
            />
            <TouchableOpacity
              onPress={() => {
                setVerifyOTP();
              }}>
              <Text style={styles.confirm}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookingSummary;

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    padding: width * 0.04,
  },
  header: {
    color: Colors.black,
    fontSize: 19,
    fontWeight: '500',
    marginVertical: height * 0.02,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.04,
    margin: width * 0.01,
    borderRadius: width * 0.015,
    borderWidth: 1,
    borderColor: Colors.black3,
  },
  container3: {
    flex: 1,
  },
  type: {
    color: Colors.shadow,
    fontSize: 14,
    marginTop: 10,
  },
  value: {
    flex: 1,
    color: Colors.black2,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 10,
  },
  inputView: {
    flexDirection: 'row',
    marginTop: height * 0.04,
    gap: width * 0.05,
    alignItems: 'center',
  },
  input: {
    width: width * 0.6,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: width * 0.015,
    paddingHorizontal: width * 0.02,
  },
  applyButton: {
    color: Colors.white,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: width * 0.08,
    paddingVertical: width * 0.04,
    borderRadius: width * 0.014,
  },
  confirmView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.28,
  },
  enquiry: {
    color: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.cloudyGrey,
    paddingHorizontal: width * 0.16,
    paddingVertical: width * 0.04,
    borderRadius: width * 0.014,
  },
  confirm: {
    color: Colors.white,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: width * 0.08,
    paddingVertical: width * 0.04,
    borderRadius: width * 0.014,
  },
});
