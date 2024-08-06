import React, {
    Component,
    useContext,
    useState,
    useRef,
    useEffect,
    Fragment,
} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    RefreshControl,
    FlatList,
    Dimensions,
    PermissionsAndroid,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import RNFetchBlob from 'rn-fetch-blob'
import { Picker } from '@react-native-picker/picker';

const CancellScreen = ({ navigation, route }) => {

    const [cancelreasons, setcancelreasons] = React.useState([]);
    const [SelectedLanguage, setSelectedLanguage] = useState('Customer Book tomorrow');
    const [showLoading, setshowLoading] = useState(false);

    const { id } = route.params;


    useEffect(() => {
        navigation.setOptions({
            title: (
                <Text>
                    Cancel Reason
                </Text>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>

                    <FontAwesome style={{ padding: 10 }} onPress={() => {
                        home();
                    }} name="home" size={25} backgroundColor="#ffffff"
                        color="#85388d" />

                </View>
            ),
        });
    });



    const home = () => {
        navigation.navigate('Home');
    };

    useEffect(() => {
        return () => {
            console.log('Unmounted')
        }
    }, [])


    useEffect(() => {


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
                fetch("https://trucktaxi.co.in/api/customer/getcancelreason", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setshowLoading(false)
                        setcancelreasons(result.data)
                    })
                    .catch(error => console.log('error', error));

            })
        })

    }, []);

    const cancel = () => {
        console.log('Clicked')
        setshowLoading(true)
        AsyncStorage.getItem('user').then(mobile => {
            AsyncStorage.getItem('userToken').then(value => {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + value);
                myHeaders.append("Content-Type", "application/json");
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                fetch("https://trucktaxi.co.in/api/customer/getprofiledetails?mobileno=" + mobile, requestOptions)
                    .then(response => response.json())
                    .then(result => {

                        var uid = result.data[0].customerid
                        var cityidid = result.data[0].cityid

                        var raw = JSON.stringify({
                            "bookid": id,
                            "reason": SelectedLanguage,
                            "customerid": uid
                        });
                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };

                        fetch("https://trucktaxi.co.in/api/customer/cancelbooking", requestOptions)
                            .then(response => response.json())
                            .then(result => {
                                console.log(result)

                                setshowLoading(false)
                                navigation.goBack();
                                alert('Booking Cancelled')


                            }
                            )
                            .catch(error => {
                                setshowLoading(false)

                            });
                    })






            })
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
            <View style={{ marginBottom: 20 }}>
                <View style={{ backgroundColor: '#fff' }}>
                    <Picker
                        selectedValue={SelectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Customer Book tomorrow" value="Customer Book tomorrow" />
                        <Picker.Item label="Customer took another cab" value="Customer took another cab" />
                        <Picker.Item label="Loadman Power Shortage" value="Loadman Power Shortage" />
                        <Picker.Item label="Materials Not Ready" value="Materials Not Ready" />
                        <Picker.Item label="Over Load" value="Over Load" />
                        <Picker.Item label="Customer time change" value="customer time change" />

                    </Picker>
                </View>
            </View>


            <View style={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {
                            cancel()
                        }}
                    >
                        <LinearGradient
                            colors={["#FF0000", "#FF0000"]}
                            style={styles.signIn}
                        >
                            <Text
                                style={[
                                    styles.textSign,
                                    {
                                        color: "#fff",
                                    },
                                ]}
                            >
                                Cancel
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default CancellScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        margin: 10,
        paddignBottom: 20,

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
});
