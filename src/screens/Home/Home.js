import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState, version} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../components/Colors';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';

const Home = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.token);
  const mobileNumber = useSelector(state => state.mobileNumber);

  const [date, setDate] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [VehicleData, setVehicleData] = useState([]);
  const [goods, setGoods] = useState([]);
  const [fareList, setFareList] = useState([]);
  const [goodsName, setGoodsName] = useState(null);
  const [FareType, setFareType] = useState(null);
  const [noVehicles, setNoVehicles] = useState(null);
  const [atlerNumber, setAlterNUmber] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [locationView, setLocation] = useState(false);
  const route = useRoute();
  const locations = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: width * 0.04}}
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
        <TouchableOpacity
          style={{marginRight: width * 0.04}}
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
      getVehicleData();
      getGoodsTypes();
      getFareList();
  }, []);

  const getVehicleData = async () => {
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
    const data = result.data
    setVehicleData(data);
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
    setFareList(result.data);
    console.log('_+___+_+_+_+_+_+_+_', fareList);
  };

  // const VehicleData = [
  //   {
  //     name: 'Tata ace',
  //     weight: 500,
  //     img: require("../../asset/image/tata_ace_white_bg.png"),
  //   },
  //   {
  //     name: 'Bolero',
  //     weight: 500,
  //     img: require("../../asset/image/Bolero149.png"),
  //   },
  //   {
  //     name: '407',
  //     weight: 500,
  //     img: require("../../asset/image/407.png"),
  //   },
  //   {
  //     name: 'Eicher',
  //     weight: 500,
  //     img: require("../../asset/image/eicher-trucks-trucks.png"),
  //   },
  // ];

  // const goods = [
  //   {label: 'Carton Box', value: '1'},
  //   {label: 'Wood', value: '2'},
  //   {label: 'Steel', value: '3'},
  // ];

  // const fare = [
  //   {label: 'Item 1', value: '1'},
  //   {label: 'Item 2', value: '2'},
  //   {label: 'Item 3', value: '3'},
  //   {label: 'Item 4', value: '2'},
  //   {label: 'Item 5', value: '3'},
  //   {label: 'Item 6', value: '2'},
  //   {label: 'Item 7', value: '3'},
  // ];

  const vehicle = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
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

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Choose Your Vehicle</Text>
        <FlatList
          data={VehicleData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            const isFocused = selectedVehicle
              ? item.vehicletype == selectedVehicle.vehicletype
              : false;

            return (
              <TouchableOpacity
                activeOpacity={4}
                style={[
                  styles.vehicle,
                  isFocused
                    ? {
                        overflow: 'hidden',
                        borderWidthColor: Colors.white2,
                        borderRadius: 5,
                        padding: width * 0.01,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        shadowOpacity: 0.0,
                        shadowRadius: 1,

                        elevation: 4,
                      }
                    : null,
                ]}
                key={index}
                onPress={() => setSelectedVehicle(item)}>
                <View
                  style={[
                    isFocused
                      ? {
                          padding: width * 0.01,
                          overflow: 'hidden',
                          borderWidth: 3,
                          borderRadius: 5,
                          borderColor: Colors.primaryColor,
                        }
                      : null,
                  ]}>
                  <Image style={styles.vehicleImg} source={{uri: item.url}} />
                  <Text style={styles.vehicleName}>{item.vehicletype}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.typeView}>
          <Text style={styles.h3}>Vehicle Type: </Text>
          <Text style={styles.vehicleName}>
            {selectedVehicle ? selectedVehicle.vehicletype : 'select Vehicle'}
          </Text>
        </View>

        <View style={styles.line} />
        <View style={styles.dateView}>
          <Text style={styles.h3}>Date & Time:</Text>
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
            <Text style={styles.h3}>Pickup Location:</Text>
            <Text style={styles.h3}>Drop Location:</Text>
          </View>
          {locations ? (
            <View style={styles.locationInnerView}>
              <Text style={styles.locationText}>
                {locations.pickup.Description}pp
              </Text>
              <Text style={styles.locationText}>
                {locations.drop.Description}
              </Text>
            </View>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
              <Text style={styles.location}>Choose Location</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.line} />
        <View style={styles.dropView}>
          <View style={styles.dropView1}>
            <Text style={styles.h2}>Goods Name:</Text>
            <Text style={styles.h2}>Fare Type:</Text>
            <Text style={styles.h2}>Number of Vehicles:</Text>
          </View>
          <View>
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
              valueField="goodsname"
              placeholder="Select item"
              value={goodsName}
              onChange={item => {
                setGoodsName(item.goodsname);
                console.log(item);
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
          </View>
        </View>
        <View style={styles.numberHeader}>
          <Text style={styles.alterNumber}>Alternative Mobile Number</Text>
          <Text style={styles.optional}>(optional)</Text>
        </View>
        <View style={styles.numberView}>
          <Text style={styles.numberText}>+91-</Text>
          <TextInput
            style={styles.numberInput}
            placeholder="Alternative Mobile Number....."
            placeholderTextColor={Colors.black3}
            keyboardType="phone-pad"
            onChangeText={text => setAlterNUmber(text)}
            maxLength={10}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.next}
        onPress={() => navigation.navigate('BookingSummary')}>
        <Text style={styles.nextText}>Next</Text>
        <Icon name="arrow-circle-right" size={25} color="#fff" />
      </TouchableOpacity>
    </>
  );
};

export default Home;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.04,
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
    padding: width * 0.025,
    borderWidth: 0.2,
    borderRadius: 3,
    borderWidthColor: Colors.black2,
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
    color: Colors.black2,
    fontSize: 13,
  },
  typeView: {
    flexDirection: 'row',
    justifyContent: 'Flex-start',
    alignItems: 'center',
    gap: width * 0.06,
    marginTop: height * 0.01,
  },
  line: {
    marginVertical: height * 0.018,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    width: '100%',
  },
  h3: {
    color: Colors.black2,
    fontSize: 14,
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'Flex-start',
    alignItems: 'center',
    gap: width * 0.18,
  },
  selectDate: {
    backgroundColor: Colors.steel,
    padding: width * 0.02,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    gap: width * 0.01,
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.115,
  },
  locationTextView: {
    marginTop: height * 0.03,
    gap: height * 0.03,
  },
  location: {
    color: Colors.white,
    backgroundColor: Colors.primaryColor,
    padding: width * 0.025,
    paddingHorizontal: width * 0.085,
    borderRadius: 5,
  },
  locationInnerView: {
    marginTop: height * 0.03,
    gap: height * 0.03,
  },
  locationText: {
    width: width * 0.5,
    maxHeight: height * 0.026,
    color: Colors.black,
    overflow: 'hidden',
  },
  h2: {
    color: Colors.black2,
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
    width: width * 0.48,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropContainer: {
    color: Colors.black2,
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
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
  },
  /////
  numberHeader: {
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
    marginTop: height * 0.01,
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
});
