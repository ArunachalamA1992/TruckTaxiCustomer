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
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import Color from '../../Global/Color';
import { Iconviewcomponent } from '../../Global/Icontag';
import { Manrope } from '../../Global/FontFamily';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MapScreen = () => {
  const navigation = useNavigation();
  const autocompleteRef = useRef(null);
  const [location, setLocation] = useState();
  const [origin, setOrigin] = useState({ latitude: 11.0168, longitude: 76.9558 });
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
  const [selectedLocation, setSelectedLocation] = useState('');
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
  console.log('location', location, description);
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
      if (selectedLocation == "pickup") {
        setSelectedLocation('drop')
      }
    } else {
      Snackbar.show({
        text: 'Pick the Location',
        duration: Snackbar.LENGTH_SHORT,
        textColor: Color.red,
        backgroundColor: Color.black,
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
        textColor: Color.red,
        backgroundColor: Color.black,
      });
    }
  };

  const extractLocationDetails = description => {
    const parts = description.split(', ');
    return parts.slice(-4, -1).join(', ');
  };
  // console.log('selectedLocation', selectedLocation);
  async function confirmLocation() {
    try {
      if (pickupDescription != '' && dropDescription != '') {
        navigation.navigate('Home', {
          locations: {
            pickup: {
              position: origin,
              Description: extractLocationDetails(pickupDescription),
            },
            drop: {
              position: Destination,
              Description: extractLocationDetails(dropDescription),
            },
            distance: distance,
          },
        })

      } else {
        ToastAndroid.show('Pleas Enter Pick and Drop Location is Mandatory', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('catch in confirm_Location :', error);
    }
  }

  // const handleRegionChange = origin => {
  //   console.log("---------------- : ", origin);
  // };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const apiKey = 'AIzaSyAOl88J2TyN1uxEENd8sjtYNq8Xa2nW4rk'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const { results } = response.data;
      if (results.length > 0) {
        console.log("RESULTS ============= : ", results[0].formatted_address);
        setDescription(results[0].formatted_address)
        // setAddress(results[0].formatted_address);
      } else {
        setDescription('Address not found');
      }
    } catch (error) {
      console.error(error);
      setAddress('Error fetching address');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <View style={[styles.container, { paddingBottom: keyboardHeight }]}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={newPosition}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          // onRegionChangeComplete={handleRegionChange()}
        >
          <Marker
            draggable
            coordinate={origin}
            onDragEnd={(e) => {
              console.log("start ======== ",e.nativeEvent.coordinate)
              getAddressFromCoordinates(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)

            }}
            title={'I am here'}
            description={'This is my Pickup location'}
            pinColor={Color.primary}
          />
          <Marker
            draggable
            coordinate={Destination}
            onDragEnd={(e) => { console.log('dragEnd', e.nativeEvent.coordinate) }}
            title={'I am here'}
            description={'This is my Drop location'}
            pinColor={Color.primary}
          />
          {destinationSelected && (
            <MapViewDirections
              origin={origin}
              destination={Destination}
              apikey={'AIzaSyAOl88J2TyN1uxEENd8sjtYNq8Xa2nW4rk'}
              strokeWidth={10}
              strokeColor={Color.litePrimaryBg2}
              onReady={result => {
                setDistance(result.distance);
                setDuration(result.duration);
              }}
            />
          )}
        </MapView>
        <View style={styles.inputContainer}>
          <Text style={styles.headerText}>
            {selectedLocation == 'pickup' || selectedLocation == ""
              ? 'Enter Pickup Location'
              : 'Enter Drop Location'}
          </Text>
          <View style={styles.autocompleteView}>
            <GooglePlacesAutocomplete
              ref={autocompleteRef}
              styles={{
                container: {
                  flex: 1,
                },
                textInputContainer: {
                  backgroundColor: Color.white,
                  borderWidth: selectedLocation != '' ? 2 : 1,
                  borderColor:
                    selectedLocation != '' ? Color.Green : 'black',
                  borderRadius: 6,
                },
                textInput: {
                  height: 40,
                  color: Color.black,
                  fontSize: 16,
                  backgroundColor: Color.white,
                },
                description: {
                  fontWeight: 'bold',
                  color: Color.black,
                },
                predefinedPlacesDescription: {
                  color: Color.black,
                },
                poweredContainer: {
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderColor: Color.Green,
                  borderTopWidth: 0.5,
                },
              }}
              textInputProps={{
                placeholderTextColor: Color.black3,
              }}
              placeholder="Search......"
              predefinedPlacesAlwaysVisible={true}
              fetchDetails={true}
              query={{
                key: 'AIzaSyAOl88J2TyN1uxEENd8sjtYNq8Xa2nW4rk',
                language: 'en',
                components: 'country:In',
                location: '11.0168,76.9558',
                radius: 800,
              }}
              renderRightButton={() => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: Color.primary,
                      borderRadius: 5,
                      padding: 10, paddingHorizontal: 20,
                      marginLeft: 10,
                    }}
                    onPress={() => {
                      selectedLocation == 'pickup' || selectedLocation == ""
                        ? selectPickup()
                        : selectDrop()
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.white,
                        fontFamily: Manrope.Bold,
                      }}>
                      Done
                    </Text>
                  </TouchableOpacity>
                );
              }}
              onPress={(data, details) => {
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
            <TouchableOpacity
              style={styles.inputContainer2}
              onPress={() => {
                setSelectedLocation('pickup');
              }}>
              <View style={styles.inputContainer3}>
                <Icon
                  name="location-dot"
                  size={25}
                  color={originSelected ? Color.Green : Color.red}
                />
                <View>
                  <Text
                    style={[
                      styles.locationText,
                      originSelected && { color: Color.Green },
                    ]}>
                    Pickup Location
                  </Text>
                  <Text
                    style={[
                      styles.location,
                      originSelected && { color: Color.Green },
                    ]}>
                    {pickupDescription}
                  </Text>
                </View>
              </View>
              {originSelected ? (
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'checkmark-circle'}
                  icon_size={20}
                  icon_color={Color.primary}
                />
              ) : (
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  iconname={'search1'}
                  icon_size={20}
                  icon_color={Color.cloudyGrey}
                />
              )}
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              style={styles.inputContainer2}
              onPress={() => {
                setSelectedLocation('drop');
              }}>
              <View style={styles.inputContainer3}>
                <Icon
                  name="location-arrow"
                  size={25}
                  color={destinationSelected ? Color.Green : Color.red}
                />
                <View>
                  <Text
                    style={[
                      styles.locationText,
                      destinationSelected && { color: Color.Green },
                    ]}>
                    Drop Location
                  </Text>
                  <Text
                    style={[
                      styles.location,
                      destinationSelected && { color: Color.Green },
                    ]}>
                    {dropDescription}
                  </Text>
                </View>
              </View>
              {destinationSelected ? (
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'checkmark-circle'}
                  icon_size={20}
                  icon_color={Color.primary}
                />
              ) : (
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  iconname={'search1'}
                  icon_size={20}
                  icon_color={Color.cloudyGrey}
                />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.next}
            onPress={() => confirmLocation()}>
            {/* // onPress={() => navigation.goBack()}> */}
            <Text style={styles.nextText}>Confirm Location</Text>
            <Icon2 name="arrow-circle-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MapScreen;

const { width, height } = Dimensions.get('screen');

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
    backgroundColor: Color.white,
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.0,
  },
  headerText: {
    color: Color.black,
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
  ///////////
  DDView: {
    marginTop: height * 0.03,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: width * 0.1,
  },
  DDText: {
    fontSize: 14,
    color: Color.black,
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
    color: Color.red,
  },
  location: {
    width: width * 0.5,
    color: 'red',
    fontWeight: 'bold',
  },
  select: {
    fontSize: 12,
    color: Color.red,
    fontWeight: 'bold',
  },
  line: {
    marginVertical: height * 0.002,
    borderBottomColor: '#cccccc', // Adjust the color as needed
    borderBottomWidth: 1,
    width: '100%', // Adjust the width as needed
  },
  next: {
    backgroundColor: Color.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 5, height: 50,
    marginVertical: 10,
    borderRadius: 5,
  },
  nextText: {
    fontSize: 16,
    color: Color.white,
  },
});
