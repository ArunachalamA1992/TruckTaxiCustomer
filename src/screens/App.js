import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home/Home';
import Map from '../components/Map';
import MyBookings from './My Bookings/MyBookings';
import Notifications from './Notifications/Notifications';
import Chat from './Chat/Chat';
import ContactUs from './Contact Us/ContactUs';
import BookingSummary from './BookingSummary/BookingSummary';
import Track from './My Bookings/components/Track';
import Geolocation from '@react-native-community/geolocation';
import CustomDrawer from '../components/CustomDrawer';
import Account from './Account/Account';
import SplashScreen from './Splash/Splash';
import Login from './Login/Login';
import {Provider, useSelector} from 'react-redux';
import {store} from '../storage/store';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen';

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
    <NavigationContainer>
      <Stack.Navigator>
        {loading ? (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : (
          <>
            {isLoggedIn ? (
              <Stack.Screen
                name="AppDrawer"
                component={AppDrawer}
                options={{headerShown: false}}
              />
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
              /></>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Bookings = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Bookings" component={MyBookings}/>
      <Stack.Screen name="Track" component={Track}  options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator();
const AppDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Book a Pickup" component={Home} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Bookings" component={Bookings} options={{headerShown: false}}/>
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Chat" component={Chat} />
      <Drawer.Screen name="Contact Us" component={ContactUs} />
      <Drawer.Screen name="BookingSummary" component={BookingSummary} />
      {/* <Drawer.Screen
        name="Track"
        component={Track}
        options={{headerShown: false}}
      /> */}
      <Drawer.Screen
        name="Map"
        component={Map}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
