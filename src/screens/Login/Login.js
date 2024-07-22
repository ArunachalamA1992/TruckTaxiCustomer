import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Colors from '../../components/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import OTPTextInput from 'react-native-otp-textinput';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import {getHash, startOtpListener, useOtpVerify} from 'react-native-otp-verify';
import {login} from '../../storage/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Manrope} from '../../Global/FontFamily';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [invalidNo, setInvalidNo] = useState(false);
  const [load, setLoad] = useState(false);
  const [OTP, setOTP] = useState('');
  let otpInput = useRef(null);

  const handleLogin = async () => {
    const formattedNo = '+91' + mobileNumber;
    if (mobileNumber.length == 10) {
      setLoad(true);
      setInvalidNo(false);

      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({mobileno: formattedNo}),
        redirect: 'follow',
      };

      await fetch(
        'https://trucktaxi.co.in/api/customer/signup',
        requestOptions,
      ).then(response => {
        setLoad(false);
        if (response.status == 200) {
          setModalVisible(true);
        } else {
          Snackbar.show({
            text: 'Failed to send OTP',
            duration: Snackbar.LENGTH_SHORT,
            textColor: Colors.white,
            backgroundColor: Colors.primaryColor,
            fontWeight: 600,
          });
        }
      });
    } else {
      setInvalidNo(true);
    }
  };

  const verifyOTP = async () => {
    const formattedNo = '+91' + mobileNumber;
    try {
      requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileno: formattedNo,
          OTP: OTP,
        }),
      };
      const response = await fetch(
        'https://trucktaxi.co.in/api/customer/verifyOTP',
        requestOptions,
      );
      const result = await response.json();
      console.log('Verify ================ : ', result);
      if (response.status === 200) {
        AsyncStorage.setItem('userToken', JSON.stringify(result.token));
        if (result.newuser == true) {
          Snackbar.show({
            text: 'Logged In',
            duration: Snackbar.LENGTH_SHORT,
            textColor: Colors.white,
            backgroundColor: Colors.black,
          });
          navigation.navigate('Register', {
            mobileNumber: mobileNumber,
            token: result.token,
          });
          setModalVisible(false);
        } else {
          navigation.navigate('BookaPickup', {locations: {}});
          setModalVisible(false);
        }
        dispatch(
          login({
            token: result.token,
            mobileNumber: mobileNumber,
          }),
        );
      } else {
        Snackbar.show({
          text: 'Invalid OTP',
          duration: Snackbar.LENGTH_SHORT,
          textColor: Colors.red,
          backgroundColor: Colors.black,
        });
      }
    } catch (error) {
      console.log('catch in verify_OTP :', error);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={load}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modal}>
          <View style={styles.load}>
            <ActivityIndicator size="large" color={Colors.white} />
          </View>
        </View>
      </Modal>
      <Image
        style={styles.image}
        source={require('../../asset/image/Login.png')}
      />
      <View style={styles.headerView}>
        <Text style={styles.header}>Verify Your Phone Number</Text>
        <Text style={styles.text}>Please enter your phone number</Text>
      </View>
      <View style={styles.inputView}>
        {invalidNo && <Text style={styles.error}>Enter a valid Number</Text>}
        <TextInput
          style={styles.input}
          placeholder="Enter your valid mobile number"
          placeholderTextColor={Colors.shadow}
          keyboardType="phone-pad"
          maxLength={10}
          onChangeText={text => setMobileNumber(text)}
          onEndEditing={() => handleLogin()}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttontxt}>Get OTP</Text>
          <Icon name="arrow-circle-right" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <Fontisto name="unlocked" size={80} color={Colors.primaryColor} />
            <Text style={styles.verifyHeader}>Verification Code</Text>
            <Text style={styles.verifyText}>Please enter OTP</Text>
            <Text style={styles.verifyText}>sent to {mobileNumber}</Text>
            <OTPTextInput
              tintColor={Colors.primaryColor}
              autoFocus={true}
              ref={e => (otpInput = e)}
              handleTextChange={text => setOTP(text)}></OTPTextInput>
            <TouchableOpacity
              onPress={() => verifyOTP()}
              style={{
                width: '80%',
                height: 45,
                backgroundColor: Colors.primaryColor,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Text style={styles.verify}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.resendOTP}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    gap: height * 0.038,
  },
  image: {
    width: width * 0.8,
    height: height * 0.26,
    resizeMode: 'contain',
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: Colors.primaryColor,
    fontSize: 20,
    fontFamily: Manrope.Bold,
    letterSpacing: 0.5,
  },
  text: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: Manrope.SemiBold,
    letterSpacing: 0.5,
    paddingVertical: 5,
  },
  inputView: {
    width: width * 0.85,
    gap: height * 0.02,
  },
  input: {
    fontSize: 16,
    color: Colors.black,
    borderWidth: 1,
    borderWidthColor: Colors.black,
    borderRadius: width * 0.01,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.014,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.015,
    borderRadius: width * 0.01,
    gap: width * 0.04,
    marginVertical: 10,
  },
  buttontxt: {
    color: Colors.white,
    alignSelf: 'center',
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  error: {
    color: Colors.red,
    fontSize: 12,
  },

  ////////////////
  modal: {
    flex: 1,
    backgroundColor: Colors.black3,
  },
  modalView: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.04,
    marginHorizontal: width * 0.12,
    marginTop: height * 0.2,
    borderRadius: width * 0.02,
  },
  verifyHeader: {
    color: Colors.primaryColor,
    fontSize: 20,
    fontFamily: Manrope.Bold,
    fontWeight: '800',
    marginTop: 20,
  },
  verifyText: {
    color: Colors.black2,
    paddingVertical: 2,
    fontSize: 14,
    fontFamily: Manrope.SemiBold,
  },
  verify: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Manrope.Bold,
  },
  resendOTP: {
    fontSize: 16,
    color: Colors.primaryColor,
    fontFamily: Manrope.Bold,
  },
  load: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
