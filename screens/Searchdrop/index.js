import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../../slices/navSlice';
import Geolocation from 'react-native-geolocation-service';
navigator.geolocation = require('react-native-geolocation-service');
import Autocomplete from 'react-native-autocomplete-input';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = () => {

  const dispatch = useDispatch();
  const gInput = useRef(null);
  const [locationdata, setlocationdata] = useState([]);
  const [selectedValue, setSelectedValue] = useState({});
  const [placeHolder, setplaceHolder] = useState('Search For Drop Location');


  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Truck Taxi',
          message: 'Allow us you use your location.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };





  const searchLocation = (query) => {
    // Method called every time when we change the value of the input
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, 'i');

      AsyncStorage.getItem('userdata').then(userdata => {
        AsyncStorage.getItem('userToken').then(value => {

          let parseddata = JSON.parse(userdata);
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer " + value);

          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

          fetch("https://trucktaxi.co.in/api/customer/searchlocation?cityid=" + parseddata.cityid + "&placeName=" + query, requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log(result)
              let searchdata = []
              searchdata = result.data;
              let code = result.status
              if (code == 200) {
                searchdata = searchdata.splice(0, 10)
                setlocationdata(searchdata)
              }
              else {
                console.log('Not Found')

                var requestOptions = {
                  method: 'POST',
                  redirect: 'follow'
                };

                fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + query + "&types=geocode&key=AIzaSyAGbxLrxGIFLkfaGze-660NY6RrITMkeR0", requestOptions)
                  .then(response => response.json())
                  .then(result => {
                    console.log(result)
                    let data = []

                    let resultdata = result.predictions

                    for (var i = 0; i < resultdata.length; i++) {

                      data.push({
                        PlaceName: resultdata[i].description,
                        place_id: resultdata[i].place_id
                      })
                    }

                    setlocationdata(data)

                    console.log(data)

                  })
                  .catch(error => console.log('error', error));


              }


            })
            .catch(error => console.log('error', error));

          console.log(query)

        })
      })

    } else {
      // If the query is null then return blank
      setlocationdata([]);
    }
  };



  const setdata = (item) => {
    console.log(item)
    if (item.place_id == undefined) {
      setplaceHolder('Search Drop Location')

      dispatch(
        setDestination({
          location: {
            lat: parseFloat(item.Latitude),
            lng: parseFloat(item.Longitude)
          },
          description: item.PlaceName,
        }),
      );

      setlocationdata([])
    }
    else {
      setplaceHolder('Search Drop Location')

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAGbxLrxGIFLkfaGze-660NY6RrITMkeR0&place_id=" + item.place_id, requestOptions)
        .then(response => response.json())
        .then(result => {
          setplaceHolder('Search Drop Location')
          dispatch(
            setDestination({
              location: {
                lat: result.result.geometry.location.lat,
                lng: result.result.geometry.location.lng
              },
              description: item.PlaceName,
            }),
          );


          setlocationdata([])

        })
        .catch(error => console.log('error', error));

    }


  };








  return (
    <View style={styles.container}>
      <Autocomplete
        autoCapitalize="none"
        clearButtonMode={"always"}

        keyboardType={"ascii-capable"}
        style={{
          height: 40,
          color: "#000"

        }}
        autoCorrect={false}
        containerStyle={styles.autocompleteContainer}
        placeholderTextColor={'#000'}
        listStyle={{ maxHeight: 200 }}
        data={locationdata}
        inputContainerStyle={styles.inputContainer}
        listContainerStyle={styles.listcontainer}
        onChangeText={(text) => searchLocation(text)}
        placeholder={placeHolder}
        flatListProps={{

          keyExtractor: (item, i) => i.toString(),
          renderItem: ({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setdata(item);
              }}>
              <Text style={styles.itemText}>

                {item.PlaceName}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />



    </View>

  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 15,
    top: Platform.select({ ios: 60, android: 10 }),
    width: "100%",
    borderColor: '#fff',
    right: 0,
    top: 0,
    zIndex: 1


  },
  inputContainer: {
    borderColor: '#eee',
    borderRadius: 15,
    paddingLeft: 5,
    paddingRight: 5,


  },
  listcontainer: {
    borderColor: '#fff',

  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    borderColor: '#eee',
    borderRadius: 15
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    color: "#000",
    paddingRight: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
