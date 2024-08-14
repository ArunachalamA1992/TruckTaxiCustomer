import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Color from '../Global/Color';
import OTPInput from '../components/OTPInput';
import Enquiry from '../components/Enquiry';
import {Manrope} from '../Global/FontFamily';
import {selectDestination, selectOrigin} from '../slices/navSlice';

const {width, height} = Dimensions.get('screen');
const BookingSummary = ({route, navigation}) => {
  const dispatch = useDispatch();

  const [data] = useState(route.params);
  // console.log("DATAA ================= : ", data);
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
  const [approximateFee, setApproximateFee] = useState('');
  const [baseFare, setBaseFare] = useState('');
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [region, setregion] = useState({
    latitude: 12.9630208,
    longitude: 80.1898496,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
  });
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const [initorigin, setinitorigin] = useState(null);
  const [initdrop, setinitdrop] = useState(null);

  const [pickadd, setpickadd] = useState('');
  const [pickdrop, setpickdrop] = useState('');

  useEffect(() => {
    reload();
  }, [origin, destination]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      reload();
    });
    return unsubscribe;
  }, [navigation]);

  const reload = () => {
    if (destination != null) {
      console.log('Regular Call');
      setpickadd(origin);
      setpickdrop(destination);

      setinitorigin({
        latitude: origin.location.lat,
        longitude: origin.location.lng,
      });
      setregion({
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      });
      setinitdrop({
        latitude: destination.location.lat,
        longitude: destination.location.lng,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchCustomerDetails();
    getApproximateFee();
  }, [token]);

  useEffect(() => {
    AsyncStorage.getItem('userdata').then(userdata => {
      AsyncStorage.getItem('userToken').then(value => {
        let parseddata = JSON.parse(userdata);
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + token);
        myHeaders.append('Content-Type', 'application/json');

        messaging()
          .getToken()
          .then(token => {
            var raw = JSON.stringify({
              customerid: parseddata.customerid,
              registrationtoken: token,
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              redirect: 'follow',
              body: raw,
            };
            fetch(
              'https://trucktaxi.co.in/api/customer/updateToken',
              requestOptions,
            )
              .then(response => response.json())
              .then(result => {
                console.log('klasfjnklskll ', result);
              })
              .catch(error => console.log('error', error));
          });

        return messaging().onTokenRefresh(token => {
          var raw = JSON.stringify({
            customerid: parseddata.customerid,
            registrationtoken: token,
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: raw,
          };
          fetch(
            'https://trucktaxi.co.in/api/customer/updateToken',
            requestOptions,
          )
            .then(response => response.json())
            .then(result => {
              console.log(result);
            })
            .catch(error => console.log('error', error));
        });
      });
    });
  }, []);

  // const fetchCustomerDetails = async () => {
  //   try {
  //     const myHeaders = new Headers();
  //     myHeaders.append('Authorization', 'Bearer ' + token);

  //     const requestOptions = {
  //       method: 'GET',
  //       headers: myHeaders,
  //       redirect: 'follow',
  //     };
  //     console.log("PRO ============= :", mobileNumber);
  //     fetch(
  //       `https://trucktaxi.co.in/api/customer/getprofiledetails?mobileno=+91${mobileNumber}`,
  //       requestOptions,
  //     )
  //       .then(response => response.json())
  //       .then(result => {
  //         console.log("GET PRO ============= :", result);
  //         setCustomerID(result?.data?.[0]?.customerid);
  //         AsyncStorage.setItem(
  //           'customerID',
  //           JSON.stringify(result?.data?.[0]?.customerid),
  //         );
  //       })
  //       .catch(error => console.error(error));
  //   } catch (error) {
  //     console.error('Error fetching customer details:', error);
  //   }
  // };

  const confirmBooking = () => {
    setLoading(true);
    AsyncStorage.getItem('user').then(mobile => {
      AsyncStorage.getItem('userToken').then(value => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + value);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        console.log('requestOptions resp ============= : ', requestOptions);
        fetch(
          'https://trucktaxi.co.in/api/customer/getprofiledetails?mobileno=' +
            mobile,
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            var id = result.data[0].customerid;
            var cityid = result.data[0].cityid;
            var mobilenumber = result.data[0].mobileno;
            var customername = result.data[0].customername;

            var raw = JSON.stringify({
              cityid: cityid,
              mobileno: mobilenumber,
              name: customername,
              fromaddress: data?.pickup,
              fromloc: data?.pickup,
              fromloclat: data?.address?.pickup?.position?.latitude,
              fromloclong: data?.address?.pickup?.position?.longitude,
              toaddress: data?.drop,
              toloc: data?.drop,
              toloclat: data?.address?.drop?.position?.latitude,
              toloclong: data?.address?.drop?.position?.longitude,
              tripdate: data?.datetosend,
              triptime: data?.time,
              triptype: data?.fare,
              vechicletype: data?.selectedvehcilelist?.id,
              goodstype: data?.goodValue,
              customerid: id,
              // "offercode": "FIRST50",
              noofbookings: data?.noVehicles,
            });

            const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow',
            };

            console.log('Body ============= : ', requestOptions);

            fetch(
              'https://trucktaxi.co.in/api/customer/booknow',
              requestOptions,
            )
              .then(response => response.json())
              .then(result => {
                console.log('confirm booking =================:', result);
                setBookingOTPVisible(true);
                setBookingData(result?.data?.[0]);
                ToastAndroid.show(
                  result?.data?.[0]?.message,
                  ToastAndroid.SHORT,
                );
              })
              .catch(error => console.error('catch in booknow_api:', error));

            // const raw = JSON.stringify({
            //   "cityid": cityidid,
            //   "mobileno": mobile,
            //   "name": result.data[0].customername,
            //   "fromloc": data?.pickup,
            //   "fromloclat": (data?.address?.pickup?.position?.latitude).toString(),
            //   "fromloclong": (data?.address?.pickup?.position?.longitude).toString(),
            //   "toloc": data?.drop,
            //   "toloclat": (data?.address?.drop?.position?.latitude).toString(),
            //   "toloclong": (data?.address?.drop?.position?.longitude).toString(),
            //   "tripdate": data?.datetosend,
            //   "triptime": data?.time,
            //   "noofbookings": data?.noVehicles,
            //   "triptype": data?.fare,
            //   "packagetype": data?.Packagevalue,
            //   "intercitytype": data?.intercitytype,
            //   "vechicletype": data?.selectedvehcilelist?.id,
            //   "goodstype": data?.goodValue,
            //   "customerid": id
            // });

            // const requestOptions = {
            //   method: 'POST',
            //   headers: myHeaders,
            //   body: raw,
            //   redirect: 'follow',
            // };
            // console.log("requestOptions ==================== :", requestOptions)

            // fetch('https://trucktaxi.co.in/api/customer/booknow', requestOptions)
            //   .then(response => response.json())
            //   .then(result => {
            //     console.log('confirm booking =================:', result);
            //     setBookingOTPVisible(true);
            //     setBookingData(result?.data?.[0]);
            //     ToastAndroid.show(result?.data?.[0]?.message, ToastAndroid.SHORT);
            //   })
            //   .catch(error => console.error("catch in booknow_api:", error));
          });
      });
    });
  };

  const getApproximateFee = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + token);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      let url;
      if (data?.fare == 1) {
        url = `https://trucktaxi.co.in/api/customer/getmeterfare?distance=${data?.distance}&cityid=${cityCode}&vehicleid=${data?.selectedvehcilelist?.id}`;
      }
      // else {
      //   url = `https://trucktaxi.co.in/api/customer/getfareforpackage?distance=${data?.distance}&basefare=${data?.Packagevalue?.basefare}&basekm=${data?.Packagevalue?.basekm}&addkmcharge=18`;
      // }

      const response = await fetch(url, requestOptions);
      const result = await response.json();

      // console.log('response', result);

      const responseData = result.data?.[0];
      setApproximateFee(responseData?.approximatefare);
      setBaseFare(responseData?.basefare);
    } catch (error) {
      console.log('error', error);
    }
  };

  const setVerifyOTP = async () => {
    try {
      // const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Authorization", "Bearer " + token);

      // const raw = JSON.stringify({
      //   bookid: bookingData?.bookid,
      //   OTP: code,
      // });
      // const requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: 'follow',
      // };
      // console.log('VerifyOTP body =============== : ', requestOptions,);
      // fetch('https://trucktaxi.co.in/api/customer/verifyTripOTP', requestOptions,)
      //   .then(response => response.text())
      //   .then(result => {
      //     console.log('result ******************', result);
      //     if (result?.status == 200) {
      //       ToastAndroid.show(result?.message, ToastAndroid.SHORT);
      //       setBookingOTPVisible(false);
      //       navigation.replace('BookaPickup');
      //     } else {
      //       ToastAndroid.show(result?.message, ToastAndroid.SHORT);
      //     }
      //   })
      //   .catch(error => console.error("catch in verifyTrip_OTP :", error));

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Iis5MTk2Nzc3MDkzMjEiLCJvdHAiOiIzMjcwIiwiaWF0IjoxNjQ0Mjk2NDI3fQ.xEErWisz_FKDAO4SBfqU2K6t3Q_EMtYpWTeUxEOc5_E',
      );

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

      fetch(
        'https://trucktaxi.co.in/api/customer/verifyTripOTP',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => console.log('VERIFY OTP =============:', result))
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
          {/* <Text style={styles.type}>Regular Charges :</Text> */}
          {/* <Text style={styles.type}>Peak Time Fare :</Text> */}
          <Text style={styles.type}>Approximate Fees :</Text>
          {data?.fare == 1 && <Text style={styles.type}>Base Fees :</Text>}
          <Text style={styles.type}>Pickup :</Text>
          <Text style={styles.type}>Drop :</Text>
        </View>
        <View style={styles.container3}>
          <Text style={styles.value}>
            {/* {moment(data?.datetosend).format('YYYY-MM-DD HH:mm A')} */}
            {moment(data?.datetosend + ' ' + data.time).format(
              'DD-MM-YYYY hh:mm a',
            )}
          </Text>
          <Text style={styles.value}>{data?.fareName}</Text>
          {/* <Text style={styles.value}>₹ 0</Text> */}
          {/* <Text style={styles.value}>Rs.0</Text> */}
          <Text style={styles.value}>
            ₹{' '}
            {data?.fare != 1
              ? data?.fare == 2
                ? data?.Packagevalue?.basefare
                : data?.fare == 3
                ? data?.intercitytype?.basefare
                : data?.nighttype?.basefare
              : approximateFee}
          </Text>
          {data?.fare == 1 && <Text style={styles.value}>₹ {baseFare}</Text>}
          <Text style={styles.value}>{data?.pickup}</Text>
          <Text style={styles.value}>{data?.drop}</Text>
        </View>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          value={coupon}
          placeholder="Enter Coupon Code"
          placeholderTextColor={Color.black3}
          onChangeText={text => {
            setCoupon(text);
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: Color.primary,
            borderRadius: 10,
            padding: 15,
            width: 100,
          }}>
          <Text style={styles.applyButton}>Apply</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          bottom: 10,
        }}>
        <View style={styles.confirmView}>
          <TouchableOpacity
            onPress={() => {
              setEnquiryVisible(true);
            }}
            style={{
              width: '48%',
              height: 50,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: Color.cloudyGrey,
              borderRadius: 5,
              padding: 5,
            }}>
            <Text style={styles.enquiry}>Enquiry</Text>
          </TouchableOpacity>
          <View
            style={{
              width: 5,
              height: '100%',
              backgroundColor: Color.white,
            }}></View>
          <TouchableOpacity
            style={{
              width: '48%',
              height: 50,
              backgroundColor: Color.primary,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}
            onPress={() => confirmBooking()}>
            <Text style={styles.confirm}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={bookingOTPVisible}
        transparent={true}
        animationType="slide">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: '#00000050',
          }}
          onPress={() => {
            setBookingOTPVisible(false);
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
                width: '80%',
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.primary,
                borderRadius: 10,
              }}>
              <Text style={styles.confirm}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
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
    backgroundColor: Color.white,
  },
  header: {
    color: Color.black,
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
    borderColor: Color.black,
  },
  container3: {
    flex: 1,
  },
  type: {
    color: Color.shadow,
    fontFamily: Manrope.Bold,
    fontSize: 14,
    marginTop: 10,
    paddingVertical: 5,
  },
  value: {
    flex: 1,
    color: Color.black,
    fontFamily: Manrope.Bold,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 10,
    paddingVertical: 5,
  },
  inputView: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: Color.black,
    borderWidth: 1,
    borderColor: Color.black,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  applyButton: {
    color: Color.white,
    fontSize: 14,
    textAlign: 'center',
  },
  confirmView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.28,
  },
  enquiry: {
    color: Color.black,
    fontSize: 14,
    textAlign: 'center',
  },
  confirm: {
    color: Color.white,
    fontSize: 16,
    textAlign: 'center',
  },
});
