import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Colors from '../../../components/Colors';

const BookingDetails = () => {
  return (
    <View>
      <View style={styles.modal}>
        <View style={styles.modalView}>
          <View style={styles.modalView2}>
            <Text style={styles.type}>Pickup Time :</Text>
            <Text style={styles.type}>Vehicle :</Text>
            <Text style={styles.type}>Vehicle Type:</Text>
            <Text style={styles.type}>Trip Type :</Text>
            <Text style={styles.type}>Regular Charges :</Text>
            <Text style={styles.type}>Peak Time Fare :</Text>
            <Text style={styles.type}>Approximate Fees :</Text>
            <Text style={styles.type}>Pickup :</Text>
            <Text style={styles.type}>Drop :</Text>
            <Text style={styles.type}>Payment type :</Text>
          </View>
          <View style={styles.modalView2}>
            <Text style={styles.value}>29/10/2023-16:52</Text>
            <Text style={styles.value}>407</Text>
            <Text style={styles.value}>Closed Type</Text>
            <Text style={styles.value}>Meter Fare</Text>
            <Text style={styles.value}>Rs.288</Text>
            <Text style={styles.value}>Rs.0</Text>
            <Text style={styles.value}>Rs.0</Text>
            <Text style={styles.value}>Gandhipuram</Text>
            <Text style={styles.value}>Railway Station</Text>
            <Text style={styles.value}>Cash</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookingDetails;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    modal:{
        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "center",
        padding: width* 0.06,
        
        margin: width* 0.1,
        marginTop: height* 0.22,
        borderRadius: width* 0.04,
      },
      // modelHeaderView: {
      //   alignSelf: "flex-end",
      //   paddingBottom: width* 0.04,
      //   gap: width* 0.4,
      // },
      // modelHeader: {
      //   color: Colors.black2,
      // },
      modalView: {
        flexDirection: "row",
        padding: width* 0.04,
        gap: height* 0.01,
      },
      modalView2: {
        gap: height* 0.01,
      },
      type: {
        color: Colors.shadow,
        fontSize: 14,
      },
      value: {
        color: Colors.black2,
        fontSize: 14,
        fontWeight: "500",
        textAlign: "right",
      },
});
