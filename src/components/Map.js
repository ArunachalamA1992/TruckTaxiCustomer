import {
  Dimensions,
  FlatList,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Colors from './Colors';

const Map = () => {
  const navigation = useNavigation();
  const [origin, setOrigin] = useState({latitude: 11.0168, longitude: 76.9558});
  const [Destination, setDestination] = useState({
    latitude: 11.6643,
    longitude: 78.146,
  });
  const [newPosition, setNewPosition] = useState({
    latitude: 11.6643,
    longitude: 78.146,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const locations = [{id: 'autocomplete', type: 'autocomplete'}];

useEffect(() => {
  requestPermission();
}, [])


  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        console.log("Location permission denied");
        alert("Location permission denied");
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

  const renderItem = ({item}) => {
    console.log(item.type);
    if (item.type === 'autocomplete') {
      return (
        <View>
          <GooglePlacesAutocomplete
            placeholder="Search......"
            textInputProps={{
              placeholderTextColor: Colors.black2, // Example color
            }}
            predefinedPlacesAlwaysVisible={true}
            fetchDetails={true}
            query={{
              key: 'AIzaSyCHG0z-YiBV0lvFh34eAq64b4srxe5RSoM',
              language: 'en',
            }}
            styles={{
              textInputContainer: {
                backgroundColor: Colors.white,
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 6,
              },
              textInput: {
                height: 38,
                color: Colors.Green,
                fontSize: 16,
                backgroundColor: Colors.white,
              },
              predefinedPlacesDescription: {
                color: Colors.Green,
              },
              poweredContainer: {
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderColor: Colors.Green,
                borderTopWidth: 0.5,
              },
            }}
            onPress={(data, details = null) => {
              console.log(data, details);
              setNewPosition();
            }}
          />
        </View>
      );
    }
  };

  return (
    <ScrollView>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={newPosition}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}>
        <Marker
          draggable
          coordinate={newPosition}
          title={'I am here'}
          description={'This is my current location'}
        />
        <MapViewDirections
          origin={origin}
          destination={Destination}
          apikey={'AIzaSyAGbxLrxGIFLkfaGze-660NY6RrITMkeR0'}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      </MapView>
      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Pickup & drop Location</Text>
        <FlatList
          data={locations}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
        <View style={styles.inputContainer1}>
          <View style={styles.inputContainer2}>
            <View style={styles.inputContainer3}>
              <Icon name="location-dot" size={25} color={Colors.red} />
              <View>
                <Text style={styles.locationText}>Pickup Location</Text>
                <Text style={styles.location}>Gandhipuram</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => getCurrentLocation()}>
              <Text style={styles.select}>Not selected</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={styles.inputContainer2}>
            <View style={styles.inputContainer3}>
              <Icon name="location-arrow" size={25} color={Colors.red} />
              <View>
                <Text style={styles.locationText}>Drop Location</Text>
                <Text style={styles.location}>Salem</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.select}>Not selected</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.next}
        onPress={() => navigation.navigate("Book a Pickup")}>
        <Text style={styles.nextText}>Confirm Location</Text>
        <Icon2 name="arrow-circle-right" size={25} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Map;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  map: {
    width: width * 1,
    height: height * 0.58,
  },
  inputContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: Colors.white,
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.0,
  },
  headerText: {
    color: Colors.black,
    padding: width * 0.02,
    fontWeight: 'bold',
  },
  autocomplete: {
    color: Colors.black2,
    textDecorationColor: Colors.black,
  },
  inputContainer1: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    marginTop: height * 0.042,
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
    paddingVertical: height * 0.012,
    gap: width * 0.04,
    marginTop: height * 0.023,
  },
  nextText: {
    fontSize: 20,
    color: Colors.white,
  },
});
