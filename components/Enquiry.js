import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../Global/Color';

const Enquiry = ({
  visible,
  setVisible,
  cityCode,
  mobileNumber,
  userName,
  customerid,
  data,
  token,
}) => {
  const enquiry = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + token);

      const formdata = new FormData();
      formdata.append('branchid', cityCode);
      formdata.append('name', userName);
      formdata.append('fromloc', data?.pickup);
      formdata.append('toloc', data?.drop);
      formdata.append('goodstype', data?.goodValue);
      formdata.append('mobileno', mobileNumber);
      formdata.append('tripdate', data?.datetosend);
      formdata.append('triptime', data?.time);
      formdata.append('triptype', data?.fare);
      formdata.append('vechicletype', data?.selectedvehcilelist?.id);
      formdata.append('distance', data?.address?.distance);
      formdata.append(
        'fare',
        data?.fare != 1
          ? data?.fare == 2
            ? data?.Packagevalue?.basefare
            : data?.fare == 3
              ? data?.intercitytype?.basefare
              : data?.nighttype?.basefare
          : 0,
      );

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch('https://trucktaxi.co.in/api/customer/addenquiry', requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result?.data?.[0]?.status == 200) {
            setVisible(false);
            ToastAndroid.show(result?.data?.[0]?.message, ToastAndroid.SHORT);
          } else {
            ToastAndroid.show(result?.data?.[0]?.message, ToastAndroid.SHORT);
          }
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000050',
        }}>
        <Pressable
          onPress={() => {
            setVisible(false);
          }}
          style={{ flex: 1 }}
        />
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 20,
            paddingVertical: 20,
            justifyContent: 'center',
          }}>
          <Text style={styles.header}>
            Do you like to enquire this booking?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              style={{
                width: '48%',
                borderWidth: 1,
                borderColor: Color.cloudyGrey,
                borderRadius: 10,
                padding: 10,
              }}>
              <Text style={styles.enquiry}>Enquiry</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '48%',
                backgroundColor: Color.primary,
                borderRadius: 10,
                padding: 10,
              }}
              onPress={() => enquiry()}>
              <Text style={styles.confirm}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Enquiry;

const styles = StyleSheet.create({
  header: {
    color: Color.black,
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 10,
  },
  enquiry: {
    color: Color.black,
    fontSize: 14,
    textAlign: 'center',
  },
  confirm: {
    color: Color.white,
    fontSize: 14,
    textAlign: 'center',
  },
});
