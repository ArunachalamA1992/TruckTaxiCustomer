import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState, version } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../components/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectDestination, selectOrigin } from '../../Slice/navSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import { BottomSheet } from 'react-native-btr';
import { Iconviewcomponent } from '../../components/Icontag';

let scr_height = Dimensions.get('window').height;

const Home = ({ navigation, route }) => {
  const locations = route?.params?.locations;
  const token = useSelector(state => state.token);
  const mobileNumber = useSelector(state => state.mobileNumber);
  const [date, setDate] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [VehicleData, setVehicleData] = useState([]);
  const [goods, setGoods] = useState([]);
  const [fareList, setFareList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [interCityList, setIntercityList] = useState([]);
  const [nightList, setNightList] = useState([]);
  const [goodsName, setGoodsName] = useState(null);
  const [FareType, setFareType] = useState(null);
  const [noVehicles, setNoVehicles] = useState(null);
  const [atlerNumber, setAlterNUmber] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectVehicleid, setselectVehicleId] = useState('');
  const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
  const [bottomData, setBottomData] = useState('');
  const [selectGoodsName, setSelectGoodsName] = useState('Select Good Type');
  const [selectGoodsid, setSelectGoodsId] = useState('');
  const [selectFareName, setSelectFareName] = useState('Select Fare Type');
  const [selectFareid, setSelectFareId] = useState('');
  const [customerid, setCustomerid] = useState('');
  const [cityid, setCityId] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectPackage, setSelectPackage] = useState({});
  const [selectVehicle, setSelectVehicle] = useState({});
  const [vehicleTypeVisible, setVehicleTypeVisible] = useState(false);
  const [vehicleType, setVehicleType] = useState([
    {
      id: 1,
      name: 'open type',
    },
    {
      id: 1,
      name: 'closed type',
    },
  ]);

  const [selectIntercity, setSelectIntercity] = useState({});

  const [selectNight, setSelectNight] = useState({});
  const [notifyDataLength, setNotifyDataLength] = useState(0);

  useEffect(() => {
    fetchCustomerDetails();
  }, [token]);

  useEffect(() => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + token);
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      setLoading(true);
      fetch(
        'https://trucktaxi.co.in/api/customer/getnotifications?customerid=' +
        customerid,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          setNotifyDataLength(result?.data?.length), setLoading(false);
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.log('catch in use_Effect :', error);
    }
  }, []);

  const fetchCustomerDetails = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('x-access-token', 'Bearer ' + token);
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
          AsyncStorage.setItem(
            'customerID',
            JSON.stringify(result?.data?.[0]?.customerid),
          );
          AsyncStorage.setItem(
            'cityid',
            JSON.stringify(result?.data?.[0]?.cityid),
          );
          setCityId(result?.data?.[0]?.cityid);
          setCustomerid(result?.data?.[0]?.customerid);
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{}} onPress={() => navigation.toggleDrawer()}>
          <Icon name="reorder" size={25} color="#000" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}>
          <Text style={{ color: 'black', fontSize: 18, paddingLeft: 10 }}>
            Book a Pickup
          </Text>
          <Iconviewcomponent
            Icontag={'FontAwesome5'}
            iconname={'truck'}
            icon_size={20}
            iconstyle={{ color: Colors.black, marginRight: 10 }}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate('Notifications')}>
          <Text
            style={{
              position: 'absolute',
              zIndex: 1,
              top: -5,
              right: 10,
              backgroundColor: Colors.red,
              borderRadius: 100,
              padding: 2,
              color: Colors.white,
              fontSize: 12,
            }}>
            {notifyDataLength}
          </Text>
          <Icon name="bell" size={24} color={Colors.primaryColor} />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    getVehicleData();
    getGoodsTypes();
    getFareList();
  }, [token]);

  const getVehicleData = async () => {
    try {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(
        'https://trucktaxi.co.in/api/customer/getvehicletypes?cityid=CBE001',
        requestOptions,
      );
      const result = await response.json();
      const data = result.data;
      setVehicleData(data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getGoodsTypes = async () => {
    try {
      const response = await fetch(
        'https://trucktaxi.co.in/api/customer/getgoodstypes',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          redirect: 'follow',
        },
      );
      const result = await response.json();
      setGoods(result.data);
    } catch (error) {
      console.error('Error fetching goods types:', error);
    }
  };

  const getFareList = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      'https://trucktaxi.co.in/api/customer/gettriptypes',
      requestOptions,
    );
    const result = await response.json();
    // console.log("Fare id ======== : ", result.data);
    setFareList(result.data);
  };

  const vehicle = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const selectVehicleType = item => {
    try {
      setSelectedVehicle(item);
      setselectVehicleId(item.id);
    } catch (error) {
      console.log('catch in selectVehicle_Type : ', error);
    }
  };

  const nextButtonClick = () => {
    try {
      let datetosend = moment(date, 'DD/MM/YYYY hh:mm A').format('DD/MM/YYYY');
      let timetosend = moment(date, 'DD/MM/YYYY hh:mm A').format('HH:mm');

      if (
        selectVehicleid != null &&
        selectGoodsid != null &&
        selectFareid != null &&
        noVehicles != null
      ) {
        var data = {
          selectedvehcilelist: selectedVehicle,
          // tripValue: tripValue,
          fare: selectFareid,
          fareName: selectFareName,
          tripTypeid: '',
          nighttype: selectNight,
          Packagevalue: selectPackage,
          goodValue: selectGoodsName,
          intercitytype: selectIntercity,
          tripcount: 0,
          time: timetosend,
          datetosend: datetosend,
          address: locations,
          pickup: locations.pickup.Description,
          drop: locations.drop.Description,
          noVehicles: noVehicles,
        };
        navigation.navigate('BookingSummary', data);
      } else {
        ToastAndroid.show('Please fill mandatory fields', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('catch in nextButton_Click : ', error);
    }
  };

  function sale_toggleBottomView(item) {
    try {
      console.log('item', item);
      setBottomData(item);
      setSaleBottomSheetVisible(!salebottomSheetVisible);
    } catch (error) {
      console.log('Catch in Ads sale_toggleBottomView :', error);
    }
  }
  console.log('bottomData', bottomData);

  function sale_BottomSheetmenu() {
    try {
      return (
        <View>
          <BottomSheet
            visible={salebottomSheetVisible}
            onBackButtonPress={sale_toggleBottomView}
            onBackdropPress={sale_toggleBottomView}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: bottomData == 'Goods' ? 350 : 330,
                minHeight: 200,
                alignItems: 'center',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
              }}>
              <View
                style={{
                  width: '100%',
                  padding: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {bottomData == 'Goods' ? (
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.black,
                    }}>
                    Select Goods Type
                  </Text>
                ) : null}
                {bottomData == 'Fare' ? (
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.black,
                    }}>
                    Select Fare Type
                  </Text>
                ) : null}
                {bottomData == 'Package' ? (
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.black,
                    }}>
                    Select Package Type
                  </Text>
                ) : null}
                {bottomData == 'Vehicle' ? (
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.black,
                    }}>
                    Select Vehicle Type
                  </Text>
                ) : null}
                {bottomData == 'Night' ? (
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.black,
                    }}>
                    Select Night Fare Type
                  </Text>
                ) : null}

                <TouchableOpacity
                  onPress={() => setSaleBottomSheetVisible(false)}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'closecircleo'}
                    icon_size={24}
                    iconstyle={{ color: Colors.primaryColor, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '100%',
                  height: '80%',
                  alignItems: 'center',
                  backgroundColor: Colors.white,
                }}>
                {bottomData == 'Goods' ? (
                  <FlatList
                    data={goods}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{ width: '100%' }}>
                          <TouchableOpacity
                            onPress={() => selectedGoods(item, index)}
                            style={{
                              width: '100%',
                              height: 50,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor:
                                selectGoodsName === item.goodsname
                                  ? Colors.primaryColor
                                  : Colors.white,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 14,
                                color:
                                  selectGoodsName === item.goodsname
                                    ? Colors.white
                                    : Colors.black,
                                letterSpacing: 0.5,
                              }}>
                              {item.goodsname}
                            </Text>
                          </TouchableOpacity>
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: Colors.cloudyGrey,
                            }}></View>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                  />
                ) : null}

                {bottomData == 'Fare' ? (
                  <FlatList
                    data={fareList}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{ width: '100%' }}>
                          <TouchableOpacity
                            onPress={() => selectFareItem(item, index)}
                            style={{
                              width: '100%',
                              height: 50,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor:
                                selectFareName === item.name
                                  ? Colors.primaryColor
                                  : Colors.white,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 14,
                                color:
                                  selectFareName === item.name
                                    ? Colors.white
                                    : Colors.black,
                                letterSpacing: 0.5,
                              }}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: Colors.cloudyGrey,
                            }}></View>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                  />
                ) : null}

                {bottomData == 'Package' ? (
                  <FlatList
                    data={packageList}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{ width: '100%' }}>
                          <TouchableOpacity
                            onPress={() => selectPackageItem(item, index)}
                            style={{
                              width: '100%',
                              height: 50,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  color: Colors.black,
                                  padding: 3,
                                  fontWeight: '500',
                                  letterSpacing: 0.5,
                                }}>
                                {item.basefare}
                              </Text>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  color: Colors.black,
                                  letterSpacing: 0.5,
                                }}>
                                Base Fare
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  color: Colors.black,
                                  padding: 3,
                                  fontWeight: '500',
                                  letterSpacing: 0.5,
                                }}>
                                {item.package}
                              </Text>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  color: Colors.black,
                                  letterSpacing: 0.5,
                                }}>
                                Package
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  color: Colors.black,
                                  padding: 3,
                                  fontWeight: '500',
                                  letterSpacing: 0.5,
                                }}>
                                {item.basekm}
                              </Text>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  color: Colors.black,
                                  letterSpacing: 0.5,
                                }}>
                                Base km
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: Colors.cloudyGrey,
                              marginVertical: 5,
                            }}></View>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                  />
                ) : null}

                {bottomData == 'Intercity' ? (
                  <FlatList
                    data={interCityList}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{ width: '100%' }}>
                          <TouchableOpacity
                            onPress={() => selectIntercityItem(item, index)}
                            style={{
                              width: '100%',
                              height: 50,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  color: Colors.black,
                                  padding: 3,
                                  fontWeight: '500',
                                  letterSpacing: 0.5,
                                }}>
                                {item.basekm}
                              </Text>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  color: Colors.black,
                                  letterSpacing: 0.5,
                                }}>
                                Base Km
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  color: Colors.black,
                                  padding: 3,
                                  fontWeight: '500',
                                  letterSpacing: 0.5,
                                }}>
                                {item.basefare}
                              </Text>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  color: Colors.black,
                                  letterSpacing: 0.5,
                                }}>
                                Base Fare
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  color: Colors.black,
                                  padding: 3,
                                  fontWeight: '500',
                                  letterSpacing: 0.5,
                                }}>
                                {item.baseminute}
                              </Text>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  color: Colors.black,
                                  letterSpacing: 0.5,
                                }}>
                                Base Minute
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: Colors.cloudyGrey,
                              marginVertical: 5,
                            }}></View>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                  />
                ) : null}

                {bottomData == 'Night' ? (
                  <FlatList
                    data={nightList}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{ width: '100%' }}>
                          <TouchableOpacity
                            onPress={() => selectNightFareItem(item, index)}
                            style={{
                              width: '100%',
                              height: 50,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  color: Colors.black,
                                  padding: 3,
                                  fontWeight: '500',
                                  letterSpacing: 0.5,
                                }}>
                                {item.package}
                              </Text>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  color: Colors.black,
                                  letterSpacing: 0.5,
                                }}>
                                Package
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  color: Colors.black,
                                  padding: 3,
                                  fontWeight: '500',
                                  letterSpacing: 0.5,
                                }}>
                                {item.basefare}
                              </Text>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  color: Colors.black,
                                  letterSpacing: 0.5,
                                }}>
                                Base Fare
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: Colors.cloudyGrey,
                              marginVertical: 5,
                            }}></View>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                  />
                ) : null}
              </View>
            </View>
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log('catch in addImage_BottomSheet menu ', error);
    }
  }

  function selectedGoods(item, index) {
    try {
      setSelectGoodsName(item.goodsname);
      setSelectGoodsId(item.goodsid);
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  function selectPackageItem(item, index) {
    try {
      setSelectPackage(item);
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  function selectIntercityItem(item, index) {
    try {
      setSelectIntercity(item);
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  function selectNightFareItem(item, index) {
    try {
      setSelectNight(item);
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  async function selectFareItem(item, index) {
    console.log('item----------------', item.id);
    try {
      setSelectFareName(item.name);
      setSelectFareId(item.id);
      setSaleBottomSheetVisible(false);
      console.log(`item-ksxd----------`);
      // await AsyncStorage.getItem('userdata').then(async userdata => {
      //   const parseddata = JSON.parse(userdata);
      //   console.log('parseddata.cityid', parseddata.cityid);
      await AsyncStorage.getItem('userToken').then(token => {
        // console.log("parseddata", parseddata);
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${JSON.parse(token)}`);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        fetch(
          'https://trucktaxi.co.in/api/customer/getpackages?vehicleid=' +
          item.id +
          '&cityid=' +
          cityid,
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            console.log('Packge List =============:', result);
            // setshowLoading(false)
            setPackageList(result.data);
            // loadpackage()
          })
          .catch(error => console.log('error', error));

        fetch(
          'https://trucktaxi.co.in/api/customer/getintercitylist?vehicleid=' +
          item.id +
          '&cityid=' +
          cityid,
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            // console.log("Intercity List =============:", result)
            // setshowLoading(false)
            setIntercityList(result.data);
            // loadpackage()
          })
          .catch(error => console.log('error', error));

        // fetch("https://trucktaxi.co.in/api/customer/getnightfare?vehicleid=" + item.id + "&cityid=" + parseddata.cityid, requestOptions)
        //   .then(response => response.json())
        //   .then(result => {
        //     console.log("Night List =============:", result)
        //     // setshowLoading(false)
        //     setNightList(result?.data)
        //     // loadpackage()
        //   })
        //   .catch(error => console.log('error', error));

        // console.log("Night =============:", item.id + "   " + parseddata.cityid)

        fetch(
          'https://trucktaxi.co.in/api/customer/getnightfare?vehicleid=1&cityid=CBE001',
          requestOptions,
        )
          .then(response => response.json())
          .then(result => setNightList(result?.data))
          .catch(error => console.error('catch in night fare:', error));
      });
      // });
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.primaryColor}
        barStyle={'light-content'}
      />
      {!loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: Colors.white,
            padding: 10,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ width: '100%', marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.black,
                  fontWeight: '500',
                }}>
                Choose Your Vehicle
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <FlatList
                data={VehicleData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  const isFocused = selectedVehicle
                    ? item.vehicletype == selectedVehicle.vehicletype
                    : false;

                  return (
                    <TouchableOpacity
                      activeOpacity={4}
                      style={{
                        ...styles.vehicle,
                        overflow: 'hidden',
                        borderColor: isFocused
                          ? Colors.primaryColor
                          : Colors.lightgrey,
                        borderWidth: isFocused ? 5 : 1,
                        borderRadius: 5,
                        padding: 10,
                      }}
                      key={index}
                      onPress={() => selectVehicleType(item)}>
                      <Image
                        style={styles.vehicleImg}
                        source={{ uri: item.url }}
                      />
                      <Text style={styles.vehicleName}>{item.vehicletype}</Text>
                      <Text style={styles.vehicleName}>
                        {item.loadcapacity}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            {selectedVehicle != null && (
              <View style={styles.typeView}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.black,
                  }}>
                  Vehicle Type:{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setVehicleTypeVisible(true);
                  }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.black,
                      paddingHorizontal: 5,
                      textTransform: 'uppercase',
                      fontWeight: '500',
                    }}>
                    {selectVehicle?.name != undefined
                      ? selectVehicle?.name
                      : 'Please Select Vehicle'}
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-down'}
                    icon_size={20}
                    iconstyle={{ color: Colors.black2, marginRight: 10 }}
                  />
                </TouchableOpacity>
                <Modal
                  visible={vehicleTypeVisible}
                  transparent
                  animationType="slide">
                  <View
                    style={{
                      backgroundColor: Colors.transparantBlack,
                      flex: 1,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: Colors.white,
                      // flex: 1,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Colors.black,
                        paddingHorizontal: 5,
                        fontWeight: '500',
                        marginVertical: 10,
                      }}>
                      Select Your Vehicle Type
                    </Text>
                    {vehicleType?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setSelectVehicle(item);
                            setVehicleTypeVisible(false);
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: Colors.black,
                              paddingHorizontal: 5,
                              fontWeight: '500',
                              textAlign: 'center',
                              textTransform: 'uppercase',
                              marginVertical: 10,
                            }}>
                            {item?.name}
                          </Text>
                          <View
                            style={{
                              height: 1,
                              backgroundColor: Colors.cloudyGrey,
                            }}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </Modal>
              </View>
            )}

            <View style={styles.line} />

            <View style={styles.dateView}>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.black,
                  letterSpacing: 0.5,
                }}>
                Date & Time *:
              </Text>
              <TouchableOpacity
                style={styles.selectDate}
                onPress={() => setOpen(true)}>
                <Icon name="calendar" size={15} color="#000" />
                {dateSelected ? (
                  <Text style={styles.h3}>
                    {date.toLocaleDateString('en-US', options).toString()}
                  </Text>
                ) : (
                  <Text style={styles.h3}>Select Date</Text>
                )}
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                  setDateSelected(true);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
            <View style={styles.locationView}>
              <View style={styles.locationTextView}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.black,
                  }}>
                  Pickup Location *:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.black,
                  }}>
                  Drop Location *:
                </Text>
              </View>
              {locations?.pickup?.Description != undefined ? (
                <View style={styles.locationInnerView}>
                  <View style={{}}>
                    <Text style={styles.locationText} numberOfLines={1}>
                      {locations?.pickup?.Description}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Map')}>
                      <Text
                        style={{
                          color: Colors.primaryColor,
                          fontSize: 14,
                          fontWeight: 'bold',
                        }}
                        numberOfLines={1}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={styles.locationText} numberOfLines={1}>
                      {locations?.drop?.Description}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Map')}>
                      <Text
                        style={{
                          color: Colors.primaryColor,
                          fontSize: 14,
                          fontWeight: 'bold',
                        }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity onPress={() => navigation.navigate('Map')} style={{ width: '50%', height: 45, backgroundColor: Colors.primaryColor, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.location}>Choose Location</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.line} />
            <View style={{ width: '95%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.black,
                    }}>
                    Goods Name *:
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => sale_toggleBottomView('Goods')}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: 45,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: Colors.white2,
                    borderWidth: 1,
                    borderColor: Colors.black,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.black,
                    }}
                    numberOfLines={1}>
                    {selectGoodsName}
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-down-circle'}
                    icon_size={24}
                    iconstyle={{ color: Colors.black, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.black,
                      letterSpacing: 0.5,
                    }}>
                    Fare Type *:
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => sale_toggleBottomView('Fare')}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: 45,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: Colors.white2,
                    borderWidth: 1,
                    borderColor: Colors.black,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.black,
                    }}
                    numberOfLines={1}>
                    {selectFareName}
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-down-circle'}
                    icon_size={24}
                    iconstyle={{ color: Colors.black, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>

              {selectFareName == 'Package Fare' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.black,
                        letterSpacing: 0.5,
                      }}>
                      Package Type *:
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => sale_toggleBottomView('Package')}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      height: 45,
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      backgroundColor: Colors.white2,
                      borderWidth: 1,
                      borderColor: Colors.black,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.black,
                        letterSpacing: 0.5,
                        paddingHorizontal: 5,
                      }}
                      numberOfLines={1}>
                      {selectPackage?.package != undefined
                        ? selectPackage?.package
                        : 'Select Package Name'}
                    </Text>
                    <Iconviewcomponent
                      Icontag={'Ionicons'}
                      iconname={'chevron-down-circle'}
                      icon_size={24}
                      iconstyle={{ color: Colors.black, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}

              {selectFareName == 'Intercity Fare' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.black,
                        letterSpacing: 0.5,
                      }}>
                      Intercity Fare *:
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => sale_toggleBottomView('Intercity')}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      height: 45,
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      backgroundColor: Colors.white2,
                      borderWidth: 1,
                      borderColor: Colors.black,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.black,
                        paddingHorizontal: 5,
                      }}
                      numberOfLines={1}>
                      {selectIntercity?.basefare != undefined
                        ? selectIntercity?.basefare
                        : 'Select InterCity Type'}
                    </Text>
                    <Iconviewcomponent
                      Icontag={'Ionicons'}
                      iconname={'chevron-down-circle'}
                      icon_size={24}
                      iconstyle={{ color: Colors.black, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}

              {selectFareName == 'Night Fare' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.black,
                        letterSpacing: 0.5,
                      }}>
                      Night Fare *:
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => sale_toggleBottomView('Night')}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      height: 45,
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      backgroundColor: Colors.white2,
                      borderWidth: 1,
                      borderColor: Colors.black,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.black,
                        letterSpacing: 0.5,
                        paddingHorizontal: 5,
                      }}
                      numberOfLines={1}>
                      {selectNight?.basefare != undefined
                        ? selectNight?.basefare
                        : 'Select Night Fare'}
                    </Text>
                    <Iconviewcomponent
                      Icontag={'Ionicons'}
                      iconname={'chevron-down-circle'}
                      icon_size={24}
                      iconstyle={{ color: Colors.black, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.black,
                      letterSpacing: 0.5,
                    }}>
                    No.of Vehicles *:
                  </Text>
                </View>
                {/* <TouchableOpacity onPress={() => sale_toggleBottomView("Vehicle")} style={{ flex: 1, flexDirection: 'row', height: 45, justifyContent: 'space-around', alignItems: 'center', backgroundColor: Colors.white2, borderWidth: 1, borderColor: Colors.black, borderRadius: 5 }}>
                  <Text style={{ fontSize: 14, color: Colors.black, letterSpacing: 0.5, paddingHorizontal: 5 }} numberOfLines={1}>Number of Vehicles</Text>
                  <Iconviewcomponent
                        Icontag={'Ionicons'}
                        iconname={'chevron-down-circle'}
                    icon_size={24}
                    iconstyle={{ color: Colors.black, marginRight: 10 }}
                  />
                </TouchableOpacity> */}
                <Dropdown
                  style={styles.dropdown}
                  containerStyle={styles.dropContainer}
                  itemTextStyle={styles.dropTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  iconColor={Colors.white}
                  data={vehicle}
                  maxHeight={200}
                  labelField="label"
                  valueField="label"
                  placeholder="Select item"
                  value={noVehicles}
                  onChange={item => {
                    setNoVehicles(item.label);
                  }}
                />
              </View>
              {/* <Text style={{ fontSize: 14, color: Colors.black, letterSpacing: 0.5 }}>Fare Type *:</Text>
              <Text style={{ fontSize: 14, color: Colors.black, letterSpacing: 0.5 }}>Number of Vehicles *:</Text> */}

              {/* <View>
                <Dropdown
                  style={styles.dropdown}
                  containerStyle={styles.dropContainer}
                  itemTextStyle={styles.dropTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  iconColor={Colors.white}
                  data={goods}
                  maxHeight={200}
                  labelField="goodsname"
                  valueField="goodsid"
                  placeholder="Select item"
                  value={goodsName}
                  onChange={item => {
                    console.log("Gooood", item);
                    setGoodsName(item.goodsid);
                  }}
                />
                <Dropdown
                  style={styles.dropdown}
                  containerStyle={styles.dropContainer}
                  itemTextStyle={styles.dropTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  iconColor={Colors.white}
                  data={fareList}
                  maxHeight={200}
                  labelField="name"
                  valueField="name"
                  placeholder="Select item"
                  value={FareType}
                  onChange={item => {
                    setFareType(item.name);
                  }}
                />

                <Dropdown
                  style={styles.dropdown}
                  containerStyle={styles.dropContainer}
                  itemTextStyle={styles.dropTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  iconColor={Colors.white}
                  data={vehicle}
                  maxHeight={200}
                  labelField="label"
                  valueField="label"
                  placeholder="Select item"
                  value={noVehicles}
                  onChange={item => {
                    setNoVehicles(item.label);
                  }}
                />
              </View> */}
            </View>
            <View style={styles.numberHeader}>
              <Text style={styles.alterNumber}>Alternative Mobile Number </Text>
              <Text style={styles.optional}>(optional)</Text>
            </View>
            <View style={styles.numberView}>
              <Text style={styles.numberText}>+91</Text>
              <TextInput
                style={styles.numberInput}
                placeholder="Alternative Mobile Number....."
                placeholderTextColor={Colors.black3}
                keyboardType="phone-pad"
                value={atlerNumber}
                onChangeText={text => setAlterNUmber(text)}
                maxLength={10}
              />
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.load}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        </View>
      )}
      <TouchableOpacity style={styles.next} onPress={() => nextButtonClick()}>
        <Text style={styles.nextText}>Next</Text>
        <Icon name="arrow-circle-right" size={25} color="#fff" />
      </TouchableOpacity>

      {sale_BottomSheetmenu()}
    </SafeAreaView>
  );
};

export default Home;

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: Colors.white,
  },
  header: {
    color: Colors.black,
    fontSize: 18,
    paddingTop: height * 0.02,
  },
  vehicle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.03,
    borderWidth: 0.2,
    borderRadius: 3,
    borderWidthColor: Colors.black,
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.03,
    overflow: 'hidden',
  },
  vehicleImg: {
    width: width * 0.23,
    height: height * 0.08,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  vehicleName: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
  },
  vehicleNo: {
    color: Colors.black,
    fontSize: 13,
  },
  typeView: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'Flex-start',
    alignItems: 'center',
    // gap: width * 0.06,
    marginTop: height * 0.01,
  },
  line: {
    marginVertical: height * 0.018,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    width: '100%',
  },
  h3: {
    color: Colors.black,
    fontSize: 14,
  },
  dateView: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'Flex-start',
    alignItems: 'center',
    gap: width * 0.18,
  },
  selectDate: {
    backgroundColor: Colors.lightgrey,
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    gap: 10,
  },
  locationView: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.115,
  },
  locationTextView: {
    marginTop: height * 0.03,
    gap: height * 0.03,
  },
  location: {
    fontSize: 16,
    color: Colors.white,
  },
  locationInnerView: {
    marginTop: height * 0.02,
    gap: height * 0.01,
  },
  locationText: {
    width: width * 0.5,
    // maxHeight: height * 0.05,
    color: Colors.black,
    gap: height * 0.03,
    overflow: 'hidden',
  },
  h2: {
    color: Colors.black,
    fontSize: 14,
  },
  //dropdown
  dropView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropView1: {
    gap: height * 0.04,
  },
  dropdown: {
    margin: height * 0.008,
    height: height * 0.05,
    width: width * 0.45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropContainer: {
    color: Colors.black,
  },
  placeholderStyle: {
    color: Colors.black3,
    fontSize: 14,
    marginLeft: width * 0.04,
  },
  dropTextStyle: {
    color: Colors.black,
  },
  selectedTextStyle: {
    color: Colors.black,
    fontSize: 16,
    marginLeft: width * 0.02,
    lineHeight: 30,
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 10,
    backgroundColor: Colors.black,
    borderRadius: 10,
  },
  /////
  numberHeader: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.02,
    gap: width * 0.01,
  },
  alterNumber: {
    color: Colors.black,
    fontSize: 15,
  },
  optional: {
    color: Colors.shadow,
  },
  numberView: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: height * 0.02,
  },
  numberText: {
    color: Colors.black,
    alignSelf: 'center',
    paddingHorizontal: width * 0.03,
    fontSize: 14,
  },
  numberInput: {
    color: Colors.black,
    width: width * 0.7,
  },
  ////
  next: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.012,
    gap: width * 0.04,
  },
  nextText: {
    fontSize: 20,
    color: Colors.white,
  },
  load: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
