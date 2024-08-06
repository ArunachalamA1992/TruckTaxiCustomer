import React, {
    Component,
    useContext,
    useState,
    useRef,
    useEffect,
    Fragment,
} from 'react';
import {
    Image,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getPixelSize } from './utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectDestination,
    selectOrigin,
    setTravelTimeInformation,
} from '../slices/navSlice';
import { P, H5, H4, H2, H6, H3 } from '../components/typography';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";

import {
    Back,
    LocationBox,
    LocationText,
    LocationTimeBox,
    LocationTimeText,
    LocationTimeTextSmall,
} from './Map/styles';


const TrackDrive = ({ navigation, route }) => {



    const [region, setregion] = useState({
        latitude: 12.9630208,
        longitude: 80.1898496,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
    });
    const mapView = useRef();
    const [duration, setduration] = React.useState(null);
    const [initorigin, setinitorigin] = useState(null);
    const [initdrop, setinitdrop] = useState(null);
    const [showLoading, setshowLoading] = useState(false);
    const [pickadd, setpickadd] = useState('');
    const [pickdrop, setpickdrop] = useState('');
    const [amount, setamount] = useState('');

    const { item } = route.params;

    console.log(item)

    useEffect(() => {
        navigation.setOptions({
            title: (
                <Text>
                    Track Booking
                </Text>
            ),
        });
    });

    useEffect(() => {
        reload();
    }, []);


    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            reload()
        });
        return unsubscribe;
    }, [navigation]);


    const reload = () => {


        setinitorigin({
            latitude: parseFloat(item.fromloclat),
            longitude: parseFloat(item.fromloclong),
        })
        setregion({
            latitude: parseFloat(item.fromloclat),
            longitude: parseFloat(item.fromloclong),
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
        });
        setinitdrop({
            latitude: parseFloat(item.toloclat),
            longitude: parseFloat(item.toloclong),
        })

    }



    if (showLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                ref={mapView}
                loadingEnabled>

                <MapViewDirections
                    origin={initorigin}
                    destination={initdrop}
                    apikey="AIzaSyAGbxLrxGIFLkfaGze-660NY6RrITMkeR0"
                    strokeWidth={4}
                    strokeColor="#3500c2"
                    onReady={result => {
                        setduration(Math.floor(result.duration));
                        mapView.current.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: getPixelSize(50),
                                left: getPixelSize(50),
                                top: getPixelSize(150),
                                bottom: getPixelSize(350),
                            },
                        });
                    }}
                />
                <Marker coordinate={initdrop} anchor={{ x: 0, y: 0 }}>
                    <LocationBox>
                        <LocationText>Destination</LocationText>
                    </LocationBox>
                </Marker>

                <Marker coordinate={initorigin} anchor={{ x: 0, y: 0 }}>
                    <LocationBox>
                        <LocationTimeBox>
                            <LocationTimeText>{duration}</LocationTimeText>
                            <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                        </LocationTimeBox>
                        <LocationText>ETA</LocationText>
                    </LocationBox>
                </Marker>
            </MapView>

            <ScrollView>
                <View style={[styles.footer]}>
                    <Text>Location Details</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", marginTop: 20 }}>
                        <Text style={{ marginRight: 10 }}><FontAwesome style={styles.icon} name="map-marker" color={'#828282'} size={20} />  Pickup</Text>

                        <Text style={{ width: Dimensions.get('window').width - 90 }}>{item.fromloc} </Text>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", marginTop: 20 }}>
                        <Text style={{ marginRight: 20 }}><FontAwesome style={styles.icon, { marginLeft: 15 }} name="map-marker" color={'#828282'} size={20} />  Drop</Text>

                        <Text style={{ width: Dimensions.get('window').width - 90 }}>{item.toloc} </Text>

                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: "space-between" }}>
                        <Text style={{ marginRight: 10 }}>Pickup Time</Text>
                        <Text style={{ marginLeft: 20, }}> {item.bookedtime}</Text>

                    </View>

                </View>

            </ScrollView >
        </View >
    );
};

export default TrackDrive;

const styles = StyleSheet.create({
    map: {
        height: '50%',
    },
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 0,
        paddingBottom: 2,
    },
    timestamp: { marginTop: 2 },

    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '25%',
    },
    marker: {
        height: 48,
        width: 48,
    },
    divd: {
        marginTop: 10,
        marginBottom: 10,
    },
    footer: {
        width: Dimensions.get('window').width,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 30
    },
    region: {
        color: '#000000',
        lineHeight: 20,
        margin: 20,
    },
    text_header: {
        color: '#DB3239',
        fontWeight: 'normal',
        alignContent: 'center',
        textAlign: 'left',
        fontSize: 18,
        marginBottom: 0,
    },

    locationtext: {
        color: '#000000',
        fontSize: 14,
    },
    text_footer: {
        color: '#fff',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 10,
    },
    signIn: {
        width: 140,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#DB3239',
        borderColor: '#DB3239',
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    podetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 0.5,
        marginTop: 10,
    },
    nextfoot: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    billdea: {
        borderTopWidth: 1,
        borderColor: '#E5E5E5',
    },
});
