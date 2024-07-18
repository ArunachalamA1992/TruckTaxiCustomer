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
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../components/Colors';
import Snackbar from 'react-native-snackbar';
import {useSelector} from 'react-redux';
import OTPInput from '../../components/OTPInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Enquiry from './Enquiry';

const {width, height} = Dimensions.get('screen');
const BookingSummary = ({route, navigation}) => {
  const [data] = useState(route.params);
  const token = useSelector(state => state.token);
  const mobileNumber = useSelector(state => state.mobileNumber);
  const cityCode = useSelector(state => state.cityCode);
  const userName = useSelector(state => state.userName);
  const [code, setCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const [bookingOTPVisible, setBookingOTPVisible] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [coupon, setCoupon] = useState('');
  const [customerid, setCustomerID] = useState('');
  const [enquiryVisible, setEnquiryVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchCustomerDetails();
  }, [token]);

  const fetchCustomerDetails = async () => {
    try {
      const myHeaders = new Headers();
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
          AsyncStorage.setItem(
            'customerID',
            JSON.stringify(result?.data?.[0]?.customerid),
          );
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
    console.log('confirmData', confirmData);
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
        console.log('confirm booking =================:', result);
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
      console.log(
        'requestOptions =============== : ',
        JSON.stringify(requestOptions),
      );
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
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primaryColor,
            borderRadius: 10,
            padding: 15,
            width: 100,
          }}>
          <Text style={styles.applyButton}>Apply</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.confirmView}>
        <TouchableOpacity
          onPress={() => {
            setEnquiryVisible(true);
          }}
          style={{
            width: '48%',
            borderWidth: 1,
            borderColor: Colors.cloudyGrey,
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={styles.enquiry}>Enquiry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '48%',
            backgroundColor: Colors.primaryColor,
            borderRadius: 10,
            padding: 10,
          }}
          onPress={() => confirmBooking()}>
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
          <View style={{flex: 1}} />
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
              }}
              style={{
                width: '45%',
                backgroundColor: Colors.primaryColor,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
              }}>
              <Text style={styles.confirm}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Enquiry
        visible={enquiryVisible}
        setVisible={setEnquiryVisible}
        cityCode={cityCode}
        mobileNumber={mobileNumber}
        userName={userName}
        customerid={customerid}
        data={data}
        token={token}
      />
    </View>
  );
};

export default BookingSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  header: {
    color: Colors.black,
    fontSize: 19,
    fontWeight: '500',
    marginVertical: 10,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.black,
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
    marginTop: 20,
    gap: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  applyButton: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
  confirmView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.28,
  },
  enquiry: {
    color: Colors.black,
    fontSize: 14,
    textAlign: 'center',
  },
  confirm: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
});
