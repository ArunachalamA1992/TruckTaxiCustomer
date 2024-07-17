import React, {useEffect, useState, useReducer, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider, useSelector} from 'react-redux';
import {store} from '../storage/store';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import Home from './Home/Home';
import Map from '../components/Map';
import MyBookings from './My Bookings/MyBookings';
import Notifications from './Notifications/Notifications';
import Chat from './Chat/Chat';
import ContactUs from './Contact Us/ContactUs';
import BookingSummary from './BookingSummary/BookingSummary';
import Track from './My Bookings/components/Track';
import CustomDrawer from '../components/CustomDrawer';
import Account from './Account/Account';
import SplashScreen from './Splash/Splash';
import Login from './Login/Login';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen';
import Register from './Register/Register';
import PrivacyandConditions from './Privacy&Conditions/PrivacyandConditions';
import Colors from '../components/Colors';
import TermsandConditions from './Terms&Conditions/TermsandConditions';
import {Iconviewcomponent} from '../components/Icontag';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [isLoggedIn]);

  return (
    <Stack.Navigator>
      {loading ? (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
      ) : isLoggedIn ? (
        <>
          <Stack.Screen name="BookaPickup" component={Home} />
          <Stack.Screen
            name="MyBookings"
            component={MyBookings}
            options={({navigation, route}) => ({
              headerTitle: 'My Booking',
              headerTitleStyle: {color: Colors.black},
              headerStyle: {backgroundColor: Colors.white},
              headerLeft: () => (
                <View style={{marginHorizontal: 10}}>
                  <Icon
                    name="arrow-back"
                    size={30}
                    color={Colors.black}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Track"
            component={Track}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={({navigation, route}) => ({
              headerTitle: 'My Profile',
              headerTitleStyle: {color: Colors.white},
              headerStyle: {backgroundColor: Colors.primaryColor},
              headerLeft: () => (
                <View style={{marginHorizontal: 10}}>
                  <Icon
                    name="arrow-back"
                    size={30}
                    color={Colors.white}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ),
            })}
          />
          <Drawer.Screen
            name="Notifications"
            component={Notifications}
            options={({navigation, route}) => ({
              headerTitle: 'Notifications',
              headerTitleStyle: {color: Colors.white},
              headerStyle: {backgroundColor: Colors.primaryColor},
              headerLeft: () => (
                <View style={{marginHorizontal: 10}}>
                  <Icon
                    name="arrow-back"
                    size={30}
                    color={Colors.white}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={({navigation, route}) => ({
              headerTitle: 'Chat',
              headerTitleStyle: {color: Colors.white},
              headerStyle: {backgroundColor: Colors.primaryColor},
              headerLeft: () => (
                <View style={{marginHorizontal: 10}}>
                  <Icon
                    name="arrow-back"
                    size={30}
                    color={Colors.white}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ),
            })}
          />
          <Drawer.Screen
            name="Contact Us"
            component={ContactUs}
            options={({navigation, route}) => ({
              headerTitle: 'Contact Us',
              headerTitleStyle: {color: Colors.white},
              headerStyle: {backgroundColor: Colors.primaryColor},
              headerLeft: () => (
                <View style={{marginHorizontal: 10}}>
                  <Icon
                    name="arrow-back"
                    size={30}
                    color={Colors.white}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="BookingSummary"
            component={BookingSummary}
            options={({navigation}) => ({
              headerTitle: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'black', fontSize: 18, marginRight: 10}}>
                    Book a Pickup
                  </Text>
                  <Iconviewcomponent
                    Icontag={'FontAwesome5'}
                    iconname={'truck'}
                    icon_size={20}
                    iconstyle={{color: Colors.black, marginRight: 10}}
                  />
                </View>
              ),
            })}
          />
          <Drawer.Screen
            name="PrivacyandConditions"
            component={PrivacyandConditions}
            options={({navigation, route}) => ({
              headerTitle: 'Privacy Policy',
              headerTitleStyle: {color: Colors.white},
              headerStyle: {backgroundColor: Colors.primaryColor},
              headerLeft: () => (
                <View style={{marginHorizontal: 10}}>
                  <Icon
                    name="arrow-back"
                    size={30}
                    color={Colors.white}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ),
            })}
          />
          <Drawer.Screen
            name="TermsandConditions"
            component={TermsandConditions}
            options={({navigation, route}) => ({
              headerTitle: 'Terms and Conditions',
              headerTitleStyle: {color: Colors.white},
              headerStyle: {backgroundColor: Colors.primaryColor},
              headerLeft: () => (
                <View style={{marginHorizontal: 10}}>
                  <Icon
                    name="arrow-back"
                    size={30}
                    color={Colors.white}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BookaPickup"
            component={Home}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const AppDrawer = () => (
  <NavigationContainer>
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={AppNavigation}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
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
      default:
        return prevState;
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async res => {
        const userToken = String(res.token);
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.error(e);
        }
        dispatch({type: 'LOGIN', token: userToken});
      },
      signOut: () => {
        AsyncStorage.removeItem('userToken');
        dispatch({type: 'LOGOUT'});
      },
      signUp: async res => {
        const userToken = String(res.user.uid);
        const userName = res.user.email;
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.error(e);
        }
        dispatch({type: 'REGISTER', id: userName, token: userToken});
      },
    }),
    [],
  );

  useEffect(() => {
    const fetchToken = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    };

    fetchToken();
  }, []);

  if (loginState.isLoading) {
    return <View />;
  }

  return (
    <Provider store={store}>
      <AppDrawer />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
