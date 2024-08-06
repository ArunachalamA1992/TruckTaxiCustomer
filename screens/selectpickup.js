import React, {
    Component,
    useRef,
    useState,
    useEffect,
    Fragment,
} from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ToastAndroid,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { useTheme } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Layout, RadioGroup, Radio } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';
Geocoder.init('AIzaSyAGbxLrxGIFLkfaGze-660NY6RrITMkeR0');
import { P, H5, H4, H2, H6, H3 } from '../components/typography';
import Search from "../screens/Search";
import { useDispatch, useSelector } from 'react-redux';
import {
    selectDestination,
    selectOrigin,
    setTravelTimeInformation,
} from '../slices/navSlice';
import { setOrigin, setDestination } from '../slices/navSlice';
import { Iconviewcomponent } from '../Global/Icontag';
import Color from '../Global/Color';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import Autocomplete from 'react-native-autocomplete-input';
import AsyncStorage from '@react-native-async-storage/async-storage';



const PickupPointScreen = ({ navigation }) => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const [region, setregion] = useState(null);
    const [text, setText] = React.useState('');
    const { colors } = useTheme();
    const [detectedaddress, setdetectedaddress] = React.useState('');
    const [pincodeslist, setpincodeslist] = useState([]);
    const [selectedoneIndex, setselectedoneIndex] = React.useState();
    const [showlabel, setshowlabel] = useState(false);
    const [description, setdescription] = useState('Address');
    const [validator, setvalidator] = useState('null');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    // console.log('selectedLocation', selectedLocation)
    const [locationdata, setlocationdata] = useState([]);
    const [selectedValue, setSelectedValue] = useState({});
    const [placeHolder, setplaceHolder] = useState('');

    const [address, setaddress] = React.useState({
        name: '',
        email: '',
        enteredadd: '',
        pincode: '',
        landmark: '',
        type: '',
    });

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });

        // Geolocation.getCurrentPosition((pos) => {
        //     const crd = pos.coords;
        //     setLatitude(crd.latitude)
        //     setLongitude(crd.longitude)
        // }, (err) => {
        //     console.log("=========", err);
        // });
        // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + "AIzaSyAOl88J2TyN1uxEENd8sjtYNq8Xa2nW4rk")
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //          console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson.results[0].formatted_address));
        //         dispatch(
        //             setOrigin({
        //                 location: {
        //                     lat: latitude,
        //                     lng: longitude
        //                 },
        //                 description: responseJson.results[0].formatted_address,
        //             }),
        //         );
        //          setSelectedLocation("drop")
        //     })


    });


    useEffect(() => {
        setvalidator('null')
        if (!origin) {
            setdescription('Pickup Location')
            return
        };
        setvalidator('true')
        setdescription(origin.description)
        setregion({
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
        });

    }, [origin]);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const response = await Geocoder.from({ latitude, longitude });
                setdetectedaddress(response.results[0].formatted_address);
                setregion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0143,
                    longitudeDelta: 0.0134,
                });

                dispatch(
                    setOrigin({
                        location: {
                            lat: latitude,
                            lng: longitude
                        },
                        description: response.results[0].formatted_address,
                    }),
                );
            },
            () => { },
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            },
        );
    }, [origin]);



    const updateregion = async region => {
        setregion(region);
        const response = await Geocoder.from(region.latitude, region.longitude);
        setdetectedaddress(response.results[0].formatted_address);
    };


    const handleLocationSelected = (data, { geometry }) => {
        const {
            location: { lat: latitude, lng: longitude }
        } = geometry;

        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text
            }
        });
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
                            let searchdata = []
                            console.log(result)
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


                })
            })

        } else {
            // If the query is null then return blank
            setlocationdata([]);
        }
    };

    const setdata = (item) => {
        if (item.place_id == undefined) {
            console.log('Known')
            if (selectedLocation == 'pickup' || selectedLocation == "") {
                setplaceHolder('Search Pickup Location')
            } else {
                setplaceHolder("Search Drop Location")
            }

            if (selectedLocation == 'pickup' || selectedLocation == "") {
                dispatch(
                    setOrigin({
                        location: {
                            lat: parseFloat(item.Latitude),
                            lng: parseFloat(item.Longitude)
                        },
                        description: item.PlaceName,
                    }),
                );
                setSelectedLocation('drop')
                setlocationdata([])
            } else {
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
        }
        else {
            if (selectedLocation == 'pickup' || selectedLocation == "") {
                setplaceHolder('Search Pickup Location')
            } else {
                setplaceHolder("Search Drop Location")
            }

            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch("https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAGbxLrxGIFLkfaGze-660NY6RrITMkeR0&place_id=" + item.place_id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (selectedLocation == 'pickup' || selectedLocation == "") {
                        setplaceHolder('Search Pickup Location')
                        dispatch(
                            setOrigin({
                                location: {
                                    lat: result.result.geometry.location.lat,
                                    lng: result.result.geometry.location.lng
                                },
                                description: item.PlaceName,
                            }),
                        );
                        setSelectedLocation('drop')
                    } else {
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
                    }
                    setlocationdata([])

                })
                .catch(error => console.log('error', error));
        }
    };

    const extractLocationDetails = description => {
        const parts = description.split(', ');
        return parts.slice(-4, -1).join(', ');
    };

    // console.log("description   ===== " + description + "       " + destination?.description);
    async function confirmLocation() {
        try {
            if (description != '' && destination?.description != undefined) {
                navigation.navigate('Home', {
                    locations: {
                        pickup: {
                            position: origin,
                            Description: extractLocationDetails(description),
                        },
                        // drop: {
                        //     position: Destination,
                        //     Description: extractLocationDetails(dropDescription),
                        // },
                        // distance: distance,
                    },
                })

            } else {
                ToastAndroid.show('Pleas Enter Pick and Drop Location is Mandatory', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log('catch in confirm_Location :', error);
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 11.017332578915008,
                        longitude: 76.95571819207129,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={region}
                    ref={mapRef}
                    loadingEnabled
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={true}>

                </MapView>

                <View style={styles.markerFixed}>
                    <Image style={styles.marker}
                        source={require('../assets/images/locpin.png')} />
                </View>

                <ScrollView>
                    <View style={[styles.footer]}>
                        <View>
                            <View style={styles.autocompleteView}>
                                <Autocomplete
                                    autoCapitalize="none"
                                    clearButtonMode={"always"}
                                    keyboardType={"ascii-capable"}
                                    style={{
                                        width: '100%', backgroundColor: Color.white,
                                        borderWidth: selectedLocation != '' ? 2 : 1,
                                        borderColor: selectedLocation != '' ? Color.Green : 'black',
                                        borderRadius: 10,
                                        height: 50,
                                        color: "#000",
                                        paddingHorizontal: 5
                                    }}
                                    autoCorrect={false}
                                    containerStyle={styles.autocompleteContainer}
                                    listStyle={{ maxHeight: 200 }}
                                    data={locationdata}
                                    inputContainerStyle={styles.inputContainer}
                                    listContainerStyle={styles.listcontainer}
                                    onChangeText={(text) => searchLocation(text)}
                                    placeholder={selectedLocation == 'pickup' || selectedLocation == "" ? "Search Pickup Location" : "Search Drop Location"
                                    }
                                    placeholderTextColor={'#000'}
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
                            <View style={[styles.inputContainer1, { marginTop: 65 }]}>
                                <TouchableOpacity
                                    style={styles.inputContainer2}
                                    onPress={() => {
                                        setSelectedLocation('pickup');
                                    }}
                                >
                                    <View style={styles.inputContainer3}>
                                        <Icon
                                            name="location-dot"
                                            size={25}
                                            color={Color.Green}
                                        />
                                        <View>
                                            <Text
                                                style={[
                                                    styles.locationText,
                                                    origin?.description && { color: Color.Green },
                                                ]}>
                                                Pickup Location
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.location,
                                                    origin?.description && { color: Color.Green },
                                                ]}>
                                                {origin?.description}
                                            </Text>
                                        </View>
                                    </View>
                                    {origin?.description ? (
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
                                    }}
                                >
                                    <View style={styles.inputContainer3}>
                                        <Icon
                                            name="location-arrow"
                                            size={25}
                                            color={Color.Green}
                                        />
                                        <View>
                                            <Text
                                                style={[
                                                    styles.locationText,
                                                    destination?.description && { color: Color.Green },
                                                ]}>
                                                Drop Location
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.location,
                                                    destination?.description && { color: Color.Green },
                                                ]}>
                                                {destination?.description}
                                            </Text>
                                        </View>
                                    </View>
                                    {destination?.description ? (
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

                            <View>
                                <TouchableOpacity onPress={() => confirmLocation()}
                                // onPress={() => {
                                //     navigation.navigate('Home')
                                // }}
                                >
                                    <LinearGradient
                                        colors={['#85388d', '#85388d']}
                                        style={styles.signIn}>
                                        <Text style={{ color: '#fff' }}>Confirm Location</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default PickupPointScreen;

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    map: {
        height: '65%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    rad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    radio: {
        margin: 2,
    },
    controlContainer: {
        borderRadius: 4,
        margin: 2,
        padding: 6,
        backgroundColor: '#3366FF',
    },
    header: {
        flex: 3,
        justifyContent: 'flex-end',
        paddingHorizontal: 0,
        paddingBottom: 20,
    },

    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '34%',
    },
    marker: {
        height: 48,
        width: 48, resizeMode: 'contain'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    autocompleteView: {
        position: 'absolute',
        // right: 20,
        // top: height * 0.05,
        width: width * 0.9,
        zIndex: 999,
    },
    region: {
        color: '#000000',
        lineHeight: 20,
        margin: 20,
    },
    text_header: {
        color: '#000000',
        fontWeight: 'normal',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 15,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        marginBottom: 3,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
        padding: 30,
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 0,
        bottom: 0,
        padding: 10,
    },
    signIn: {
        width: Dimensions.get('window').width - 40,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        borderRadius: 45,
    },
    textSign: {
        fontSize: 18,
        padding: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    inputContainer1: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 6,
    },
    inputContainer2: {
        flexDirection: 'row',
        overflow: 'hidden',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: width * 0.02,
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

    inputContainer: {
        borderColor: '#eee',
    },
    listcontainer: {
        borderColor: '#fff',

    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderColor: '#eee',
        borderRadius: 15,
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
