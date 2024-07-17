import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Colors from './Colors';
import Snackbar from 'react-native-snackbar';

const Map = () => {
  const navigation = useNavigation();
  const autocompleteRef = useRef(null);
  const [location, setLocation] = useState();
  const [origin, setOrigin] = useState({latitude: 11.0168, longitude: 76.9558});
  const [Destination, setDestination] = useState({
    latitude: 10.9579614,
    longitude: 76.95407449999999,
  });
  const [newPosition, setNewPosition] = useState({
    latitude: origin.latitude,
    longitude: origin.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [originSelected, setOriginSelected] = useState(false);
  const [destinationSelected, setDestinationSelected] = useState(false);
  const [description, setDescription] = useState('');
  const [pickupDescription, setPickupDescription] = useState('');
  const [dropDescription, setDropDescription] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    const onKeyboardDidShow = e => {
      setKeyboardHeight(e.endCoordinates.height - 200);
      // console.log(e.endCoordinates.height + 50);
    };

    const onKeyboardDidHide = () => {
      setKeyboardHeight(0);
    };

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        console.log('Location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      setNewPosition({
        latitude: info?.coords?.latitude ?? 0,
        longitude: info?.coords?.longitude ?? 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    });
  };

  const selectPickup = () => {
    if (location) {
      setOrigin(location);
      setOriginSelected(true);
      setPickupDescription(description);
      setNewPosition({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      //clear the TextInput
      if (autocompleteRef.current) {
        autocompleteRef.current.setAddressText('');
      }
    } else {
      Snackbar.show({
        text: 'Pick the Location',
        duration: Snackbar.LENGTH_SHORT,
        textColor: Colors.red,
        backgroundColor: Colors.black,
      });
    }
  };

  const selectDrop = () => {
    if (location) {
      setDestination(location);
      setDestinationSelected(true);
      setDropDescription(description);
      setNewPosition({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      //clear the TextInput
      if (autocompleteRef.current) {
        autocompleteRef.current.setAddressText('');
      }
    } else {
      Snackbar.show({
        text: 'Pick the Location',
        duration: Snackbar.LENGTH_SHORT,
        textColor: Colors.red,
        backgroundColor: Colors.black,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <View style={[styles.container, {paddingBottom: keyboardHeight}]}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={newPosition}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}>
          <Marker
            draggable
            coordinate={origin}
            title={'I am here'}
            description={'This is my current location'}
          />
          <Marker
            draggable
            coordinate={Destination}
            title={'I am here'}
            description={'This is my current location'}
          />
          {destinationSelected && (
            <MapViewDirections
              origin={origin}
              destination={Destination}
              apikey={'AIzaSyAOl88J2TyN1uxEENd8sjtYNq8Xa2nW4rk'}
              strokeWidth={10}
              strokeColor={Colors.litePrimaryBg2}
              onReady={result => {
                setDistance(result.distance);
                setDuration(result.duration);
                console.log(
                  'distance:',
                  result.distance,
                  'duration:',
                  Math.ceil(result.duration),
                );
              }}
            />
          )}
        </MapView>
        <View style={styles.inputContainer}>
          <Text style={styles.headerText}>Pickup & drop Location</Text>
          <View style={styles.autocompleteView}>
            <GooglePlacesAutocomplete
              ref={autocompleteRef}
              styles={styles.autocomplete}
              textInputProps={{
                placeholderTextColor: Colors.black3, // Example color
              }}
              placeholder="Search......"
              predefinedPlacesAlwaysVisible={true}
              fetchDetails={true}
              query={{
                key: 'AIzaSyAOl88J2TyN1uxEENd8sjtYNq8Xa2nW4rk',
                language: 'en',
                components: 'country:In',
                location: '11.0168,76.9558', // Latitude and longitude for Coimbatore
                radius: 800, // radius around Coimbatore
              }}
              onPress={(data, details) => {
                console.log(
                  data.description,
                  details.geometry.location,
                  '===========',
                  details.formatted_address,
                );
                const newLoc = {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                };
                setLocation(newLoc);
                setDescription(data.description);
              }}
            />
          </View>
          <View style={styles.DDView}>
            <Text style={styles.DDText}>Distance: {distance}</Text>
            <Text style={styles.DDText}>
              Duration: {Math.ceil(duration)} mts
            </Text>
          </View>
          <View style={styles.inputContainer1}>
            <View style={styles.inputContainer2}>
              <View style={styles.inputContainer3}>
                <Icon
                  name="location-dot"
                  size={25}
                  color={originSelected ? Colors.Green : Colors.red}
                />
                <View>
                  <Text
                    style={[
                      styles.locationText,
                      originSelected && {color: Colors.Green},
                    ]}>
                    Pickup Location
                  </Text>
                  <Text
                    style={[
                      styles.location,
                      originSelected && {color: Colors.Green},
                    ]}>
                    {pickupDescription}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={selectPickup}>
                <Text
                  style={[
                    styles.select,
                    originSelected && {color: Colors.Green},
                  ]}>
                  {originSelected ? 'selected' : 'Not selected'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={styles.inputContainer2}>
              <View style={styles.inputContainer3}>
                <Icon
                  name="location-arrow"
                  size={25}
                  color={destinationSelected ? Colors.Green : Colors.red}
                />
                <View>
                  <Text
                    style={[
                      styles.locationText,
                      destinationSelected && {color: Colors.Green},
                    ]}>
                    Drop Location
                  </Text>
                  <Text
                    style={[
                      styles.location,
                      destinationSelected && {color: Colors.Green},
                    ]}>
                    {dropDescription}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={selectDrop}>
                <Text
                  style={[
                    styles.select,
                    destinationSelected && {color: Colors.Green},
                  ]}>
                  {destinationSelected ? 'selected' : 'Not selected'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.next}
            onPress={() =>
              navigation.navigate('BookaPickup', {
                locations: {
                  pickup: {position: origin, Description: pickupDescription},
                  drop: {position: Destination, Description: dropDescription},
                  distance: distance,
                },
              })
            }>
            {/* // onPress={() => navigation.goBack()}> */}
            <Text style={styles.nextText}>Confirm Location</Text>
            <Icon2 name="arrow-circle-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Map;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  map: {
    flex: 1,
    width: width * 1,
    height: height * 0.58,
  },
  inputContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.0,
  },
  headerText: {
    color: Colors.black,
    padding: width * 0.02,
    paddingBottom: height * 0.06,
    fontWeight: 'bold',
  },
  ///////////
  autocompleteView: {
    position: 'absolute',
    right: 20,
    top: height * 0.05,
    width: width * 0.9,
    zIndex: 99,
  },
  autocomplete: {
    textInputContainer: {
      backgroundColor: Colors.white,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 6,
    },
    textInput: {
      height: 38,
      color: Colors.black,
      fontSize: 16,
      backgroundColor: Colors.white,
    },
    predefinedPlacesDescription: {
      color: Colors.black,
    },
    poweredContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderColor: Colors.Green,
      borderTopWidth: 0.5,
    },
  },
  /////////
  DDView: {
    marginTop: height * 0.03,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: width * 0.1,
  },
  DDText: {
    fontSize: 14,
    color: Colors.black,
  },
  inputContainer1: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    marginTop: height * 0.02,
    marginBottom: height * 0.002,
  },
  inputContainer2: {
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.01,
    paddingHorizontal: width * 0.05,
  },
  inputContainer3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: width * 0.08,
  },
  locationText: {
    color: Colors.red,
  },
  location: {
    width: width * 0.5,
    color: 'red',
    fontWeight: 'bold',
  },
  select: {
    fontSize: 11,
    color: Colors.red,
    fontWeight: 'bold',
  },
  line: {
    marginVertical: height * 0.002,
    borderBottomColor: '#cccccc', // Adjust the color as needed
    borderBottomWidth: 1,
    width: '100%', // Adjust the width as needed
  },
  next: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 5,
    marginVertical: 10,
    borderRadius: 5,
  },
  nextText: {
    fontSize: 16,
    color: Colors.white,
  },
});
