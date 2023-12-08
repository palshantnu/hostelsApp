import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Modal,
  Button,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Slider from '../../components/ImageSlider';
import {postData} from '../../../API';
import {Color, Fonts} from '../../../theme';
import {AirbnbRating} from 'react-native-ratings';
import {TextInput, IconButton} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {showMessage} from 'react-native-flash-message';

const RoomDetails = ({route, navigation}) => {
  const item = route.params;
  console.log('item', item.item);
  const [data, setdata] = useState([]);
  const {width, height} = Dimensions.get('window');

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState(null);

    const showDatePicker = dateType => {
      setDatePickerVisible(true);
      setSelectedDateType(dateType);
    };

    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      if (selectedDateType === 'checkin') {
        const date1 = new Date(selectedDate);
        const date2 = new Date();
        const timeDifference = date1 - date2;
        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24),
        );
        console.log('daysDifference', daysDifference);
        if (daysDifference >= 0 - 1) {
          setCheckInDate(selectedDate);
          console.log('ok');
        } else {
          console.log('Not ok');
          showMessage({
            message: 'Invailed Date',
            // description: 'This is our second message',
            type: 'danger',
          });
          setCheckInDate('');
        }
      } else if (selectedDateType === 'checkout') {
        const date1 = new Date(selectedDate);
        const date2 = new Date(checkInDate);
        const timeDifference = date1 - date2;
        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24),
        );
        console.log('daysDifference', daysDifference);
        if (daysDifference > 0) {
          setCheckOutDate(selectedDate);
          console.log('ok');
        } else {
          console.log('Not ok');
          showMessage({
            message: 'Invailed Date',
            // description: 'This is our second message',
            type: 'danger',
          });
          setCheckOutDate('');
        }
      }
      hideDatePicker();
    }
  };

  const renderDatePicker = () => {
    if (isDatePickerVisible) {
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={isDatePickerVisible}>
          <DateTimePicker
            value={
              selectedDateType === 'checkin'
                ? checkInDate || new Date()
                : checkOutDate || new Date()
            }
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
          <Button title="Done" onPress={hideDatePicker} />
        </Modal>
      );
    }
  };

  const getRoomDetails = async () => {
    var body = {
      id: item.item.id,
    };

    const response = await postData('hoteldetails', body);
    console.log('response', response);
    // if (response.data.length > 0) {
    //   setdata(response.data);
    // }
  };
  useEffect(() => {
    getRoomDetails();
    console.log('item.item.capacity', item.item.capacity);
  }, []);

  const [Room, setRoom] = useState(1);
  const [Guests, setGuests] = useState(1);

  const addBox = () => {
    if (Room < 10) {
      setRoom(Room + 1);
      handleSave();
      console.log('Room', Room);
    }
  };

  const deleteBox = () => {
    if (Room > 1) {
      setRoom(Room - 1);

      let name = guests2.pop();
      console.log('guests2', guests2.length);
      console.log('name', name);
    }
  };

  const [guests2, setGuests2] = useState([]);
  const [rooms, setRooms] = useState([]);

  const handleSave = () => {
    console.log(Room);
    if (Room > 0) {
      handleAddGuest({Room});
    } else {
      // Handle validation or show an error message
    }
  };
  const handleAddGuest = guestData => {
    // console.log('guestData', guestData);
    setGuests2([...guests2, guestData]);
  };

  const addRoom = () => {
    if (Guests < 2) {
      setGuests(Guests + 1);
    }
  };

  const deleteRoom = () => {
    if (Guests > 1) {
      setGuests(Guests - 1);
    }
  };
  const [roomprice, setRoomPrice] = useState(0);

  const handleSave2 = Room => {
    // console.log('item',item.item);
    if (Guests == 2) {
      setRoomPrice(roomprice + parseInt(item.item.double_bed));
    } else if (Guests == 1) {
      setRoomPrice(roomprice + parseInt(item.item.singlebed));
    }
    // console.log(Room);
    if (Guests > 0) {
      handleAddGuest2({bed: Guests, Room});
    } else {
      // Handle validation or show an error message
    }
  };
  const handleAddGuest2 = guestData => {
    console.log('guestData', guestData);
    setRooms([...rooms, guestData]);
  };
  // Render boxes based on the current box count
  console.log('roomprice', roomprice);

  const uniqueMap = {};
  const uniqueArray = [];

  for (const item of rooms) {
    if (!uniqueMap[item.Room]) {
      // If the item's id is not in the uniqueMap, it's unique
      uniqueMap[item.Room] = true; // Add it to the map
      uniqueArray.push(item); // Add it to the uniqueArray
    }
  }

  // const [roomprice, setRoomPrice] = useState(0);

  // const RoomPrice = () => {
  //   item.uniqueArray.map(item2 => {
  //     if (item2.Guests == 1 || item2.Guests == 2) {
  //       setRoomPrice(roomprice + parseInt(item.item.price_per_night));
  //       console.log('roomprice', parseInt(item.item.price_per_night));
  //     } else {
  //       setRoomPrice(
  //         roomprice +
  //           (parseInt(item2.Guests) - 2) *
  //             parseInt(item.item.extraperson_charge),
  //       );
  //     }
  //   });
  // };

  return (
    <View style={{height: height * 1, flex: 1, backgroundColor: Color.white}}>
      <View
        style={{
          // backgroundColor: '#fff',
          elevation: 9,
          margin: 20,
          flexDirection: 'row',
          // alignItems: 'center',
          position: 'absolute',
          zIndex: 2,
        }}>
        <FontAwesome5
          name="arrow-left"
          size={25}
          color={Color.white}
          style={{justifyContent: 'center'}}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            color: Color.black,
            fontFamily: Fonts.primarySemiBold,
            fontSize: 18,
            marginLeft: 30,
          }}></Text>
      </View>
      <ScrollView
        style={{marginBottom: height * 0.1, backgroundColor: Color.white}}>
        <Slider images={item.item.multipleimage} />
        <View style={{padding: 20}}>
          <Text
            style={{
              color: Color.black,
              fontFamily: Fonts.primarySemiBold,
              margin: 0,
              fontSize: 25,
              textAlign: 'justify',
            }}>
            {item.item.name} ,{' '}
            <Text
              style={{
                color: Color.black,
                fontFamily: Fonts.primarySemiBold,
                margin: 0,
                fontSize: 15,
                textAlign: 'justify',
              }}>
              {'\n'}in {item.item.city},{item.item.state}{' '}
            </Text>
          </Text>
          <View style={{alignItems: 'flex-start', marginTop: -50}}>
            <AirbnbRating
              count={5}
              defaultRating={item.item.rating}
              size={15}
              reviews={false}
            />
          </View>
          <Text
            style={{
              color: Color.black,
              margin: 0,
              fontSize: 20,
              textAlign: 'justify',
              fontFamily: Fonts.primarySemiBold,
              marginTop: 20,
            }}>
            Description
          </Text>
          <Text
            style={{
              color: Color.gray,
              margin: 0,
              fontSize: 15,
              textAlign: 'justify',
            }}>
            {item.item.description}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Text
              style={{
                color: Color.black,
                margin: 0,
                fontSize: 15,
                textAlign: 'justify',
                fontFamily: Fonts.primarySemiBold,
              }}>
              {'Single Bed Price : '}
            </Text>
            <Text
              style={{
                color: Color.gray,
                margin: 0,
                fontSize: 15,
                textAlign: 'justify',
                fontFamily: Fonts.primarySemiBold,
              }}>
              {item.item.singlebed}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Text
              style={{
                color: Color.black,
                margin: 0,
                fontSize: 15,
                textAlign: 'justify',
                fontFamily: Fonts.primarySemiBold,
              }}>
              {'Double Bed Price : '}
            </Text>
            <Text
              style={{
                color: Color.gray,
                margin: 0,
                fontSize: 15,
                textAlign: 'justify',
                fontFamily: Fonts.primarySemiBold,
              }}>
              {item.item.double_bed}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text
            style={{
              padding: 10,
              color: Color.black,
              fontFamily: Fonts.primarySemiBold,
            }}>
            Rooms
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={styles.button} onPress={deleteBox}>
              <Text style={{color: Color.grey}}>-</Text>
            </TouchableOpacity>
            <Text
              style={{
                color: Color.lightsteelblue,
                fontFamily: Fonts.primarySemiBold,
              }}>
              {Room - 1}
            </Text>
            <TouchableOpacity style={styles.button} onPress={addBox}>
              <Text style={{color: Color.grey}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        {guests2.length === 0 ? (
          <Text style={{...styles.txt1, paddingHorizontal: 20}}>
            No Rooms added yet.
          </Text>
        ) : (
          guests2.map((guest, index) => (
            <View style={styles.card}>
              <Text
                style={{
                  padding: 10,
                  color: Color.black,
                  fontFamily: Fonts.primarySemiBold,
                }}>
                guests Of Room {guest.Room}
              </Text>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}>
                  {/* {console.log(
                  'uniqueArray.filt',
                  uniqueArray.filter(item => item.Room == guest.Room)[0]
                    .Room == guest.Room,
                )} */}
                  {uniqueArray.filter(item => item.Room == guest.Room)[0]
                    ?.Room == guest.Room ? null : (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={deleteRoom}>
                      <Text style={{color: Color.grey}}>-</Text>
                    </TouchableOpacity>
                  )}
                  {uniqueArray.filter(item => item.Room == guest.Room).length >
                  0 ? (
                    <View>
                      {uniqueArray
                        .filter(item => item.Room == guest.Room)
                        .map(item2 => {
                          return (
                            <Text
                              style={{
                                color: Color.lightsteelblue,
                                fontFamily: Fonts.primarySemiBold,
                                alignSelf: 'center',
                              }}>
                              {item2.bed}
                            </Text>
                          );
                        })}
                    </View>
                  ) : (
                    <Text
                      style={{
                        color: Color.lightsteelblue,
                        fontFamily: Fonts.primarySemiBold,
                      }}>
                      {Guests}
                    </Text>
                  )}

                  {uniqueArray.filter(item => item.Room == guest.Room)[0]
                    ?.Room == guest.Room ? null : (
                    <TouchableOpacity style={styles.button} onPress={addRoom}>
                      <Text style={{color: Color.grey}}>+</Text>
                    </TouchableOpacity>
                  )}
                </View>
                {uniqueArray.filter(item => item.Room == guest.Room)[0]?.Room ==
                guest.Room ? null : (
                  <Button
                    color={Color.lightsteelblue}
                    title="Save"
                    onPress={() => handleSave2(guest.Room)}
                  />
                )}
              </View>
            </View>
          ))
        )}
        <View style={styles.container}>
          {/* <View style={styles.boxContainer}>{renderBoxes()}</View> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: 20,
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '50%'}}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: 'white',
                marginRight: 10,
                color: Color.black,
              }}
              label="check In date"
              value={
                checkInDate ? checkInDate.toLocaleDateString() : 'Not selected'
              }
              disabled
            />
            <IconButton
              icon={() => (
                <MaterialIcons
                  color={Color.black}
                  name="date-range"
                  size={24}
                />
              )}
              onPress={() => showDatePicker('checkin')}
              color="black"
            />
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '50%'}}>
            <TextInput
              style={{flex: 1, backgroundColor: 'white', marginRight: 10}}
              label="check Out date"
              value={
                checkOutDate
                  ? checkOutDate.toLocaleDateString()
                  : 'Not selected'
              }
              disabled
            />
            <IconButton
              icon={() => (
                <MaterialIcons
                  color={Color.black}
                  name="date-range"
                  size={24}
                />
              )}
              onPress={() => showDatePicker('checkout')}
              color="black"
            />
          </View>
        </View>
        {renderDatePicker()}
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
        {/* <View
          style={{marginTop: 0, justifyContent: 'center', width: width * 0.4}}>
          <Text
            style={{
              color: Color.lightsteelblue,
              fontSize: 25,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            ₹ {item.item.price_per_night}
          </Text>
        </View> */}
        {console.log('item.item', uniqueArray)}
        <TouchableOpacity
          onPress={() =>
            uniqueArray.length > 0 && checkInDate != '' && checkInDate != ''
              ? navigation.navigate('BookNow', {
                  item: item.item,
                  uniqueArray,
                  checkInDate: checkInDate,
                  checkOutDate: checkOutDate,
                  roomprice: roomprice,
                })
              : Alert.alert('Select Rooms and Date')
          }
          style={{
            margin: 10,
            backgroundColor: Color.lightsteelblue,
            padding: 10,
            width: width * 0.9,
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

export default RoomDetails;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  card: {
    width: width * 0.92,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 5,
    // marginBottom: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    alignItems: 'center',
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
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  box: {
    width: 40,
    height: 40,
    backgroundColor: 'blue',
    margin: 5,
  },
  txt1: {
    color: Color.black,
    fontFamily: Fonts.primarySemiBold,
  },
});
