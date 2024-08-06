import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    FlatList,
    TextInput,
    ScrollView,
} from 'react-native';
import { Button } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from '@react-navigation/native';


const ReviewScreen = ({ route, navigation }) => {
    const { key } = route.params;
    const [showLoading, setshowLoading] = useState(false);
    const { bookingid } = route.params;


    const categoryData = [
        {
            id: 1,
            name: '1',
        },
        {
            id: 2,
            name: '2',
        },
        {
            id: 3,
            name: '3',
        },
        {
            id: 4,
            name: '4',
        },
        {
            id: 5,
            name: '5',
        },

    ];


    const [categories, setCategories] = React.useState(categoryData);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [feed, setfeed] = React.useState(categoryData);
    const [selectedfeed, setselectedfeed] = React.useState(null);
    const [message, setmessage] = React.useState(null);

    useEffect(() => {
        navigation.setOptions({
            title: 'Rate Driver',
            headerStyle: {
                backgroundColor: '#85388d',
                elevation: 0,
            },
            headerTintColor: '#fff',
        });
    });

    function onSelectCategory(category) {
        setSelectedCategory(category);
    }


    if (showLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    const continued = () => {
        if (
            selectedCategory == null ||
            selectedCategory == undefined ||
            selectedCategory == ''
        ) {
            Snackbar.show({
                text: 'Enter Rating',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: '#85388d',
            });
        } else {
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
                                "bookid": bookingid,
                                "ratings": selectedCategory.name
                            });
                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                            };

                            console.log(raw)

                            fetch("https://trucktaxi.co.in/api/customer/submitrating", requestOptions)
                                .then(response => response.json())
                                .then(result => {
                                    console.log(result)

                                    setshowLoading(false)
                                    navigation.dispatch(CommonActions.goBack());

                                    alert('Review Submitted')


                                }
                                )
                                .catch(error => {
                                    setshowLoading(false)

                                });
                        })






                })
            })

            console.log()
        }
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    padding: 4,
                    paddingBottom: 10,
                    backgroundColor: selectedCategory?.id == item.id ? '#85388d' : '#fff',
                    borderRadius: 3,
                    borderColor: '#E0E0E0',
                    borderWidth: 1,
                    width: 27,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 7,
                }}
                onPress={() => onSelectCategory(item)}>
                <Text
                    style={{
                        color: selectedCategory?.id == item.id ? '#fff' : '#828282',
                        fontSize: 12,
                        marginTop: 3,
                    }}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };


    return (
        <ScrollView>
            <View style={styles.container}>
                <View
                    style={{
                        margin: 10,
                        backgroundColor: '#fff',
                        padding: 20,
                        height: '100%',
                    }}>
                    <Text style={{ fontSize: 20 }}>
                        Your feeback help us to improve our service
                    </Text>

                    <View>
                        <View style={{ marginTop: 27, marginBottom: 15 }}>
                            <Text>How was your booking experience</Text>
                        </View>
                        <View>
                            <FlatList
                                data={categories}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={item => `${item.id}`}
                                renderItem={renderItem}
                                contentContainerStyle={{ paddingVertical: 5 }}
                            />
                        </View>
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    justifyContent: 'space-between',
                                }}>
                                <View style={{}}>
                                    <Text>Not Likely at all</Text>
                                </View>
                                <View style={{}}>
                                    <Text>Extremely Likely</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            <View></View>
                            <View>
                                <Button
                                    colors={['#85388d', '#85388d']}
                                    style={styles.signIn}
                                    onPress={() => continued()}>
                                    <Text style={styles.textSign}>Submit</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default ReviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    signIn: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#85388d',
        borderColor: '#85388d',
        flexDirection: 'row',
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
