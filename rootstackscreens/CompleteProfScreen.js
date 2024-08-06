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
import { AuthContext } from '../context/context';


const ComProfileScreen = ({ navigation, route }) => {
    const { result } = route.params;
    const { phone } = route.params;
    const { signIn } = React.useContext(AuthContext);

    const [data, setData] = React.useState({
        email: '',
        mobileno: '',
        name: '',
        language: "English",
        gst: '',
        customertype: 1,
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
        let parsedresult = JSON.parse(result)
        let token = parsedresult.token;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("https://trucktaxi.co.in/api/customer/getbrancheslist", requestOptions)
            .then(response => response.json())
            .then(result => {
                setshowLoading(false)
                setcityType(result.data)

            })
            .catch(error => console.log('error', error));


    }, []);

    const save = () => {
        console.log(cityValue)
        if (data.name == '') {
            ToastAndroid.show("Enter Name", ToastAndroid.SHORT);

        }
        else if (cityValue == undefined) {
            ToastAndroid.show("Select City", ToastAndroid.SHORT);

        }
        else {

            let parsedresult = JSON.parse(result)
            let token = parsedresult.token;
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "mobileno": phone,
                "name": data.name,
                "language": "English",
                "gst": data.gst,
                "customertype": data.customertype,
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
                        ToastAndroid.show("Profile Updated", ToastAndroid.SHORT);
                        var status = 'Old'
                        AsyncStorage.setItem("newuser", status);
                        refreshdata()
                    } else {
                        console.log(result)
                        ToastAndroid.show("Error Saving Data", ToastAndroid.SHORT);

                    }
                })
                .catch(error => console.log('error', error));
        }






    }


    const refreshdata = () => {
        let parsedresult = JSON.parse(result)
        let token = parsedresult.token;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("https://trucktaxi.co.in/api/customer/getprofiledetails?mobileno=" + phone, requestOptions)
            .then(response => response.json())
            .then(result => {
                AsyncStorage.setItem("userdata", JSON.stringify(result.data[0]));
                signIn(parsedresult);
                AsyncStorage.setItem("user", phone);

            })
            .catch(error => console.log('error', error));

    }





    const loadcities = () => {
        return cityType.map(city => (
            <SelectItem title={city.name} />
        ))
    }


    return (
        <View style={styles.container}>

            <View style={styles.container}>

                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <ScrollView>
                        <View style={{ paddingBottom: 10 }}>
                            <Text>
                                <H5>Basic Detais</H5>
                            </Text>

                        </View>
                        <View style={styles.action}>
                            <FontAwesome style={styles.icon} name="account" color="#05375a" size={20} />
                            <TextInput
                                placeholder="Name"
                                style={styles.textInput}
                                value={data.name}
                                autoCapitalize="none"
                                onChangeText={val => {
                                    setData({
                                        ...data,
                                        name: val,
                                    });
                                }}
                            />
                        </View>


                        <View style={styles.action}>
                            <FontAwesome style={styles.icon} name="cellphone" color="#05375a" size={20} />
                            <TextInput
                                placeholder="Mobile"
                                style={styles.textInput}
                                value={phone}
                                editable={false}
                                autoCapitalize="none"
                                onChangeText={val => {
                                    setData({
                                        ...data,
                                        mobileno: val,
                                    });
                                }}
                            />
                        </View>

                        <View style={{ paddingBottom: 10 }}>
                            <Text>
                                <H5>City Code</H5>
                            </Text>

                        </View>
                        <View style={styles.action}>
                            <FontAwesome style={styles.icon} name="cellphone" color={'#828282'} size={20} />
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


                        <View style={{ paddingBottom: 10 }}>
                            <Text>
                                <H5>Customer Type</H5>
                            </Text>

                        </View>
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

                        {selectedIndex == 1 ? (
                            <View>

                                <View style={styles.action}>
                                    <FontAwesome style={styles.icon} name="cellphone" color="#05375a" size={20} />
                                    <TextInput
                                        placeholder="GST Number"
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
                                <View style={styles.action}>
                                    <FontAwesome style={styles.icon} name="cellphone" color="#05375a" size={20} />
                                    <TextInput
                                        placeholder="Company Name"
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
                                <View style={styles.action}>
                                    <FontAwesome style={styles.icon} name="cellphone" color="#05375a" size={20} />
                                    <TextInput
                                        placeholder="Company Address"
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
                                        Save And Continue
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>






                    </ScrollView>
                </Animatable.View>
            </View>
        </View>
    );
};

export default ComProfileScreen;

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
        paddingLeft: 20,
        paddingTop: 5
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
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -12,
        paddingLeft: 20,
        color: "#05375a",
        paddingTop: 12

    },
    action: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        padding: 4,
        borderBottomColor: "#f2f2f2",
        borderRadius: 45,
        margin: 10

    },
    button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: 200,
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
