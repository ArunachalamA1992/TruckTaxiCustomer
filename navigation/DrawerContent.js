import React, {
  Component,
  useContext,
  useState,
  useEffect,
  Fragment,
} from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Share from 'react-native-share';
import { StackActions } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../context/context';
import { Iconviewcomponent } from '../Global/Icontag';
import Color from '../Global/Color';
import { Manrope } from '../Global/FontFamily';

export function DrawerContent(props) {

  const paperTheme = useTheme();

  const { signOut, toggleTheme } = React.useContext(AuthContext);
  const [showLoading, setshowLoading] = useState(false);
  const [profile, setprofile] = useState([]);


  const onShare = async () => {
    const shareOptions = {
      message:
        'Download Truck Taxi Application at playstore'

      // urls: [files.image1, files.image2]
    };

    try {
      // const ShareResponse = await Share.open(shareOptions);
      Linking.openURL("https://play.google.com/store/search?q=truck%20taxi&c=apps&hl=en-IN");

      const result = await Share.open({
        title: 'Truck Taxi',
        message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/search?q=truck%20taxi&c=apps&hl=en-IN',
        // url: 'https://play.google.com/store/search?q=truck%20taxi&c=apps&hl=en-IN'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(" If ============= :", result);
          // shared with activity type of result.activityType
        } else {
          console.log(" Else ============= :", result);
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log(" Dismiss ============= :", result);
      }

    } catch (error) {
      console.log("catch in on_share : ", error);
    }
  };


  useEffect(() => {
    AsyncStorage.getItem('user').then(mobile => {
      AsyncStorage.getItem('userToken').then(value => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + value);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch("https://trucktaxi.co.in/api/customer/getprofiledetails?mobileno=" + mobile, requestOptions)
          .then(response => response.json())
          .then(result => {
            setprofile(result.data[0])

          })
          .catch(error => console.log('error', error));

      })
    })
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => { props.navigation.navigate('profileScreen') }}
                style={{ paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'user-circle'}
                  icon_size={80}
                  iconstyle={{ color: Color.white }}
                />
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'chevron-forward'}
                  icon_size={24}
                  iconstyle={{ color: Color.white }}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
                <Title style={styles.title}>{profile.customername}</Title>
                <Caption style={styles.caption}>{profile.mobileno}</Caption>
              </View>
            </View>
          </View>

          {/* <Drawer.Section style={styles.drawerSection}> */}
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="receipt-outline"
                color={'#85388d'}
                size={size}
              />
            )}
            label="Book Now"
            onPress={() => {
              props.navigation.navigate('New Booking')
            }}
          />
          <View style={{ width: '100%', height: 1, backgroundColor: Color.softGrey, marginVertical: 5 }}></View>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="notifications"
                color={'#85388d'}
                size={size}
              />
            )}
            label="Notifications"
            onPress={() => { props.navigation.navigate('notification') }}
          />
          <View style={{ width: '100%', height: 1, backgroundColor: Color.softGrey, marginVertical: 5 }}></View>
          <DrawerItem
            icon={({ color, size }) => (
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'open-book'}
                icon_size={24}
                iconstyle={{ color: Color.primary }}
              />
            )}
            label="My Bookings"
            onPress={() => {
              props.navigation.navigate('My Bookings')
            }}
          />
          <View style={{ width: '100%', height: 1, backgroundColor: Color.softGrey, marginVertical: 5 }}></View>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="chatbubble-ellipses-outline"
                color={'#85388d'}
                size={size}
              />
            )}
            label="Chat"
            onPress={() => { props.navigation.navigate('chat') }}
          />
          <View style={{ width: '100%', height: 1, backgroundColor: Color.softGrey, marginVertical: 5 }}></View>
          <DrawerItem
            icon={({ color, size }) => (
              <Iconviewcomponent
                Icontag={'MaterialIcons'}
                iconname={'support-agent'}
                icon_size={24}
                iconstyle={{ color: Color.primary }}
              />
            )}
            label="Contact"
            onPress={() => { props.navigation.navigate('contact') }}
          />
          <View style={{ width: '100%', height: 1, backgroundColor: Color.softGrey, marginVertical: 5 }}></View>
          <DrawerItem
            icon={({ color, size }) => (
              <Iconviewcomponent
                Icontag={'MaterialIcons'}
                iconname={'support-agent'}
                icon_size={24}
                iconstyle={{ color: Color.primary }}
              />
            )}
            label="Privacy Policy"
            onPress={() => { props.navigation.navigate('PrivacyandConditions') }}
          />
          <View style={{ width: '100%', height: 1, backgroundColor: Color.softGrey, marginVertical: 5 }}></View>
          <DrawerItem
            icon={({ color, size }) => (
              <Iconviewcomponent
                Icontag={'MaterialIcons'}
                iconname={'support-agent'}
                icon_size={24}
                iconstyle={{ color: Color.primary }}
              />
            )}
            label="Terms and Conditions"
            onPress={() => { props.navigation.navigate('TermsandConditions') }}
          />
          <View style={{ width: '100%', height: 1, backgroundColor: Color.softGrey, marginVertical: 5 }}></View>
          < DrawerItem
            icon={({ color, size }) => (
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'sharealt'}
                icon_size={24}
                iconstyle={{ color: Color.primary }}
              />
            )}
            label="Share"
            onPress={() => { onShare() }}
          />
          <View style={{ width: '100%', height: 1, backgroundColor: Color.softGrey, marginVertical: 10 }}></View>
          {/* </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      {/* <Drawer.Section style={styles.bottomDrawerSection}> */}
      <View style={{ width: '100%', height: 5, backgroundColor: '#f4f4f4', marginVertical: 10 }}></View>
      <DrawerItem
        icon={({ color, size }) => (
          <Icon
            name="exit-outline"
            color={'#85388d'}
            size={size}
          />
        )}
        label="Sign Out"
        onPress={() => { signOut() }}
      />
      {/* </Drawer.Section> */}
    </View >
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 10, backgroundColor: Color.primary, paddingVertical: 20
  },
  title: {
    fontSize: 18, color: Color.white, fontFamily: Manrope.Bold, marginTop: 10
  },
  caption: {
    fontSize: 16, color: Color.white, fontFamily: Manrope.Medium, paddingVertical: 10
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 5
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});