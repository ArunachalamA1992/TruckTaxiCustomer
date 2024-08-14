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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from '../slices/navSlice';
import {P, H5, H4, H2, H6, H3} from '../components/typography';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';
import Color from '../Global/Color';
import {Manrope} from '../Global/FontFamily';
import moment from 'moment';

const OfferScreen = ({navigation, route}) => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  const {selectedvehcilelist} = route.params;
  const {tripValue} = route.params;
  const {goodValue} = route.params;
  const {Packagevalue} = route.params;
  const {nightFareType} = route.params;
  const {datetosend} = route.params;
  const {time} = route.params;
  const {tripcount} = route.params;
  const {tripTypeid} = route.params;
  const {packageid} = route.params;
  const {interID} = route.params;
  const {nightID} = route.params;
  const {alternativemobno} = route.params;

  const [showLoading, setshowLoading] = useState(false);
  const [amount, setamount] = useState('');
  const [peakfare, setpeakfare] = useState('');
  const [couponcodevalue, setcouponcodevalue] = useState('');
  const [couponapplied, setcouponapplied] = useState(false);
  const [couponid, setcouponid] = useState(false);
  const [couponcode, setcouponcode] = useState('');
  const [total, settotal] = useState('');

  const [interfare, setinterfare] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: <Text>Booking Information</Text>,
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <FontAwesome
            style={{padding: 10}}
            onPress={() => {
              home();
            }}
            name="home"
            size={25}
            backgroundColor="#ffffff"
            color="#85388d"
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    console.log(origin);
    console.log(destination);

    reload();
  }, [
    tripValue,
    Packagevalue,
    selectedvehcilelist,
    tripcount,
    datetosend,
    origin,
    destination,
    nightFareType,
  ]);

  // React.useEffect(() => {

  //     const unsubscribe = navigation.addListener("focus", () => {
  //         console.log("Navigation : " + tripValue)
  //         reload();
  //     });
  //     return unsubscribe;
  // }, [navigation]);

  const handleremove = () => {
    Snackbar.show({
      text: 'Coupon Removed',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#DB3239',
    });
    setcouponcode('Enter Coupon Code');
    setcouponapplied(false);
  };

  const reload = () => {
    setshowLoading(true);
    AsyncStorage.getItem('userdata').then(userdata => {
      AsyncStorage.getItem('userToken').then(value => {
        let parseddata = JSON.parse(userdata);
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + value);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        fetch(
          'https://trucktaxi.co.in/api/customer/getdistance?fromlat=' +
            origin.location.lat +
            '&fromlong=' +
            origin.location.lng +
            '&tolat=' +
            destination.location.lat +
            '&tolong=' +
            destination.location.lng,
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            setshowLoading(false);
            var distance = parseFloat(result.data[0].distance);

            if (tripValue == 'Meter Fare') {
              console.log('Meter Fare');

              fetch(
                'https://trucktaxi.co.in/api/customer/getmeterfare?distance=' +
                  distance +
                  '&cityid=' +
                  parseddata.cityid +
                  '&vehicleid=' +
                  selectedvehcilelist.id,
                requestOptions,
              )
                .then(response => response.json())
                .then(meterfare => {
                  console.log(meterfare);

                  var charge = parseFloat(meterfare.data[0].approximatefare);
                  setamount(charge);
                  fetch(
                    'https://trucktaxi.co.in/api/customer/getadditionalfare?pickuptime=' +
                      time +
                      '&fare=' +
                      charge,
                    requestOptions,
                  )
                    .then(response => response.json())
                    .then(additionafate => {
                      var addtionalcharges =
                        parseFloat(additionafate.approxmatefare) -
                        parseFloat(charge);
                      var total = addtionalcharges + parseFloat(charge);
                      settotal(total);
                      setpeakfare(addtionalcharges);
                    })
                    .catch(error => console.log('error', error));
                });
            } else if (tripValue == 'Package Fare') {
              console.log('Package Fare');

              var basefare = parseFloat(Packagevalue.basefare);
              var basekm = parseFloat(Packagevalue.basekm);

              fetch(
                'https://trucktaxi.co.in/api/customer/getfareforpackage?distance=' +
                  distance +
                  '&basefare=' +
                  basefare +
                  '&basekm=' +
                  basekm +
                  '&addkmcharge=18',
                requestOptions,
              )
                .then(response => response.json())
                .then(packagefare => {
                  console.log(packagefare);
                  var charge = parseFloat(packagefare.data[0].approximatefare);
                  setamount(charge);
                  fetch(
                    'https://trucktaxi.co.in/api/customer/getadditionalfare?pickuptime=' +
                      time +
                      '&fare=' +
                      charge,
                    requestOptions,
                  )
                    .then(response => response.json())
                    .then(additionafate => {
                      var addtionalcharges =
                        parseFloat(additionafate.approxmatefare) -
                        parseFloat(charge);
                      var total = addtionalcharges + parseFloat(charge);
                      settotal(total);
                      setpeakfare(addtionalcharges);
                    })
                    .catch(error => console.log('error', error));
                });
            } else if (tripValue == 'Intercity Fare') {
              fetch(
                'https://trucktaxi.co.in/api/customer/getintercitylist?vehicleid=' +
                  selectedvehcilelist.id +
                  '&cityid=' +
                  parseddata.cityid,
                requestOptions,
              )
                .then(response => response.json())
                .then(intercitylist => {
                  var distance = parseFloat(result.data[0].distance);
                  var list = [];
                  list = intercitylist.data;

                  var closest = list.reduce((a, b) => {
                    return Math.abs(b.basekm - distance) <
                      Math.abs(a.basekm - distance)
                      ? b
                      : a;
                  });
                  let intfare =
                    closest.basekm +
                    '-' +
                    closest.basefare +
                    '-' +
                    closest.baseminute;
                  setinterfare(intfare);
                  var charge = parseFloat(closest.basefare);
                  console.log('Intercity ============== :', closest.basefare);
                  setamount(charge);

                  fetch(
                    'https://trucktaxi.co.in/api/customer/getadditionalfare?pickuptime=' +
                      time +
                      '&fare=' +
                      charge,
                    requestOptions,
                  )
                    .then(response => response.json())
                    .then(additionafate => {
                      console.log(additionafate);

                      var addtionalcharges =
                        parseFloat(additionafate.approxmatefare) -
                        parseFloat(charge);
                      var total = addtionalcharges + parseFloat(charge);
                      settotal(total);
                      setpeakfare(addtionalcharges);
                      console.log(
                        'Intercity Peak============== :',
                        addtionalcharges,
                      );
                    })
                    .catch(error => console.log('error', error));
                });
            } else if (tripValue == 'Night Fare') {
              var nightbasefare = parseFloat(nightFareType.basefare);
              var nightbasekm = parseFloat(nightFareType.basekm);
              var nightAddKMCharge = parseFloat(nightFareType.AddKMCharge);
              console.log('nightFareType.basefare', nightFareType.basefare);
              console.log(
                `data`,
                selectedvehcilelist.id +
                  '&cityid=' +
                  parseddata.cityid +
                  '&distance=' +
                  destination?.distance +
                  '&basefare=' +
                  nightbasefare +
                  '&basekm=' +
                  nightbasekm +
                  '&addkmcharge=' +
                  nightAddKMCharge,
              );
              fetch(
                'https://trucktaxi.co.in/api/customer/getfarefornight?vehicleid=' +
                  selectedvehcilelist.id +
                  '&cityid=' +
                  parseddata.cityid +
                  '&distance=' +
                  destination?.distance +
                  '&basefare=' +
                  nightbasefare +
                  '&basekm=' +
                  nightbasekm +
                  '&addkmcharge=' +
                  nightAddKMCharge,
                requestOptions,
              )
                .then(response => response.json())
                .then(intercitylist => {
                  var distance = parseFloat(result.data[0].distance);
                  var list = [];
                  list = intercitylist.data;

                  var closest = list.reduce((a, b) => {
                    return Math.abs(b.basekm - distance) <
                      Math.abs(a.basekm - distance)
                      ? b
                      : a;
                  });
                  let intfare =
                    closest.basekm +
                    '-' +
                    closest.basefare +
                    '-' +
                    closest.baseminute;
                  setinterfare(intfare);
                  var charge = parseFloat(closest.basefare);
                  console.log('Intercity ============== :', closest.basefare);
                  setamount(charge);

                  fetch(
                    'https://trucktaxi.co.in/api/customer/getadditionalfare?pickuptime=' +
                      time +
                      '&fare=' +
                      charge,
                    requestOptions,
                  )
                    .then(response => response.json())
                    .then(additionafate => {
                      console.log(additionafate);

                      var addtionalcharges =
                        parseFloat(additionafate.approxmatefare) -
                        parseFloat(charge);
                      var total = addtionalcharges + parseFloat(charge);
                      settotal(total);
                      setpeakfare(addtionalcharges);
                      console.log(
                        'Intercity Peak============== :',
                        addtionalcharges,
                      );
                    })
                    .catch(error => console.log('error', error));
                });
            }
          })
          .catch(error => {
            setshowLoading(false);
          });
      });
    });
  };

  const home = () => {
    navigation.navigate('Home');
  };

  const handleValidUser = val => {
    setcouponcode(val);
  };

  if (showLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const booknow = () => {
    navigation.navigate('bookpreview', {
      selectedvehcilelist: selectedvehcilelist,
      tripValue: tripValue,
      goodValue: goodValue,
      packageid: packageid,
      interID: interID,
      nightID: nightID,
      Packagevalue: Packagevalue,
      time: time,
      interfare: interfare,
      datetosend: datetosend,
      tripTypeid: tripTypeid,
      tripcount: tripcount,
      peakfare: peakfare,
      total: total,
      alternativemobno: alternativemobno,
      nightFareType: nightFareType,
    });
  };

  const couponhandle = () => {
    if (couponcode == '' || couponcode == undefined || couponcode == null) {
      Snackbar.show({
        text: 'Enter Valid Coupon Code',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#DB3239',
      });
    } else {
      AsyncStorage.getItem('userdata').then(userdata => {
        AsyncStorage.getItem('userToken').then(value => {
          let parseddata = JSON.parse(userdata);
          var myHeaders = new Headers();
          myHeaders.append('Authorization', 'Bearer ' + value);
          myHeaders.append('Content-Type', 'application/json');

          console.log(parseFloat(parseddata.customerid));

          var raw = JSON.stringify({
            id: parseFloat(parseddata.customerid),
            fare: amount,
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
          };

          fetch(
            'https://trucktaxi.co.in/api/customer/applyCoupon',
            requestOptions,
          )
            .then(response => response.json())
            .then(result => {
              console.log('Coupon resp============:', result);
              Snackbar.show({
                text: 'Coupon Code Applied',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: '#DB3239',
              });
            })
            .catch(error => {
              Snackbar.show({
                text: 'Invalid Coupon',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: '#DB3239',
              });
            });
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.boxone}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
              {/* <Text style={{ marginLeft: 20, }}> {moment(datetosend + ' ' + time).format('DD-MM-YYYY hh:mm a')}</Text> */}
            </View>
            <View
              style={{
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
                Regular Charges
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Manrope.Bold,
                  marginLeft: 20,
                }}>
                Rs {amount}
              </Text>
            </View>
            <View
              style={{
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
                Peak Time Fare
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Manrope.Bold,
                  marginLeft: 20,
                }}>
                Rs {peakfare}
              </Text>
            </View>
            <View
              style={{
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
                Rs {total}
              </Text>
            </View>
          </View>

          <View style={styles.boxone}>
            {couponapplied ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 10,
                }}>
                <View>
                  <View style={styles.actioncheckou}>
                    <H3>{couponcode}</H3>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      handleremove();
                    }}>
                    <H5
                      style={{
                        fontSize: 14,
                        color: '#DB3239',
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginTop: 10,
                      }}>
                      Remove
                    </H5>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 10,
                  marginTop: 10,
                  marginRight: 10,
                }}>
                <View style={{backgroundColor: '#fff'}}>
                  <View style={styles.action}>
                    <TextInput
                      placeholder="Enter Coupon Code"
                      placeholderTextColor="#666666"
                      style={[styles.textInput]}
                      autoCapitalize="none"
                      onChangeText={val => handleValidUser(val)}
                      onEndEditing={e => handleValidUser(e.nativeEvent.text)}
                    />
                  </View>
                </View>
                <View>
                  <Button
                    style={{backgroundColor: '#85388d', borderColor: '#DB3239'}}
                    onPress={() => {
                      couponhandle();
                    }}>
                    <Text style={{color: '#fff'}}>Apply</Text>
                  </Button>
                </View>
              </View>
            )}
          </View>

          <View
            style={{
              flex: 1,
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{width: '100%', alignItems: 'center', marginVertical: 30}}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Color.primary,
                  borderRadius: 10,
                }}
                onPress={() => {
                  booknow();
                }}>
                {/* <LinearGradient
                                    colors={["#85388d", "#85388d"]}
                                    style={styles.signIn}
                                > */}
                <Text style={{fontSize: 16, color: Color.white}}>Continue</Text>
                {/* </LinearGradient> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OfferScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  action: {
    flexDirection: 'row',
    borderWidth: 1,
    width: '90%',
    height: 46,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxone: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
    margin: 10,
  },
  nextfoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0.5,
    paddingHorizontal: 16,
  },
  text: {
    marginTop: 5,
    marginLeft: 24,
  },
  textInput: {
    fontSize: 14,
    paddingLeft: 10,
    color: '#05375a',
  },
  signIn: {
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#DB3239',
    borderColor: '#DB3239',
  },
});
