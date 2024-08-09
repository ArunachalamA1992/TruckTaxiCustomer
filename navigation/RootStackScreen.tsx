import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../rootstackscreens/SignInScreen';
import SplashScreen from '../rootstackscreens/SplashScreen';
import ComProfileScreen from '../rootstackscreens/CompleteProfScreen';
import VerifyOtp from '../rootstackscreens/VerifyOtpscreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({}) => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="SignInScreen"
      component={SignInScreen}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="verifyOtp"
      component={VerifyOtp}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="completeprofile"
      component={ComProfileScreen}
      options={{headerShown: false}}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
