import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Colors from '../../components/Colors';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Call from 'react-native-vector-icons/Ionicons';
import Sms from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Manrope } from '../../Global/FontFamily';


const ContactUs = () => {
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity
  //         style={{marginLeft: width * 0.04}}
  //         onPress={() => navigation.toggleDrawer()}>
  //         <Icon name="reorder" size={25} color="#000" />
  //       </TouchableOpacity>
  //     ),
  //     headerTitle: () => (
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           gap: 5,
  //         }}>
  //         <Text style={{color: 'black', fontSize: 18}}>Contact</Text>
  //         <Call name="call" size={20} color="#000" />
  //       </View>
  //     ),
  //     headerRight: () => (
  //       <TouchableOpacity
  //         style={{marginRight: width * 0.04}}
  //         onPress={() => navigation.navigate('Book a Pickup')}>
  //         <Icon2 name="home" size={25} color={Colors.primaryColor} />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, []);

  const data = [
    {
      Id: 0,
      name: "www.trucktaxi.com",
      icon: <Icon2 name="web" size={25} color="#000" />
    },
    {
      Id: 1,
      name: "+91 7540004000",
      icon: <Call name="call" size={25} color="#000" />
    },
    {
      Id: 2,
      name: "www.trucktaxi.com",
      icon: <Sms name="sms" size={25} color="#000" />
    },
    {
      Id: 3,
      name: "https://wa.me/7540004000",
      icon: <Icon name="whatsapp" size={25} color="#000" />
    },
    {
      Id: 4,
      name: "https://www.facebook.com/trucktaxi.in",
      icon: <Icon2 name="facebook" size={25} color="#000" />
    }, {
      Id: 5,
      name: "https://instagram.com/trucktaxi.in?igshid=YmMyMTA2M2Y=",
      icon: <Icon2 name="instagram" size={25} color="#000" />
    },
    {
      Id: 6,
      name: "https://www.linkedin.com/in/truck-taxi-b0977a182",
      icon: <Icon name="linkedin-square" size={25} color="#000" />
    },
  ]

  return (
    <ScrollView style={styles.container} keyboardDismissMode="on-drag">
      <View style={styles.container}>

        <View style={{ width: '95%', alignItems: 'center' }}>
          <Text style={{ width: '100%', paddingHorizontal: 15, paddingVertical: 20, textAlign: 'justify', fontSize: 16, fontFamily: Manrope.Medium, color: Colors.black2 }}>Over the course of its journey, it has earned countless testimonials and praise-worthy reviews for its impeccable moving services from its loyal base of customers.</Text>

          <View style={{ width: '100%', paddingHorizontal: 15 }}>
            <Text style={{ fontSize: 14, color: Colors.black3, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Address</Text>
            <Text style={{ fontSize: 16, color: Colors.black2, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 5 }}>Trucktaxi services, #122, Sarojini street, Ram nagar, Coimbatore 641009</Text>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 15, paddingVertical: 10 }}>
            <Text style={{ fontSize: 14, color: Colors.black3, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Phone</Text>
            <Text style={{ fontSize: 16, color: Colors.black2, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 5 }}>+91 75 4000 4000</Text>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 15 }}>
            <Text style={{ fontSize: 14, color: Colors.black3, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Email</Text>
            <Text style={{ fontSize: 16, color: Colors.black2, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 5 }}>info@trucktaxi.in</Text>
          </View>
        </View>
        <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 20, }}>
          <Text style={{ paddingHorizontal: 15, fontSize: 18, color: Colors.black, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Social Media</Text>
          <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 0, }}>

            {/* {data.map((item, index) => {
              return (
                <TouchableOpacity key={index} style={styles.content}>
                  {item.icon}
                  <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
              )
            })} */}


            <FlatList style={{ margin: 5 }}
              numColumns={2}                  // set number of columns 
              columnWrapperStyle={styles.row}  // space them out evenly
              data={data}
              keyExtractor={(item, index) => item.Id}
              renderItem={({ item, index }) => {
                return (
                  <View key={index} style={styles.content}>
                    {item.icon}
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                )
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default ContactUs

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  row: {
    flex: 1, alignItems: 'center',
    justifyContent: "space-evenly"
  },
  content: {
    width: '55%',
    padding: 10, margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    width: '100%',
    textAlign: 'center', 
    fontSize: 16, 
    color: Colors.black2,
  }
})