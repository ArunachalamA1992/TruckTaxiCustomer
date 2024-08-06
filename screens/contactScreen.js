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
    Image,
    StyleSheet,
    RefreshControl,
    ScrollView,
    Linking,
    PermissionsAndroid,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Divider, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Color from '../Global/Color';
import { Manrope } from '../Global/FontFamily';
import { Iconviewcomponent } from '../Global/Icontag';


const ContactScreen = ({ navigation }) => {

    const [ContactData, setContactData] = useState([]);
    const [showLoading, setshowLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        navigation.setOptions({
            title: (
                <Text>
                    Contact
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
        AsyncStorage.getItem('userdata').then(userdata => {
            AsyncStorage.getItem('userToken').then(value => {
                let parseddata = JSON.parse(userdata);
                console.log(parseddata)
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + value);
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                fetch("https://trucktaxi.co.in/api/customer/getsocialnetwork", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setshowLoading(false)
                        setContactData(result.data[0])
                        console.log(result.data)
                    })
                    .catch(error => console.log('error', error));

            })
        })

    }, []);

    const renderItem = ({ item }) => {
        return (

            <View style={styles.box}>
                <Text>{item.message}</Text>
            </View>

        );
    };




    return (
        <ScrollView style={styles.container} keyboardDismissMode="on-drag">
            <View>
                <View style={{ width: '95%', alignItems: 'center' }}>
                    <Text style={{ width: '100%', paddingHorizontal: 15, paddingVertical: 20, textAlign: 'justify', fontSize: 16, fontFamily: Manrope.Medium, color: Color.black2 }}>Over the course of its journey, it has earned countless testimonials and praise-worthy reviews for its impeccable moving services from its loyal base of customers.</Text>
                    <View style={{ width: '100%', paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 16, color: Color.black3, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Address</Text>
                        <Text style={{ fontSize: 16, color: Color.black2, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 5 }}>Trucktaxi services, #122, Sarojini street, Ram nagar, Coimbatore 641009</Text>
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: 15, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black3, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Phone</Text>
                        <TouchableOpacity onPress={() => {
                            let url = ContactData.contactus
                            RNImmediatePhoneCall.immediatePhoneCall(url)
                        }}>
                            <Text style={{ fontSize: 16, color: Color.black2, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 5 }}>+91 75 4000 4000</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 16, color: Color.black3, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Email</Text>
                        <TouchableOpacity onPress={() => {
                            let url = ContactData.email
                            Linking.openURL(`mailto:${url}?subject=&body=`)
                        }}>
                            <Text style={{ fontSize: 16, color: Color.black2, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 5 }}>info@trucktaxi.in</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 15, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black3, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Website</Text>
                        <TouchableOpacity onPress={() => { Linking.openURL('https://www.trucktaxi.in') }}>
                            <Text style={{ fontSize: 16, color: Color.black2, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 5 }}>info@trucktaxi.in</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.bg}>
                    <View style={{ width: '100%', paddingHorizontal: 15, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black3, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingVertical: 10 }}>Social Media</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10 }}>
                            <TouchableOpacity onPress={() => {
                                let url = ContactData.whatsapp
                                Linking.openURL(url)
                            }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={'logo-whatsapp'}
                                    icon_size={40}
                                    icon_color={Color.green}
                                />
                                {/* <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={{ uri: "https://i.pinimg.com/564x/14/57/7d/14577debdd065507a9324ed29ec69389.jpg" }} /> */}
                                <Text>Whatsapp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                let url = ContactData.facebook
                                Linking.openURL(url)
                            }}
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={'logo-facebook'}
                                    icon_size={40}
                                    icon_color={Color.blue}
                                />
                                <Text>Facebook</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10 }}>
                            <TouchableOpacity onPress={() => {
                                let url = ContactData.instagram
                                Linking.openURL(url)
                            }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={'logo-instagram'}
                                    icon_size={40}
                                    icon_color={'#bc37c7'}
                                />
                                <Text>Instagram</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                let url = ContactData.linkedin
                                Linking.openURL(url)
                            }}
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={'logo-linkedin'}
                                    icon_size={40}
                                    icon_color={Color.blue}
                                />
                                <Text>Linkedin</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10 }}>
                            <TouchableOpacity onPress={() => {
                                let url = ContactData.instagram
                                Linking.openURL("https://www.trucktaxi.in/privacy-policy")
                            }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Iconviewcomponent
                                    Icontag={'MaterialIcons'}
                                    iconname={'privacy-tip'}
                                    icon_size={40}
                                    icon_color={Color.DullOrange}
                                />
                                <Text>Privacy Policy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                Linking.openURL("https://www.trucktaxi.in/terms-and-conditions")
                            }}
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Iconviewcomponent
                                    Icontag={'SimpleLineIcons'}
                                    iconname={'notebook'}
                                    icon_size={40}
                                    icon_color={Color.green}
                                />
                                <Text>Terms And Conditions</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
    bg: {
        backgroundColor: '#fff',
    },
    ordercount: {
        height: 49,
        width: 49,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 40,
    },
    catimageBackground: {
        width: '100%',
        height: 100,
    },
    backgroundImage: {
        height: 200,
        width: '100%'
    },

    signIn: {
        width: 336,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
    },
    ordercountno: {
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 15,
    },
    profilename: {
        color: '#fff',
        fontSize: 20,
    },
    ordertit: {
        fontSize: 7,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    profilemail: {
        color: '#fff',
        fontSize: 14,
        marginTop: 4,
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#85388d',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    below: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
});
