import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

const SplashScreen = () => {
  const navigation = useNavigation()
  const { colors } = useTheme();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setOrigin(null),
    );
    dispatch(
      setDestination(null),
    );

  }, [])
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/logotransparent.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
        ]}
        animation="fadeInUpBig">
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignInScreen')}
          >
            <LinearGradient
              colors={['#85388d', '#85388d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>LOGIN / SIGNUP</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    textAlign: 'center',
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signIn: {
    width: 170,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
