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
import Color from '../Global/Color';
import { Manrope } from '../Global/FontFamily';
import moment from 'moment';


const scr_height = Dimensions.get('window').height;
const scr_width = Dimensions.get('window').width;

const NotificationScreen = ({ navigation }) => {

    const [notification, setNotification] = useState([]);
    const [showLoading, setshowLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            title: (
                <Text>
                    Notifications
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
        setLoading(true);
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
                fetch("https://trucktaxi.co.in/api/customer/getnotifications?customerid=" + parseddata.customerid, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setshowLoading(false)
                        if (result.data != undefined) {
                            setNotification(result.data)
                            setLoading(false);
                        }
                        else {
                            setNotification([])
                            setLoading(false);
                        }
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


    const onRefresh = React.useCallback(() => {
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
                fetch("https://trucktaxi.co.in/api/customer/getnotifications?customerid=" + parseddata.customerid, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setshowLoading(false)
                        if (result.data != undefined) {
                            setNotification(result.data)

                        }
                        else {
                            setNotification([])
                        }
                    })
                    .catch(error => console.log('error', error));

            })
        })

    })

    return (
        <View style={styles.container}>
            {/* {notification.length == 0 ? (<Text>
                No Notification Yet
            </Text>) :
                (
                    <View>
                        <FlatList
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            nestedScrollEnabled
                            data={notification}
                            renderItem={renderItem}
                        />
                    </View>
                )} */}

            {!loading ?
                <FlatList
                    data={notification}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.NotificationView}>
                                <Text style={styles.message}>{item.message != null ? item.message : '--/--'}</Text>
                                <Text style={styles.time}>{moment(item.senttime).format('DD-MM-YYYY hh:mm a')}</Text>
                            </View>
                        )
                    }}
                    ListEmptyComponent={() => {
                        return (
                            <View
                                style={{
                                    width: scr_width,
                                    height: scr_height,
                                    // height: scr_height / 1.5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: Color.black,
                                    }}>
                                    No Data
                                </Text>
                            </View>
                        );
                    }}
                />
                :
                <View style={styles.load}>
                    <ActivityIndicator size="large" color={Color.primary} />
                </View>}

        </View>
    );
};

export default NotificationScreen;
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    box: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
    },
    NotificationView: {
        width: '100%',
        backgroundColor: Color.steel,
        padding: 10,
        marginVertical: 10,
        borderRadius: width * 0.01,
    },
    message: {
        textAlign: 'justify',
        alignSelf: "flex-start", paddingVertical: 5,
        fontSize: 14, letterSpacing: 0.5, lineHeight: 22,
        color: Color.black, fontFamily: Manrope.SemiBold
    },
    time: {
        alignSelf: "flex-end",
        fontSize: 12,
        color: Color.black3,
    },
    load: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },

});
