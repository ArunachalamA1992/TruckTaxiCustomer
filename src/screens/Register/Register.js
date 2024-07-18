import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import {Dropdown} from 'react-native-element-dropdown';
import Colors from '../../components/Colors';
import {useDispatch, useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import {login} from '../../storage/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {mobileNumber, token} = route.params;
  console.log(token, mobileNumber);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(mobileNumber);
  const [address, setAddress] = useState('');
  const [code, setCode] = useState('');
  const [cityCode, setCityCode] = useState([]);
  const [customerType, setCustomerType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');

  // const token = useSelector(state => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    getCityCode();
  }, []);

  const customerTypes = [
    {label: 'General', value: '1'},
    {label: 'Business', value: '2'},
  ];

  const getCityCode = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(
        'https://trucktaxi.co.in/api/customer/getbrancheslist',
        requestOptions,
      );
      const result = await response.json();
      const data = result.data;
      setCityCode(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    console.log(code);
    if (name == '' || phone == '' || address == '' || customerType == '') {
      Snackbar.show({
        text: 'Fill all the Fields',
        duration: Snackbar.LENGTH_SHORT,
        textColor: Colors.red,
        backgroundColor: Colors.black,
      });
    } else {
      const formattedNo = '+91' + phone;

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);

      const raw = JSON.stringify({
        name: name,
        mobileno: formattedNo,
        address: address,
        cityid: code,
        customertype: customerType,
        language: 'English',
        gst: gstNumber,
        companyname: companyName,
        companyaddress: companyAddress,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('https://trucktaxi.co.in/api/customer/addprofile', requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status == 200) {
            console.log('Success ========== :', result);
            ToastAndroid.show(
              'Profile Updated, Reloading App',
              ToastAndroid.SHORT,
            );
            var status = 'Old';
            AsyncStorage.setItem('newuser', status);
            refreshdata();
          } else {
          }
        })
        .catch(error => console.log('error', error));

      Snackbar.show({
        text: 'Logged In',
        duration: Snackbar.LENGTH_SHORT,
        textColor: Colors.white,
        backgroundColor: Colors.primaryColor,
      });

      dispatch(
        login({
          token: token,
          userName: name,
          mobileNumber: mobileNumber,
          profileImage: '',
          address: address,
          cityCode: code,
          companyName: companyName,
          GSTNumber: gstNumber,
          companyAddress: companyAddress,
        }),
      );
    }
  };

  const refreshdata = () => {
    AsyncStorage.getItem('userToken').then(data => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${JSON.parse(data)}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      console.log(requestOptions);
      fetch(
        'https://trucktaxi.co.in/api/customer/getprofiledetails?mobileno=+91' +
          mobileNumber,
        requestOptions,
      )
        .then(response => response.json())
        .then(async result => {
          await AsyncStorage.setItem(
            'userdata',
            JSON.stringify(result?.data?.[0]),
          );
          navigation.navigate('BookaPickup');
        })
        .catch(error => console.error(error));
    });
  };

  return (
    <ScrollView style={styles.container} keyboardDismissMode="on-drag">
      <Text style={styles.signup}>Signup</Text>
      <View style={styles.detailsView}>
        <Text style={styles.text}>Name:</Text>
        <View style={styles.inputView}>
          <Icon2 name="user" size={20} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="User Name..."
            maxLength={30}
            placeholderTextColor={Colors.black3}
            onChangeText={text => setName(text)}
          />
        </View>
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.text}>Phone no:</Text>
        <View style={styles.inputView}>
          <Icon name="phone" size={20} color="#000" />
          <Text style={styles.text}>+91</Text>
          <TextInput
            style={styles.input}
            value={mobileNumber}
            editable={false}
          />
        </View>
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.text}>Address:</Text>
        <View style={styles.inputView}>
          <Icon2 name="location" size={20} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Address..."
            placeholderTextColor={Colors.black3}
            maxLength={50}
            onChangeText={text => setAddress(text)}
          />
        </View>
      </View>
      <View style={styles.dropView}>
        <Text style={styles.text}>City Code:</Text>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropContainer}
          itemTextStyle={styles.dropTextStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          iconColor={Colors.white}
          data={cityCode}
          maxHeight={200}
          labelField="name"
          valueField="id"
          placeholder="Select Code"
          value={code}
          onChange={item => {
            setCode(item.id);
            console.log(item.id);
          }}
        />
      </View>
      <View style={styles.dropView}>
        <Text style={styles.text}>Customer Type:</Text>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropContainer}
          itemTextStyle={styles.dropTextStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          iconColor={Colors.white}
          data={customerTypes}
          maxHeight={200}
          labelField="label"
          valueField="label"
          placeholder="Select Type"
          value={customerType}
          onChange={item => {
            setCustomerType(item.label);
          }}
        />
      </View>
      {customerType == 'Business' ? (
        <View style={styles.companyContainer}>
          <View style={styles.companyTextView}>
            <Text style={styles.text}>Company Name:</Text>
            <Text style={styles.text}>GST Number:</Text>
            <Text style={styles.text}>Company Address:</Text>
          </View>
          <View style={styles.companyInputView}>
            <TextInput
              style={styles.input2}
              placeholder="Company Name..."
              placeholderTextColor={Colors.black3}
              onChangeText={text => setCompanyName(text)}
            />
            <TextInput
              style={styles.input2}
              placeholder="GST Number..."
              placeholderTextColor={Colors.black3}
              onChangeText={text => setGstNumber(text)}
            />
            <TextInput
              style={styles.input2}
              placeholder="Company Address..."
              placeholderTextColor={Colors.black3}
              onChangeText={text => setCompanyAddress(text)}
            />
          </View>
        </View>
      ) : null}
      <TouchableOpacity
        onPress={() => handleUpdate()}
        style={{paddingVertical: 15}}>
        <Text style={styles.save}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Register;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: width * 0.04,
  },
  signup: {
    fontSize: 24,
    color: Colors.black,
    fontWeight: '800',
    textAlign: 'center',
  },
  detailsView: {
    marginVertical: width * 0.02,
  },
  text: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: 16,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.02,
    marginTop: width * 0.01,
    gap: width * 0.02,
    borderWidth: 0.5,
    borderColor: Colors.black,
    borderRadius: width * 0.01,
  },
  input: {
    width: width * 0.8,
    color: Colors.black2,
    fontSize: 16,
    paddingLeft: 0,
    paddingVertical: height * 0.01,
  },
  //dropdown
  dropView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: height * 0.06,
  },
  dropdown: {
    marginVertical: 10,
    height: 40,
    width: width * 0.5,
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
    marginLeft: width * 0.04,
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 10,
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
  },
  ///
  companyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.03,
    gap: width * 0.06,
  },
  companyTextView: {
    gap: height * 0.03,
  },
  companyInputView: {
    gap: height * 0.01,
  },
  input2: {
    width: width * 0.5,
    color: Colors.black2,
    fontSize: 14,
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.01,
    borderWidth: 0.5,
    borderColor: Colors.black,
    borderRadius: width * 0.01,
  },
  save: {
    color: Colors.white,
    fontSize: 20,
    backgroundColor: Colors.primaryColor,
    alignSelf: 'center',
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.15,
    marginTop: height * 0.08,
    borderRadius: width * 0.01,
  },
});
