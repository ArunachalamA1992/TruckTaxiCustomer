import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome6';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Colors from '../../../components/Colors';
import MapViewDirections from 'react-native-maps-directions';

const Track = ({route}) => {
  const [data] = useState(route.params.item);
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');

  const markerRef = useRef();
  const mapRef = useRef();

  const [modal, setModal] = useState(false);
  const [newPosition, setNewPosition] = useState({
    latitude: data?.from?.latitude,
    longitude: data?.from?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const GOOGLE_MAP_KEY = 'AIzaSyAOl88J2TyN1uxEENd8sjtYNq8Xa2nW4rk';

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          ...data?.from,
          latitudeDelta: 0.0,
          longitudeDelta: 0.0,
        }}
        showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}>
        <Marker.Animated ref={markerRef} coordinate={data?.from}>
          <Icon name="radio-button-on" size={20} color={Colors.primaryColor} />
        </Marker.Animated>
        <Marker coordinate={data?.from} />
        <MapViewDirections
          origin={data?.from}
          destination={data?.to}
          apikey={GOOGLE_MAP_KEY}
          strokeWidth={6}
          strokeColor={Colors.primaryColor}
          optimizeWaypoints={true}
          mode="DRIVING"
          onReady={result => {
            console.log('result', result?.distance);
            setDistance(result?.distance.toFixed(2));
            setTime(result?.duration.toFixed(2));
          }}
          onError={errorMessage => {}}
        />
      </MapView>
      <View>
        <View style={styles.timeView}>
          <View style={styles.clockView}>
            <Icon name="clock" size={25} color="#000" />
          </View>
          <View>
            <Text style={styles.arrivingTime}>Distance {distance} KM</Text>
            <Text style={styles.estimatedTime}>Estimated Time {time} mins</Text>
          </View>
        </View>

        <View style={styles.driverView}>
          <View style={styles.driverView1}>
            <View style={styles.driverView2}>
              <Image
                style={styles.image}
                source={require('../../../asset/image/1_i-7Et4qMUoyQxPK1chN5lg.webp')}
              />
              <View>
                <Text style={styles.rider}>rider</Text>
                <Text style={styles.name}>Ravindran</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.phoneView}
              onPress={() =>
                RNImmediatePhoneCall.immediatePhoneCall('0123456789')
              }>
              <View>
                <Icon name="phone" size={20} color={Colors.primaryColor} />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setModal(true)}>
            <Text style={styles.detailsBtn}>View Booking Details</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={modal}
          onRequestClose={() => setModal(false)}
          transparent>
          <View style={styles.modelBg}>
            <View style={styles.model}>
              <View style={styles.modelHeaderView}>
                <TouchableOpacity onPress={() => setModal(false)}>
                  <Icon name="window-close" size={25} color="#000" />
                </TouchableOpacity>
              </View>
              <View style={styles.modelView}>
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
                  <Text style={styles.value}>{data?.item?.vehicletype}</Text>
                  <Text style={styles.value}>Closed Type</Text>
                  <Text style={styles.value}>{data?.item?.faretype}</Text>
                  <Text style={styles.value}>Rs.288</Text>
                  <Text style={styles.value}>Rs.0</Text>
                  <Text style={styles.value}>Rs.0</Text>
                  <Text style={styles.value} numberOfLines={1}>
                    {data?.item?.fromloc}
                  </Text>
                  <Text style={styles.value} numberOfLines={1}>
                    {data?.item?.toloc}
                  </Text>
                  <Text style={styles.value}>Cash</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Track;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white2,
  },
  map: {
    width: width * 1,
    height: height * 0.64,
  },
  timeView: {
    top: -25,
    backgroundColor: Colors.white2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: width * 0.04,
    paddingBottom: height * 0.02,
    borderTopRightRadius: width * 0.06,
    borderTopLeftRadius: width * 0.06,
    gap: width * 0.06,
  },
  icon: {
    width: width * 0.09,
    height: height * 0.04,
  },
  clockView: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: Colors.white2,
    borderWidth: 8,
    borderColor: Colors.litePrimaryBg,
  },
  arrivingTime: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '500',
  },
  estimatedTime: {
    color: Colors.shadow,
    fontSize: 13,
  },
  driverView: {
    backgroundColor: Colors.primaryColor,
  },
  driverView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.04,
  },
  driverView2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.04,
  },
  image: {
    width: width * 0.165,
    height: height * 0.07,
    borderRadius: 50,
  },
  rider: {
    color: Colors.white,
    fontSize: 14,
  },
  name: {
    color: Colors.white,
    fontSize: 18,
  },
  phoneView: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: Colors.white2,
    padding: width * 0.02,
    borderWidth: 7,
    borderColor: Colors.lightPurpleBg,
  },
  detailsBtn: {
    color: Colors.primaryColor,
    fontSize: 17,
    fontWeight: '700',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: height * 0.02,
    paddingVertical: width * 0.015,
    marginTop: height * 0.01,
    marginBottom: height * 0.06,
    borderRadius: width * 0.02,
  },
  modelBg: {
    flex: 1,
    backgroundColor: Colors.black3,
  },
  model: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.08,
    margin: width * 0.1,
    marginTop: height * 0.16,
    borderRadius: width * 0.04,
  },
  modelHeaderView: {
    alignSelf: 'flex-end',
    paddingBottom: width * 0.04,
    gap: width * 0.4,
  },
  modelHeader: {
    color: Colors.black2,
  },
  modelView: {
    flexDirection: 'row',
  },
  modalView2: {
    flex: 1,
  },
  type: {
    color: Colors.black2,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
  },
  value: {
    color: Colors.shadow,
    fontSize: 14,
    textAlign: 'right',
    marginTop: 10,
  },
});
