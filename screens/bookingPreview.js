import React, {
  Component,
  useContext,
  useState,
  useRef,
  useEffect,
  Fragment,
} from 'react';
import {
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  Modal,
  Pressable,
  ToastAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {getPixelSize} from './utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectDestination,
  selectOrigin,
  setOrigin,
  setNull,
  setDestination,
  setTravelTimeInformation,
} from '../slices/navSlice';
import {P, H5, H4, H2, H6, H3} from '../components/typography';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {CommonActions} from '@react-navigation/native';

import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
} from './Map/styles';
import moment from 'moment';
import OTPInput from '../components/OTPInput';
import Color from '../Global/Color';
import {Manrope} from '../Global/FontFamily';
import {Iconviewcomponent} from '../Global/Icontag';

const BookingPreview = ({navigation, route}) => {
  const [region, setregion] = useState({
    latitude: 12.9630208,
    longitude: 80.1898496,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
  });
  const mapView = useRef();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  const [duration, setduration] = React.useState(null);
  const [initorigin, setinitorigin] = useState(null);
  const [initdrop, setinitdrop] = useState(null);
  const [showLoading, setshowLoading] = useState(false);
  const [pickadd, setpickadd] = useState('');
  const [pickdrop, setpickdrop] = useState('');
  const [amount, setamount] = useState('');
  const {packageid} = route.params;
  const {interID} = route.params;
  const {nightID} = route.params;
  const {alternativemobno} = route.params;

  const {selectedvehcilelist} = route.params;
  const {tripValue} = route.params;
  const {goodValue} = route.params;
  const {Packagevalue} = route.params;
  const {datetosend} = route.params;
  const {time} = route.params;
  const {peakfare} = route.params;
  const {tripcount} = route.params;
  const {total} = route.params;
  const {tripTypeid} = route.params;
  const {interfare} = route.params;

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [code, setCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const [bookingOTPVisible, setBookingOTPVisible] = useState(false);
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    navigation.setOptions({
      title: <Text>Booking Preview</Text>,
    });
  });

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

      setshowLoading(true);
      setamount(peakfare);
      setshowLoading(false);
    }
  };

  const ConfirmBooking = () => {
    setshowLoading(true);
    AsyncStorage.getItem('user').then(mobile => {
      AsyncStorage.getItem('userToken').then(value => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + value);
        myHeaders.append('Content-Type', 'application/json');
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        fetch(
          'https://trucktaxi.co.in/api/customer/getprofiledetails?mobileno=' +
            mobile,
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            var id = result.data[0].customerid;
            var cityidid = result.data[0].cityid;
            let date = moment(datetosend, 'DD-MM-YYYY').format('YYYY-MM-DD');

            var raw = JSON.stringify({
              cityid: cityidid,
              mobileno: mobile,
              name: result.data[0].customername,
              fromloc: pickadd.description,
              fromloclat: pickadd.location.lat.toString(),
              fromloclong: pickadd.location.lng.toString(),
              toloc: pickdrop.description,
              toloclat: pickdrop.location.lat.toString(),
              toloclong: pickdrop.location.lng.toString(),
              tripdate: date,
              triptime: time,
              noofbookings: tripcount,
              triptype: tripTypeid,
              packagetype: packageid,
              nighttype: nightID,
              intercitytype: interfare,
              vechicletype: selectedvehcilelist.id,
              goodstype: goodValue,
              customerid: id,
              alternativemobno: alternativemobno,
            });
            console.log(raw);
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow',
            };

            fetch(
              'https://trucktaxi.co.in/api/customer/booknow',
              requestOptions,
            )
              .then(response => response.json())
              .then(result => {
                console.log(
                  'Confirm booking resp ============= :',
                  JSON.stringify(result),
                );
                if (result.data[0].status == 200) {
                  setshowLoading(false);
                  setBookingOTPVisible(true);
                  setBookingData(result?.data?.[0]);
                  ToastAndroid.show(
                    result?.data?.[0]?.message,
                    ToastAndroid.SHORT,
                  );
                  // dispatch(
                  //     setNull()
                  // );
                } else {
                  ToastAndroid.show('Try again later', ToastAndroid.SHORT);
                }

                // setshowLoading(false)
                // console.log(result)
                // if (result.data[0].status == 200) {
                //     navigation.navigate('bookingotp', {
                //         bookingid: result.data[0].bookid
                //     });

                //     dispatch(
                //         setNull()
                //     );
                // }
              })
              .catch(error => {
                setshowLoading(false);
              });
          });
      });
    });

    dispatch(setOrigin(null));
    dispatch(setDestination(null));
  };

  const getquote = () => {
    AsyncStorage.getItem('user').then(mobile => {
      AsyncStorage.getItem('userToken').then(value => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + value);
        myHeaders.append('Content-Type', 'application/json');
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        fetch(
          'https://trucktaxi.co.in/api/customer/getprofiledetails?mobileno=' +
            mobile,
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            var id = result.data[0].customerid;
            var cityidid = result.data[0].cityid;
            let date = moment(datetosend, 'DD-MM-YYYY').format('YYYY-MM-DD');

            var raw = JSON.stringify({
              branchid: cityidid,
              mobileno: mobile,
              name: result.data[0].customername,
              fromloc: pickadd.description,
              fromloclat: pickadd.location.lat.toString(),
              fromloclong: pickadd.location.lng.toString(),
              toloc: pickdrop.description,
              toloclat: pickdrop.location.lat.toString(),
              toloclong: pickdrop.location.lng.toString(),
              tripdate: date,
              triptime: time,
              intercitytype: interfare,
              triptype: tripTypeid,
              packagetype: packageid,
              intercitytype: interfare,
              vechicletype: selectedvehcilelist.id,
              goodstype: goodValue,
              customerid: id,
            });
            console.log(raw);
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow',
            };

            fetch(
              'https://trucktaxi.co.in/api/customer/addenquiry',
              requestOptions,
            )
              .then(response => response.json())
              .then(result => {
                setshowLoading(false);
                console.log(result);

                if (result.data[0].status == 200) {
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                  });
                  alert('Enquiry Sent');
                  navigation.navigate('Home');
                  dispatch(setNull());
                }
              })
              .catch(error => {
                setshowLoading(false);
              });
          });
      });
    });
  };

  const setVerifyOTP = async () => {
    try {
      AsyncStorage.getItem('user').then(mobile => {
        AsyncStorage.getItem('userToken').then(value => {
          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');
          myHeaders.append('Authorization', 'Bearer ' + value);

          var raw = JSON.stringify({
            bookid: bookingData?.bookid,
            OTP: code,
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
          };
          console.log('requ============ : ', requestOptions);
          fetch(
            'https://trucktaxi.co.in/api/customer/verifyTripOTP',
            requestOptions,
          )
            .then(response => response.json())
            .then(result => {
              console.log('Sucess Verify OTP resp ----:', result);
              // if (result.status == 200) {
              //     setshowLoading(true)
              //     alert('Booking Successful')
              //     navigation.reset({
              //         index: 0,
              //         routes: [{ name: 'My Bookings' }]
              //     })
              // }
              // else {
              //     alert('Invalid OTP')
              // }

              if (result?.status == 200) {
                setshowLoading(false);
                ToastAndroid.show(result?.message, ToastAndroid.SHORT);
                setBookingOTPVisible(false);
                navigation.reset({
                  index: 0,
                  routes: [{name: 'New Booking'}],
                });
                // navigation.replace('New Booking');
              } else {
                ToastAndroid.show(result?.message, ToastAndroid.SHORT);
                setshowLoading(false);
              }
            })
            .catch(error => console.log('error', error));
        });
      });
    } catch (error) {
      console.log('catch in Verify_OTP_Api :', error);
    }
  };

  if (showLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} ref={mapView} loadingEnabled>
        <MapViewDirections
          origin={initorigin}
          destination={initdrop}
          apikey="AIzaSyAGbxLrxGIFLkfaGze-660NY6RrITMkeR0"
          strokeWidth={4}
          strokeColor="#3500c2"
          onReady={result => {
            setduration(Math.floor(result.duration));
            mapView.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: getPixelSize(50),
                left: getPixelSize(50),
                top: getPixelSize(150),
                bottom: getPixelSize(350),
              },
            });
          }}
        />
        <Marker coordinate={initdrop} anchor={{x: 0, y: 0}}>
          <LocationBox>
            <LocationText>Destination</LocationText>
          </LocationBox>
        </Marker>

        <Marker coordinate={initorigin} anchor={{x: 0, y: 0}}>
          <LocationBox>
            <LocationTimeBox>
              <LocationTimeText>{duration}</LocationTimeText>
              <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
            </LocationTimeBox>
            <LocationText>ETA</LocationText>
          </LocationBox>
        </Marker>
      </MapView>

      <ScrollView>
        <View style={[styles.footer]}>
          <Text>Location Details</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconviewcomponent
                Icontag={'Fontisto'}
                iconname={'map-marker-alt'}
                icon_size={22}
                icon_color={Color.primary}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  paddingStart: 10,
                }}>
                Pickup :
              </Text>
            </View>
            <Text
              style={{
                width: '70%',
                textAlign: 'left',
                fontSize: 16,
                color: Color.black,
                fontFamily: Manrope.Bold,
              }}
              numberOfLines={2}>
              {pickadd.description}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconviewcomponent
                Icontag={'Fontisto'}
                iconname={'map-marker-alt'}
                icon_size={22}
                icon_color={Color.primary}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  paddingStart: 10,
                }}>
                Drop :
              </Text>
            </View>
            <Text
              style={{
                width: '70%',
                textAlign: 'left',
                fontSize: 16,
                color: Color.black,
                fontFamily: Manrope.Bold,
              }}
              numberOfLines={2}>
              {pickdrop.description}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 30,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.lightBlack,
                fontFamily: Manrope.SemiBold,
                marginRight: 10,
              }}>
              Pickup Time
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Manrope.Bold,
                marginLeft: 20,
              }}>
              {' '}
              {datetosend} - {time}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.lightBlack,
                fontFamily: Manrope.SemiBold,
                marginRight: 10,
              }}>
              Trip Type
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Manrope.Bold,
                marginLeft: 20,
              }}>
              {tripValue}{' '}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.lightBlack,
                fontFamily: Manrope.SemiBold,
                marginRight: 10,
              }}>
              Approximate Fare
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Manrope.Bold,
                marginLeft: 20,
              }}>
              Rs {total}{' '}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  getquote();
                }}>
                <LinearGradient
                  colors={['#85388d', '#85388d']}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Enquiry
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  ConfirmBooking();
                }}>
                <LinearGradient
                  colors={['#85388d', '#85388d']}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Book
                  </Text>
                </LinearGradient>
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
                  paddingVertical: 20,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 16,
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                  }}>
                  Enter Your Booking OTP
                </Text>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingPreview;

const styles = StyleSheet.create({
  map: {
    height: '38%',
  },
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    // justifyContent: 'flex-end',
    paddingHorizontal: 0,
    paddingBottom: 2,
  },
  confirm: {
    color: Color.white,
    fontSize: 16,
    textAlign: 'center',
  },
  timestamp: {marginTop: 2},

  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '25%',
  },
  marker: {
    height: 48,
    width: 48,
  },
  divd: {
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    width: Dimensions.get('window').width,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  region: {
    color: '#000000',
    lineHeight: 20,
    margin: 20,
  },
  text_header: {
    color: '#DB3239',
    fontWeight: 'normal',
    alignContent: 'center',
    textAlign: 'left',
    fontSize: 18,
    marginBottom: 0,
  },

  locationtext: {
    color: '#000000',
    fontSize: 14,
  },
  text_footer: {
    color: '#fff',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
  },
  signIn: {
    width: 180,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#DB3239',
    borderColor: '#DB3239',
  },
  textSign: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  podetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0.5,
    marginTop: 10,
  },
  nextfoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  billdea: {
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
  },
});
