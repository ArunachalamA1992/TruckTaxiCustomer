import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    Dimensions,
    ToastAndroid,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Radio, RadioGroup } from '@ui-kitten/components';
import { P, H5 } from '../components/typography';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import RNRestart from 'react-native-restart';
import Color from '../Global/Color';
import { Manrope } from '../Global/FontFamily';


const ProfileScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: '',
        mobileno: '',
        name: '',
        language: "English",
        gst: '',
        customertype: 0,
        companyname: '',
        companyaddress: '',

    });

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [profile, setprofile] = useState([]);
    const [showLoading, setshowLoading] = useState(false);
    const [cityValue, setcityValue] = useState();
    const [cityType, setcityType] = React.useState([]);
    const [cityIndex, setcityIndex] = React.useState([]);

    useEffect(() => {
        setshowLoading(true);
        AsyncStorage.getItem('user').then(mobile => {
            AsyncStorage.getItem('userToken').then(value => {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + value);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                fetch("https://trucktaxi.co.in/api/customer/getprofiledetails?mobileno=" + mobile, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setData({
                            "mobileno": result.data[0].mobileno,
                            "name": result.data[0].customername,
                            "gst": result.data[0].gst,
                            "cityid": result.data[0].cityid,
                            "companyname": result.data[0].companyname,
                            "companyaddress": result.data[0].companyaddress,
                        })
                        setshowLoading(false);
                        setcityValue(result.data[0].cityid)

                    })
                    .catch(error => console.log('error', error));

                fetch("https://trucktaxi.co.in/api/customer/getbrancheslist", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setshowLoading(false)
                        setcityType(result.data)

                    })
                    .catch(error => console.log('error', error));

            })
        })
    }, []);


    const save = () => {
        AsyncStorage.getItem('userToken').then(value => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + value);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "mobileno": data.mobileno,
                "name": data.name,
                "language": "English",
                "gst": data.gst,
                "customertype": 1,
                "cityid": cityValue,
                "companyname": data.companyname,
                "companyaddress": data.companyaddress,
            });


            console.log(raw)
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://trucktaxi.co.in/api/customer/addprofile", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status == 200) {
                        ToastAndroid.show("Profile Updated Successfully, Reloading App", ToastAndroid.SHORT);
                        var status = 'Old'
                        AsyncStorage.setItem("newuser", status);
                        refreshdata()
                    } else {
                        ToastAndroid.show("Try Agin Later, Reloading App", ToastAndroid.SHORT);
                    }
                })
                .catch(error => console.log('catch in add_profile:', error));
        })
    }


    const refreshdata = () => {
        AsyncStorage.getItem('user').then(mobile => {
            AsyncStorage.getItem('userToken').then(value => {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + value);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                fetch("https://trucktaxi.co.in/api/customer/getprofiledetails?mobileno=" + mobile, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        AsyncStorage.setItem("userdata", JSON.stringify(result.data[0]));
                        RNRestart.Restart();

                    })
                    .catch(error => console.log('error', error));
            })
        })
    }



    useEffect(() => {
        navigation.setOptions({
            title: (
                <Text>
                    Update Profile
                </Text>
            ),
        });
    });

    const loadcities = () => {
        return cityType.map(city => (
            <SelectItem title={city.name} />
        ))
    }


    return (
        <View style={styles.container}>

            <View style={styles.container}>

                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <View style={{ width: '95%', paddingBottom: 10 }}>
                                <Text style={{ fontSize: 16, color: Color.cloudyGrey, fontFamily: Manrope.SemiBold }}>Basic Detais</Text>
                            </View>
                            <View style={{ width: '95%', paddingVertical: 10 }}>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>Username</Text>
                                <View style={{ width: '100%', height: 50, marginVertical: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: Color.white, borderRadius: 30 }}>
                                    <View style={{ paddingHorizontal: 20 }}>
                                        <FontAwesome name="account" color="#05375a" size={20} />
                                    </View>
                                    <TextInput
                                        placeholder="Name"
                                        style={styles.textInput}
                                        value={data.name}
                                        autoCapitalize={'none'}
                                        onChangeText={val => {
                                            setData({
                                                ...data,
                                                name: val,
                                            });
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ width: '95%', paddingVertical: 0 }}>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>Mobile Number</Text>
                                <View style={{ width: '100%', height: 50, marginVertical: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: Color.white, borderRadius: 30 }}>
                                    <View style={{ paddingHorizontal: 20 }}>
                                        <FontAwesome name="phone" color="#05375a" size={20} />
                                    </View>
                                    <TextInput
                                        placeholder="Mobile"
                                        style={styles.textInput}
                                        value={data.mobileno}
                                        autoCapitalize="none"
                                        onChangeText={val => {
                                            setData({
                                                ...data,
                                                mobileno: val,
                                            });
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={{ width: '95%', paddingBottom: 10, marginVertical: 10 }}>
                                <Text style={{ fontSize: 16, color: Color.cloudyGrey, fontFamily: Manrope.SemiBold }}>City Code</Text>
                                <View style={{ width: '100%', height: 50, marginVertical: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: Color.white, borderRadius: 30 }}>
                                    <View style={{ paddingHorizontal: 20 }}>
                                        <FontAwesome name="apps" color="#828282" size={20} />
                                    </View>
                                    <Select
                                        selectedIndex={cityIndex}
                                        value={cityValue}
                                        style={{ backgroundColor: '#fff', paddingLeft: 20, width: "80%" }}
                                        onSelect={index => {
                                            setcityValue(cityType[index.row].id);
                                            setcityIndex(index);
                                        }}>
                                        {loadcities()}
                                    </Select>
                                </View>
                            </View>

                            <View style={{ width: '95%', paddingBottom: 10 }}>
                                <Text style={{ fontSize: 16, color: Color.cloudyGrey, fontFamily: Manrope.SemiBold }}>Customer Type</Text>
                                <View style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    borderBottomWidth: 1,
                                    padding: 4,
                                    borderBottomColor: "#f2f2f2",
                                    borderRadius: 15,
                                    margin: 10,
                                    padding: 20
                                }}>
                                    <RadioGroup
                                        selectedIndex={selectedIndex}
                                        onChange={index => setSelectedIndex(index)}>
                                        <Radio>General</Radio>
                                        <Radio>Business</Radio>
                                    </RadioGroup>
                                </View>
                            </View>

                            {selectedIndex == 1 ? (
                                <View>
                                    <View style={{ width: '95%', height: 50, marginVertical: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: Color.white, borderRadius: 30 }}>
                                        <View style={{ paddingHorizontal: 20 }}>
                                            <FontAwesome name="cellphone" color="#05375a" size={20} />
                                        </View>

                                        <TextInput
                                            placeholder="GST Number"
                                            placeholderTextColor={'#000'}
                                            style={styles.textInput}
                                            value={data.gst}
                                            autoCapitalize="none"
                                            onChangeText={val => {
                                                setData({
                                                    ...data,
                                                    gst: val,
                                                });
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: '95%', height: 50, marginVertical: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: Color.white, borderRadius: 30 }}>
                                        <View style={{ paddingHorizontal: 20 }}>
                                            <FontAwesome name="cellphone" color="#05375a" size={20} />
                                        </View>
                                        <TextInput
                                            placeholder="Company Name"
                                            placeholderTextColor={'#000'}

                                            style={styles.textInput}
                                            autoCapitalize="none"
                                            value={data.companyname}
                                            onChangeText={val => {
                                                setData({
                                                    ...data,
                                                    companyname: val,
                                                });
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: '95%', height: 50, marginVertical: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: Color.white, borderRadius: 30 }}>
                                        <View style={{ paddingHorizontal: 20 }}>
                                            <FontAwesome name="cellphone" color="#05375a" size={20} />
                                        </View>
                                        <TextInput
                                            placeholder="Company Address"
                                            placeholderTextColor={'#000'}
                                            style={styles.textInput}
                                            autoCapitalize="none"
                                            value={data.companyaddress}
                                            onChangeText={val => {
                                                setData({
                                                    ...data,
                                                    companyaddress: val,
                                                });
                                            }}
                                        />
                                    </View>
                                </View>
                            ) : null}


                            <View style={styles.button}>
                                <TouchableOpacity
                                    style={styles.signIn}
                                    onPress={() => {
                                        save();
                                    }}>
                                    <LinearGradient
                                        colors={['#85388d', '#85388d']}
                                        style={styles.signIn}>
                                        <Text
                                            style={[
                                                styles.textSign,
                                                {
                                                    color: '#fff',
                                                },
                                            ]}>
                                            Save
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </Animatable.View>
            </View>
        </View>
    );
};

export default ProfileScreen;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.18;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    logo: {
        width: height_logo,
        height: 100,
    },
    icon: {
        // paddingLeft: 20,
        // paddingTop: 5
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 3,
        backgroundColor: '#eee',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },

    terms: {
        flexDirection: 'row',
        marginTop: 30,
        paddingBottom: 5,
    },
    textInput: {
        flex: 1, fontSize: 16,
        // marginTop: Platform.OS === "ios" ? 0 : 0,
        paddingLeft: 0,
        color: Color.lightBlack, paddingEnd: 20
        // paddingTop: 12

    },
    action: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        // padding: 4,
        borderBottomColor: "#f2f2f2",
        borderRadius: 45,
        // margin: 10

    },
    button: {
        width: '100%',
        alignItems: 'center',
        marginTop: 30,
    },
    signIn: {
        width: '95%',
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    color_textPrivate: {
        color: 'grey',
    },
});
