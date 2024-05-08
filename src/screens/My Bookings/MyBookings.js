import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import OrderIcon from 'react-native-vector-icons/Foundation';
import Radio from 'react-native-vector-icons/Fontisto';
import StepIndicator from 'react-native-step-indicator';
import Colors from '../../components/Colors';
import BookingDetails from './components/BookingDetails';
import StarRating from 'react-native-star-rating-widget';

const MyBookings = () => {
  const navigation = useNavigation();
  const [model, setModel] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [detailsModal, setDetailsModal] = useState(false);
  const [paymentView, setPaymentView] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [payCash, setPayCash] = useState(false);
  const [payOnline, setPayOnline] = useState(false);
  const [rating, setRating] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => navigation.toggleDrawer()}>
          <Icon name="reorder" size={25} color="#000" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={{color: 'black', fontSize: 18}}>MY Bookings</Text>
          <OrderIcon name="clipboard-notes" size={20} color="#000" />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: width * 0.04}}
          onPress={() => navigation.navigate('Notifications')}>
          <Text
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              backgroundColor: Colors.red,
              fontSize: 12,
              paddingHorizontal: width * 0.01,
              borderRadius: 25,
              zIndex: 5,
            }}>
            1
          </Text>
          <Icon name="bell" size={23} color={Colors.primaryColor} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const labels = [
    'Booked',
    'Vehicle on the way',
    'Trip Completed',
    'Payment Completed',
  ];

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: Colors.Green,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: Colors.Green,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: Colors.Green,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: Colors.Green,
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: Colors.Green,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 10,
    labelAlign: 'center',
    currentStepLabelColor: Colors.Green,
  };

  const handleButtonPress = () => {
    if (currentStatus == 0) {
      setDetailsModal(true);
    } else if (currentStatus == 1) {
      navigation.navigate('Track');
    } else if (currentStatus == 2) {
      setPaymentView(true);
    } else if (currentStatus == 3){
      setReviewModal(true)
    }
  };

  const selectPayment = value => {
    if (value == 'payCash') {
      setPayCash(true);
      setPayOnline(false);
    } else if (value == 'payOnline') {
      setPayOnline(true);
      setPayCash(false);
    }
  };

  return (
    <>
      <View style={styles.headerView}>
        <TouchableOpacity>
          <Text style={styles.upcoming}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.completed}>Completed</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.container1}>
          <View style={styles.container2}>
            <Text style={styles.type}>ID : 399748</Text>
            <Text style={styles.type}>Vehicle :</Text>
            <Text style={styles.type}>Location Details:</Text>
            <Text style={styles.type}>Pickup :</Text>
            <Text style={styles.type}>Drop :</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.value}>6-10-2024/ 1:45 pm</Text>
            <Text style={styles.value}>407</Text>
            <Text style={styles.value}></Text>
            <View style={styles.container3}>
              <Icon2 name="location-dot" size={13} color="#000" />
              <Text style={styles.value}>Gandhipuram</Text>
            </View>
            <View style={styles.container3}>
              <Icon2 name="location-dot" size={13} color="#000" />
              <Text style={styles.value}>Salem</Text>
            </View>
          </View>
        </View>
        <View style={styles.line} />
        <Text style={styles.type}>Status:</Text>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentStatus}
          stepCount={4}
          labels={labels}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => setModel(true)}>
            <Text style={styles.help}>Need Help ?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleButtonPress}>
            <Text style={styles.track}>
              {currentStatus == 0
                ? 'Details'
                : currentStatus == 1
                ? 'Track'
                : currentStatus == 2
                ? 'Pay'
                : currentStatus == 3
                ? 'Review'
                : "Completed"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Help modal */}
      <Modal visible={model} onRequestClose={() => setModel(false)} transparent>
        <View style={styles.modelBg}>
          <View style={styles.modal}>
            <View style={styles.modalHeaderView}>
              <Text style={styles.modalHeader}>Need Help</Text>
              <TouchableOpacity onPress={() => setModel(false)}>
                <Icon name="window-close" size={25} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalView}>
              <Icon1 name="handshake" size={125} color={Colors.litePrimaryBg} />
              <TouchableOpacity>
                <Text style={styles.chat}>Chat Support</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.cancelBooking}>Cancel Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* BookingDetails modal */}
      <Modal
        visible={detailsModal}
        onRequestClose={() => setDetailsModal(false)}
        transparent>
        <View style={styles.modelBg}>
          <BookingDetails />
        </View>
      </Modal>
      {/* paymentmodal */}
      <Modal
        visible={paymentView}
        onRequestClose={() => setPaymentView(false)}
        transparent>
        <View style={styles.modelBg}>
          <View style={styles.payment}>
            <Text style={styles.paymentHeader}>Select Payment</Text>
            <View style={styles.paymentView}>
              <TouchableOpacity
                style={styles.paymentView2}
                onPress={() => selectPayment('payCash')}>
                <Text style={styles.paymentText}>Pay in Cash</Text>
                {payCash ? (
                  <Icon name="check-circle" size={23} color={Colors.Green} />
                ) : (
                  <Radio
                    name="radio-btn-passive"
                    size={20}
                    color={Colors.shadow}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity
                style={styles.paymentView2}
                onPress={() => selectPayment('payOnline')}>
                <Text style={styles.paymentText}>Online Payment</Text>
                {payOnline ? (
                  <Icon name="check-circle" size={23} color={Colors.Green} />
                ) : (
                  <Radio
                    name="radio-btn-passive"
                    size={20}
                    color={Colors.shadow}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={() => setPaymentView(false)}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.submit}>Sumbit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Review Modal */}
      <Modal
        visible={reviewModal}
        onRequestClose={() => setReviewModal(false)}
        transparent>
        <View style={styles.modelBg}>
          <View style={styles.reviewModal}>
            <Text style={styles.reviewHeader}>Your feedback helps us to improve our service</Text>
            <Text style={styles.reviewText}>How was your booking experience</Text>
            <StarRating
            color={Colors.primaryColor}
            style={styles.starComponent}
              rating={rating}
              onChange={setRating}
            />
            <Text style={styles.reviewText}>How could we improve ?</Text>
            <TextInput style={styles.reviewInput} multiline={true} rows={3} maxLength={100}/>
            <TouchableOpacity>
              <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MyBookings;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
  },
  upcoming: {
    color: Colors.black,
    backgroundColor: Colors.litePrimaryBg,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.17,
  },
  completed: {
    color: Colors.black,
    backgroundColor: Colors.steel,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.17,
  },
  container: {
    padding: width * 0.04,
    margin: width * 0.03,
    marginTop: height * 0.02,
    borderRadius: width * 0.015,
    borderWidth: 1,
    borderColor: Colors.black3,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container2: {
    gap: width * 0.01,
  },
  container3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  type: {
    color: Colors.shadow,
    fontSize: 13,
  },
  value: {
    color: Colors.shadow,
    color: Colors.black2,
    fontSize: 13,
    fontWeight: '500',
  },
  line: {
    marginVertical: height * 0.02,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    width: '100%',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  help: {
    color: Colors.black2,
    backgroundColor: Colors.steel,
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.008,
    borderRadius: width * 0.01,
  },
  track: {
    color: Colors.white,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: width * 0.13,
    paddingVertical: height * 0.008,
    borderRadius: width * 0.01,
  },
  modelBg: {
    flex: 1,
    backgroundColor: Colors.black3,
  },
  modal: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    padding: width * 0.04,
    marginTop: height * 0.25,
    marginHorizontal: width * 0.15,
    borderRadius: width * 0.02,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalHeader: {
    color: Colors.black3,
    fontSize: 20,
    fontWeight: '700',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.01,
    gap: height * 0.02,
  },
  chat: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: width * 0.12,
    paddingVertical: height * 0.01,
    borderRadius: width * 0.015,
  },
  cancelBooking: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: Colors.steel,
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.01,
    borderRadius: width * 0.015,
  },

  payment: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    padding: width * 0.04,
    paddingVertical: height * 0.04,
    marginTop: height * 0.25,
    marginHorizontal: width * 0.08,
    borderRadius: width * 0.02,
    gap: height * 0.02,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  paymentHeader: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  paymentView: {
    borderWidth: 1,
    padding: width * 0.04,
    borderRadius: width * 0.02,
  },
  paymentView2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '500',
  },
  submit: {
    color: Colors.white,
    fontSize: 18,
    backgroundColor: Colors.primaryColor,
    alignSelf: 'center',
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.01,
    borderRadius: width * 0.01,
    marginTop: height * 0.02,
  },
  cancel: {
    color: Colors.black,
    fontSize: 18,
    backgroundColor: Colors.steel,
    alignSelf: 'center',
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.01,
    borderRadius: width * 0.01,
    marginTop: height * 0.02,
  },
  reviewModal: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    padding: width * 0.06,
    marginTop: height * 0.22,
    marginHorizontal: width * 0.1,
    borderRadius: width * 0.02,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  reviewHeader: {
    color: Colors.black,
    fontSize: 16
  },
  reviewText: {
    color: Colors.black,
    fontSize: 14
  },
  starComponent: {
    alignSelf: "center",
    paddingVertical: height* 0.01
  },
  reviewInput: {
    color: Colors.black,
    borderWidth: 1,
    paddingHorizontal: width* 0.015,
    borderColor: Colors.black,
    borderRadius: width* 0.01,
  },
});
