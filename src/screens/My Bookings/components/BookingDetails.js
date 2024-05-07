import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Colors from '../../../components/Colors';

const BookingDetails = () => {
  return (
    <View>
      <View style={styles.model}>
        <View style={styles.modelView}>
          <View>
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
          <View>
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
    model:{
        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "center",
        padding: width* 0.06,
        
        margin: width* 0.1,
        marginTop: height* 0.14,
        borderRadius: width* 0.04,
      },
      modelHeaderView: {
        alignSelf: "flex-end",
        paddingBottom: width* 0.04,
        gap: width* 0.4,
      },
      modelHeader: {
        color: Colors.black2,
      },
      modelView: {
        flexDirection: "row",
      },
      type: {
        color: Colors.black2,
        fontSize: 14,
        fontWeight: "500",
      },
      value: {
        color: Colors.shadow,
        fontSize: 14,
        textAlign: "right",
      },
});
