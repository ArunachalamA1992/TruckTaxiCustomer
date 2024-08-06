import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const WalletScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: (
                <Text>
                    Wallet
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


    return (
        <View style={styles.container}>
            <Text>
                Coming Soon
            </Text>
        </View>
    );
};

export default WalletScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
