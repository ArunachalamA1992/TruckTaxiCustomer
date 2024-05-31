import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Colors from './Colors';
import { useDispatch } from 'react-redux';
import { signOut } from '../storage/actions';

const CustomDrawer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  Contents = [
    {
      Id: 0,
      name: 'Book now',
      image: require('../asset/image/home.png'),
      navigate: 'Book a Pickup',
    },
    {
      Id: 1,
      name: 'My Bookings',
      image: require('../asset/image/terms-and-conditions.png'),
      navigate: 'Bookings',
    },
    {
      Id: 2,
      name: 'Notifications',
      image: require('../asset/image/bell.png'),
      navigate: 'Notifications',
    },
    {
      Id: 3,
      name: 'Chat',
      image: require('../asset/image/chat.png'),
      navigate: 'Chat',
    },
    {
      Id: 4,
      name: 'Contact Us',
      image: require('../asset/image/phone-call.png'),
      navigate: 'Contact Us',
    },
    {
      Id: 5,
      name: 'Share',
      image: require('../asset/image/share.png'),
      navigate: 'share-alt',
    },
    {
      Id: 6,
      name: 'Terms & Conditions',
      image: require('../asset/image/copy.png'),
      navigate: 'Terms & Conditions',
    },
    {
      Id: 7,
      name: 'Privacy & Conditions',
      image: require('../asset/image/document.png'),
      navigate: 'PrivacyandConditions',
    },
  ];

  const share = async () => {
    await Share.share({
      message:
        'Trucktaxi Customer App| A framework for building native apps using React',
    });
  };

  const handleSignOut = () => {
    dispatch(signOut())
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.profile}>
          <View style={styles.profilePic}>
            <Image
              style={styles.image}
              source={require('../asset/image/1_i-7Et4qMUoyQxPK1chN5lg.webp')}
            />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.ProfileName}>Users Name</Text>
            <Text style={styles.Phone}>1234567890</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <Icon2 name="edit" size={16} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {Contents.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.Id}
                onPress={
                  item.name == 'Share'
                    ? share
                    : () => navigation.navigate(item.navigate)
                }>
                <View style={styles.contents}>
                  <Image style={styles.icon} source={item.image} />
                  <Text style={styles.text}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity style={styles.logoutView} onPress={() => handleSignOut()}>
        <Text style={styles.logout}>Logout</Text>
        <Image
          style={styles.logoutIcon}
          source={require('../asset/image/close.png')}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomDrawer;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white2,
    justifyContent: 'space-between',
  },
  profile: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: height * 0.01,
    padding: height * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black3,
    borderBottomLeftRadius: width * 0.04,
    borderBottomRightRadius: width * 0.04,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  image: {
    width: width * 0.2,
    height: height * 0.09,
    borderRadius: width * 15,
    overflow: 'hidden',
  },
  ProfileName: {
    color: Colors.black2,
    fontSize: 16,
    fontWeight: '500',
    overflow: 'hidden',
  },
  Phone: {
    color: Colors.black2,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  content: {
    color: Colors.black2,
    padding: width * 0.05,
    gap: width * 0.08,
  },
  contents: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: width * 0.02,
  },
  text: {
    fontSize: 18,
    color: Colors.black2,
  },
  icon: {
    width: width * 0.055,
    height: height * 0.03,
    resizeMode: 'contain',
  },
  logoutView: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: "center",
    padding: width * 0.02,
  },
  logout: {
    color: Colors.white,
    padding: width* 0.02,
  },
  logoutIcon: {
    width: width * 0.08,
    height: height * 0.035,
    resizeMode: 'contain',
  }
});
