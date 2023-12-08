import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Color, Fonts} from '../../../theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {postData} from '../../../API';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

const numberToWords = require('number-to-words');

const BookNow = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Number, setNumber] = useState('');
  const [roomprice, setRoomPrice] = useState(0);
  const [roomprices, setRoomPrices] = useState([]);
  const {width, height} = Dimensions.get('window');
  const item = route.params;
  console.log('item', item);
  const user = useSelector(state => state.user);
  // console.log('user', user);
  var data = 0;

  const handleSave = () => {
    if (name && email && Number) {
      handleAddGuest({name, email, Number});
      setName('');
      setEmail('');
      setNumber('');
    } else {
      // Handle validation or show an error message
    }
  };

  const [guests, setGuests] = useState([]);

  const handleAddGuest = guestData => {
    setGuests([...guests, guestData]);
  };

  console.log('item.checkInDate.toLocaleString()', roomprice);
  const timestamp1 = item.checkInDate.toLocaleString();
  const parts1 = timestamp1.split(', '); // Split the timestamp into date and time parts
  // console.log('parts',parts);
  if (parts1.length === 2) {
    const datePart1 = parts1[0]; // Get the date part
    console.log(datePart1);
  }
  const timestamp2 = item.checkOutDate.toLocaleString();
  const parts2 = timestamp2.split(', '); // Split the timestamp into date and time parts
  // console.log('parts',parts);
  if (parts2.length === 2) {
    const datePart2 = parts2[0]; // Get the date part
    console.log(datePart2);
  }
  const PostBookingData = async () => {
    if (adharFront && adharBack && VerificatonDoc) {
      var body = {
        hotel_id: item.item.id,
        user_id: user.id,
        customerdetails: item.uniqueArray,
        price: item.roomprice * daysDifference,
        vender_id: item.item.vendor_id,
        startdate: item.checkInDate.toLocaleString().split(', ')[0],
        enddate: item.checkOutDate.toLocaleString().split(', ')[0],
        verifcation_id:VerificatonDoc.data,
        adharfront:adharFront.data,
        adharback:adharBack.data
      };

      console.log('body', body);

      const response = await postData('bookingnow', body);

      console.log('response', response);
      // ToastAndroid.show('here is your row id... ', ToastAndroid.SHORT);
      if (response.message) {
        showMessage({
          message: 'Successfully Booked',
          // description: 'This is our second message',
          type: 'success',
        });
        navigation.navigate('Index');
      }
    }else{
      Alert.alert('Submit all document')
    }
  };

  // for (let index = 0; index < item.uniqueArray.length; index++) {
  //   const element = item.uniqueArray[index];
  //   // console.log(element);
  //   if (element.bed == 2) {
  //     setRoomPrice(roomprice + item.item.double_bed);
  //   } else if (element.bed == 1) {
  //     setRoomPrice(roomprice + item.item.singlebed);
  //   }
  // }
  // console.log('room price---->', roomprice);

  const date1 = new Date(item.checkInDate);
  const date2 = new Date(item.checkOutDate);
  const timeDifference = date2 - date1;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  console.log('diffDays', daysDifference);

  const [adharFront, setAdharFront] = useState(null);
  const [adharBack, setAdharback] = useState(null);
  const [VerificatonDoc, setVerificatonDoc] = useState(null);

  const pickImage = async item => {
    try {
      const pickedImage = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
      });
      // console.log(pickedImage.data);
      if (item == 'fadhar') {
        setAdharFront(pickedImage);
      } else if (item == 'badhar') {
        setAdharback(pickedImage);
      } else if (item == 'verification') {
        setVerificatonDoc(pickedImage);
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };
  const pickImagecamra = async item => {
    try {
      const pickedImage = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
      });

      if (item == 'fadhar') {
        setAdharFront(pickedImage);
      } else if (item == 'badhar') {
        setAdharback(pickedImage);
      } else if (item == 'verification') {
        setVerificatonDoc(pickedImage);
      }

    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const selectPic = item => {
    console.log(item);
    Alert.alert(
      'Select Picture from',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Camera',
          onPress: () => pickImagecamra(item),
        },
        {
          text: 'Gallery',
          onPress: () => pickImage(item),
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7,
  //     includeBase64: true,
  //   }).then(image => {
  //     setProfilePic(image?.data.data);
  //   });
  // };
  return (
    <View style={{height: height * 1, flex: 1, backgroundColor: Color.white}}>
      <ScrollView style={{backgroundColor: Color.white, marginBottom: 65}}>
        {/* <View style={{backgroundColor: '#fff', elevation: 9, padding: 20}}>
          <Text
            style={{
              color: Color.black,
              fontFamily: Fonts.primarySemiBold,
              fontSize: 20,
            }}>
            Book Your Room
          </Text>
        </View> */}

        {/* <View>
          {guests.length === 0 ? (
            <Text style={{...styles.txt1, paddingHorizontal: 20}}>
              No guests added yet.
            </Text>
          ) : (
            guests.map((guest, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.cardRow2}>
                  <Text style={styles.cardtxtpera4}>1 Guest Details</Text>
                </View>
                <View style={{paddingHorizontal: 10}}>
                  <Text style={styles.txt1}>Name : {guest.name}</Text>
                  <Text style={styles.txt1}>Email : {guest.email}</Text>
                  <Text style={styles.txt1}>CMobile No. : {guest.Number}</Text>
                </View>
              </View>
            ))
          )}
        </View>
        <View style={{...styles.card, padding: 10}}>
          <Text style={styles.txt1}>Name : </Text>
          <TextInput
            placeholder="Enter guest name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <Text style={styles.txt1}>Email : </Text>
          <TextInput
            placeholder="Enter guest email"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />
          <Text style={styles.txt1}>Mobile No.</Text>
          <TextInput
            placeholder="Enter check-in date"
            value={Number}
            keyboardType="numeric"
            onChangeText={text => setNumber(text)}
          />
          <Button
            color={Color.lightsteelblue}
            title="Save"
            onPress={handleSave}
          />
        </View> */}
        <View style={styles.card}>
          <Text style={styles.header}>Booking Details</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Name :{'  '}</Text>
            <Text style={styles.value}>{user.name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Checkin Date :{'  '}</Text>
            <Text style={styles.value}>
              {new Date(item.checkInDate).toLocaleString().split(', ')[0]}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>CheckOut Date :{'  '}</Text>
            <Text style={styles.value}>
              {new Date(item.checkOutDate).toLocaleString().split(', ')[0]}
            </Text>
          </View>
          {item.uniqueArray.map((item, index) => {
            return (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.label}>Room :{'  '}</Text>
                  <Text style={styles.value}>{item.Room}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.label}>Type of bed :{'  '}</Text>
                  <Text style={styles.value}>
                    {item.bed == 2 ? 'Double' : 'Single'}
                  </Text>
                </View>
              </View>
            );
          })}
          {/* Add more booking details here as needed */}
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          {adharFront ? (
            <Image
              resizeMode="contain"
              source={{
                uri: `data:${adharFront.mime};base64,${adharFront.data}`,
              }}
              style={{width: width * 0.9, height: height * 0.5}}
            />
          ) : (
            <TouchableOpacity onPress={() => selectPic('fadhar')}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: 'lightgray',
                  borderRadius: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'gray', textTransform: 'capitalize'}}>
                  front side of {'\n'}aadhar card
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          {adharBack ? (
            <Image
              resizeMode="contain"
              source={{
                uri: `data:${adharBack.mime};base64,${adharBack.data}`,
              }}
              style={{width: width * 0.9, height: height * 0.5}}
            />
          ) : (
            <TouchableOpacity onPress={() => selectPic('badhar')}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: 'lightgray',
                  borderRadius: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'gray', textTransform: 'capitalize'}}>
                  back side of {'\n'}aadhar card
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          {VerificatonDoc ? (
            <Image
              resizeMode="contain"
              source={{
                uri: `data:${VerificatonDoc.mime};base64,${VerificatonDoc.data}`,
              }}
              style={{width: width * 0.9, height: height * 0.5}}
            />
          ) : (
            <TouchableOpacity onPress={() => selectPic('verification')}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: 'lightgray',
                  borderRadius: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'gray', textTransform: 'capitalize'}}>
                  School id / {'\n'}job card
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView style={styles.container}></ScrollView>
      </ScrollView>
      <View
        style={{
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingLeft: 10,
          paddingRight: 10,
          //   borderTopWidth: 0.5,
          elevation: 19,
        }}>
        <View
          style={{marginTop: 0, justifyContent: 'center', width: width * 0.4}}>
          <Text
            style={{
              color: Color.lightsteelblue,
              fontSize: 25,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            ₹ {item.roomprice * daysDifference}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => PostBookingData()}
          style={{
            margin: 10,
            backgroundColor: Color.lightsteelblue,
            padding: 10,
            width: width * 0.4,
            // alignSelf: 'flex-end',
            borderRadius: 5,
            elevation: 5,
          }}>
          <Text
            style={{
              color: '#fff',
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: '500',
            }}>
            BOOK NOW
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookNow;
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  row1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    paddingHorizontal: 20,
  },
  txt1: {
    color: Color.black,
    fontFamily: Fonts.primarySemiBold,
  },
  card: {
    width: width * 0.92,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 9,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    // paddingLeft: 5,
    // paddingRight: 5,
    // paddingBottom: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardRow2: {
    flexDirection: 'row',
    // marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: width * 0.92,
    backgroundColor: Color.lightsteelblue,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    marginBottom: 10,
  },
  cardtxtpera4: {
    fontSize: 16,
    color: Color.white,
    fontFamily: Fonts.primarySemiBold,
  },

  countText: {
    fontSize: 20,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 0.5,
    borderColor: Color.lightsteelblue,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Color.lightsteelblue,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  label: {
    fontSize: 13,
    // marginBottom: 5,
    color: Color.black,
    fontFamily: Fonts.primarySemiBold,
  },
  value: {
    fontSize: 13,
    marginBottom: 15,
    color: Color.black,
    fontFamily: Fonts.primarySemiBold,
  },
});
