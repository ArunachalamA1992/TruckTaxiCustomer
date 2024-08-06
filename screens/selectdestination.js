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
import Search from "../screens/Searchdrop";
import { useDispatch, useSelector } from 'react-redux';
import {
    selectDestination,
    selectOrigin,
    setTravelTimeInformation,
} from '../slices/navSlice';
import { setOrigin, setDestination } from '../slices/navSlice';



const DestinationPointScreen = ({ navigation }) => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const dispatch = useDispatch();
    const mapRef = useRef(null);




    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    });

    const [region, setregion] = useState(null);
    const [text, setText] = React.useState('');
    const { colors } = useTheme();
    const [detectedaddress, setdetectedaddress] = React.useState('');
    const [pincodeslist, setpincodeslist] = useState([]);
    const [selectedoneIndex, setselectedoneIndex] = React.useState();
    const [showlabel, setshowlabel] = useState(false);
    const [description, setdescription] = useState('Address');
    const [validator, setvalidator] = useState('null');

    const [address, setaddress] = React.useState({
        name: '',
        email: '',
        enteredadd: '',
        pincode: '',
        landmark: '',
        type: '',
    });

    useEffect(() => {
        console.log(destination)
        setvalidator('null')
        if (!destination) {
            setdescription('Search Address')
            return
        };
        setvalidator('true')

        setdescription(destination.description)
        setregion({
            latitude: destination.location.lat,
            longitude: destination.location.lng,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
        });





        console.log(region)

    }, [destination]);

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
                    setDestination({
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
    }, [destination]);



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

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                initialRegion={{
                    latitude: 11.017332578915008,
                    longitude: 76.95571819207129,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                ref={mapRef}
                showsUserLocation={false}
                loadingEnabled></MapView>
            <Search onLocationSelected={handleLocationSelected} />

            {/* <View style={styles.markerFixed}>
                <Image
                    style={styles.marker}
                    source={require('../assets/images/locpin.png')} />

            </View> */}
            <View style={[styles.footer]}>
                <View>
                    <View>
                        <Text numberOfLines={2} style={{ borderWidth: 1, padding: 8, borderRadius: 8, borderColor: '#eee', backgroundColor: '#eee' }}>Location: {description}</Text>
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="House / Flat Number (Optional)"
                            multiline={true}
                            numberOfLines={1}
                            placeholderTextColor="#666666"
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                            ]}
                            autoCapitalize="none"
                            onChangeText={addresss => {

                            }

                            }
                        />
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Home')
                            }}>
                            <LinearGradient
                                colors={['#85388d', '#85388d']}
                                style={styles.signIn}>
                                <Text style={{ color: '#fff' }}>Save Drop Point</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default DestinationPointScreen;

const styles = StyleSheet.create({
    map: {
        height: '68%',
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
        paddingVertical: 10,
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
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 45,
    },
    textSign: {
        fontSize: 18,
        padding: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});
