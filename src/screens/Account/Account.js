import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import {Dropdown} from 'react-native-element-dropdown';
import Colors from '../../components/Colors';

const Account = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState();
  const [customerType, setCustomerType] = useState();

  const codes = [
    {label: '45673', value: '1'},
    {label: '235654', value: '2'},
    {label: '34534', value: '3'},
  ];

  const customerTypes = [
    {label: 'Cartoon Box', value: '1'},
    {label: 'Wood', value: '2'},
    {label: 'Steel', value: '3'},
  ];

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
          <Text style={{color: 'black', fontSize: 18}}>Update Profile</Text>
          <Icon1 name="edit" size={20} color="#000" />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: width * 0.04}}
          onPress={() => navigation.navigate('Book a Pickup')}>
          <Icon2 name="home" size={25} color={Colors.primaryColor} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView style={styles.container} keyboardDismissMode="on-drag">
      <View style={styles.detailsView}>
        <Text style={styles.text}>Name:</Text>
        <View style={styles.inputView}>
          <Icon2 name="user" size={20} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="User Name..."
            placeholderTextColor={Colors.black3}
          />
        </View>
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.text}>Phone no:</Text>
        <View style={styles.inputView}>
          <Icon name="phone" size={20} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Phone Number..."
            placeholderTextColor={Colors.black3}
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
          data={codes}
          maxHeight={200}
          labelField="label"
          valueField="label"
          placeholder="Select Code"
          value={code}
          onChange={item => {
            setCode(item.label);
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
          />
          <TextInput
            style={styles.input2}
            placeholder="GST Number..."
            placeholderTextColor={Colors.black3}
          />
          <TextInput
            style={styles.input2}
            placeholder="Company Address..."
            placeholderTextColor={Colors.black3}
          />
        </View>
        
      </View>
      <TouchableOpacity>
        <Text style={styles.save}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Account;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: width * 0.04,
  },
  detailsView: {
    marginVertical: width * 0.02,
  },
  text: {
    color: Colors.black,
    fontWeight: '500',
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
    color: Colors.black2,
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
    height: 35,
    width: width * 0.38,
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
    justifyContent: "space-between",
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
    alignSelf: "center",
    paddingVertical: width* 0.015,
    paddingHorizontal: width* 0.15,
    marginTop: height* 0.08,
    borderRadius: width* 0.01,
  }
});
