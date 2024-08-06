import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet, LogBox } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { AuthContext } from './context/context';
import { DrawerContent } from './navigation/DrawerContent';
import RootStackScreen from './navigation/RootStackScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import WalletScreen from './screens/walletScreen';
import BookingScreen from './screens/bookingsScreen';
import ReferScreen from './screens/referScreen';
//import MapviewScreen from './screens/mapviewScreen';
//import PriceScreen from './screens/priceScreen';
import PickupPointScreen from './screens/selectpickup';
import DestinationPointScreen from './screens/selectdestination';

import { Provider } from 'react-redux';
import { store } from './store';
import ProfileScreen from './screens/profileScreen';
import BookingPreview from './screens/bookingPreview';
import verifyBookingOtp from './screens/verifyBookingOtpscreen';
import TrackDrive from './screens/trackScreen';
import ChatScreen from './screens/chatScreen';
import OfferScreen from './screens/offerandcontact';
import CancellScreen from './screens/cancelscreen';
import ReviewScreen from './screens/reviewscreen';
import NotificationScreen from './screens/notification';
import messaging from '@react-native-firebase/messaging';
import ContactScreen from './screens/contactScreen';

import { createStackNavigator } from '@react-navigation/stack';
import Map from './screens/Map/MapScreen';
import PrivacyandConditions from './screens/PrivacyandConditions';
import TermsandConditions from './screens/TermsandConditions';
import MapScreen from './screens/Map/MapScreen';
import BookingSummary from './screens/BookingSummary';

LogBox.ignoreAllLogs();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  Alert.alert(JSON.stringify(remoteMessage));
});

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [cart, setCart] = useState([]);
  const [location, setlocation] = useState([]);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    address: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#eee',
      text: '#000000',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#eee',
      text: '#000000',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SELECTLOCATION':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async res => {
        console.log(res);
        const userToken = String(res.token);

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) { }

        dispatch({ type: 'LOGIN', token: userToken });
      },
      signOut: () => {
        AsyncStorage.removeItem('userToken');
        dispatch({ type: 'LOGOUT' });
      },
      signUp: async res => {
        const userToken = String(res.user.uid);
        const userName = res.user.email;

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) { }

        dispatch({ type: 'REGISTER', id: userName, token: userToken });
      },
      toggleTheme: () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
      },
    }),
    [],
  );
  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) { }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });

      const value = await AsyncStorage.getItem('location');
      var location = JSON.parse(value);
      setlocation(location);
    }, 1000);
  }, [location]);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  function bookingScreen() {
    return (
      <Stack.Navigator initialRouteName="bookings">
        <Stack.Screen
          name="bookings"
          component={BookingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="cancel"
          component={CancellScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="review"
          component={ReviewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="track"
          component={TrackDrive}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function homeScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookingSummary"
          component={BookingSummary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="offer"
          component={OfferScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="bookpreview"
          component={BookingPreview}
          options={{ headerShown: false, unmountOnBlur: true }}
        />
        <Stack.Screen
          name="bookingotp"
          component={verifyBookingOtp}
          options={{ headerShown: false, unmountOnBlur: true }}
        />
      </Stack.Navigator>
    );
  }

  if (loginState.isLoading) {
    return <View />;
  }
  return (
    <Provider store={store}>
      <PaperProvider theme={theme} style={styles.backcolor}>
        <AuthContext.Provider value={authContext}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <NavigationContainer theme={theme}>
              <StatusBar backgroundColor="#fff" barStyle="dark-content" />

              {loginState.userToken !== null ? (
                <Drawer.Navigator
                  drawerContent={props => <DrawerContent {...props} />}>
                  <Drawer.Screen
                    name="New Booking"
                    component={homeScreen}
                    options={{ headerShown: true }}
                  />
                  <Drawer.Screen name="wallet" component={WalletScreen} />
                  <Drawer.Screen
                    name="My Bookings"
                    component={bookingScreen}
                    options={{ unmountOnBlur: true }}
                  />
                  <Drawer.Screen name="MapScreen" component={MapScreen} />
                  <Drawer.Screen name="referandearn" component={ReferScreen} />
                  <Drawer.Screen
                    name="pickupoint"
                    component={PickupPointScreen}
                  />
                  <Drawer.Screen
                    name="destinationpoint"
                    component={DestinationPointScreen}
                  />
                  <Drawer.Screen
                    name="profileScreen"
                    component={ProfileScreen}
                  />
                  <Drawer.Screen name="chat" component={ChatScreen} />
                  <Drawer.Screen
                    name="notification"
                    component={NotificationScreen}
                  />
                  <Drawer.Screen name="contact" component={ContactScreen} />
                  <Drawer.Screen name="PrivacyandConditions" component={PrivacyandConditions} />
                  <Drawer.Screen name="TermsandConditions" component={TermsandConditions} />
                </Drawer.Navigator>
              ) : (
                <RootStackScreen />
              )}
            </NavigationContainer>
          </ApplicationProvider>
        </AuthContext.Provider>
      </PaperProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  backcolor: {
    backgroundColor: '#E5E5E5',
  },
  lottie: {
    height: 300,
    width: 300,
  },
});
