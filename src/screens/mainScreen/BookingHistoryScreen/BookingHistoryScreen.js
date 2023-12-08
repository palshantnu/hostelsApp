import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Color, Fonts} from '../../../theme';
import {useSelector} from 'react-redux';
import {postData} from '../../../API';

// const bookingData = [
//   {id: '1', pgName: 'Cozy Residency', date: '2023-10-15', price: '$400'},
//   {id: '2', pgName: 'Urban Living', date: '2023-09-28', price: '$350'},
//   {id: '3', pgName: 'Serenity Suites', date: '2023-08-10', price: '$450'},
//   // Add more booking data as needed
// ];

const BookingHistoryScreen = ({navigation}) => {
  const [bookingData, setBookingData] = useState([]);
  const {width, height} = Dimensions.get('window');
  const [bookingtime, setbookingtime] = useState(0);
  const BookingHistoryScreen = () => {
    const [bookings, setBookings] = useState(bookingData);

    const handleDeleteBooking = id => {
      const updatedBookings = bookings.filter(booking => booking.id !== id);
      setBookings(updatedBookings);
    };
  };

  const user = useSelector(state => state.user);

  const getBookingData = async () => {
    var body = {
      user_id: user.id,
    };

    console.log('body', body);

    const response = await postData('bookinglist', body);

    console.log('response', response);
    setBookingData(response.data);
  };
  const DeleteBooking = async booking_id => {
    var body = {
      booking_id: booking_id,
      status: 2,
    };

    console.log('body', body);

    const response = await postData('bookingstatus', body);

    console.log('response', response);
    getBookingData();
  };
  useEffect(() => {
    getBookingData();
  }, []);

  // const dateStr1 = '31/10/2023';
  // const dateStr2 = '30/11/2023';

  // // Parse the date strings into Date objects
  // const dateParts1 = dateStr1.split('/'); // Split the date string into parts
  // const dateParts2 = dateStr2.split('/');

  // const date1 = new Date(dateParts1[2], dateParts1[1] - 1, dateParts1[0]); // Month is 0-based
  // const date2 = new Date(dateParts2[2], dateParts2[1] - 1, dateParts2[0]);

  // // Calculate the difference in milliseconds
  // const differenceInMilliseconds = date2 - date1;

  // // Convert the difference to days
  // const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  // console.log('Difference in days:', differenceInDays);

  // setInterval(() => {
  //   setbookingtime(Math.floor(new Date().getSeconds()));
  // }, 1000);
  return (
    <View>
      <View
        style={{
          backgroundColor: Color.lightsteelblue,
          elevation: 9,
          padding: 20,
          flexDirection: 'row',
          // alignItems: 'center',
        }}>
        <FontAwesome5
          onPress={() => navigation.goBack()}
          name="arrow-left"
          size={25}
          color={Color.white}
          style={{justifyContent: 'center'}}
        />
        <Text
          style={{
            color: Color.white,
            fontFamily: Fonts.primarySemiBold,
            fontSize: 18,
            marginLeft: 30,
          }}>
          Booking History
        </Text>
      </View>
      <View style={styles.container}>
        {bookingData.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={bookingData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.bookingItem}>
                <Text style={styles.pgName}>{item.name}</Text>
                <Text style={styles.date}>
                  From {item.startdate + '   To   ' + item.enddate}
                </Text>
                <Text style={styles.price}>Booking Price : {item.price} </Text>
                <Text style={styles.Status}>
                  Booking Status :{' '}
                  <Text
                    style={{
                      ...styles.Status1,
                      color:
                        item.status == 0
                          ? Color.orange
                          : item.status == 1
                          ? Color.blue
                          : item.status == 2
                          ? Color.red
                          : Color.darkgreen,
                    }}>
                    {item.status == 0
                      ? 'Pending'
                      : item.status == 1
                      ? 'Booking Approved'
                      : item.status == 2
                      ? 'Booking Cancelled'
                      : 'Complete'}
                  </Text>
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width * 0.9,
                    flex: 1,
                    alignItems: 'baseline',
                  }}>
                  <Text style={{...styles.Status}}>Booking Details : </Text>
                  <View>
                    {JSON.parse(item.customerdetails).map(item => {
                      return (
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              ...styles.Status1,
                              color: Color.black,
                              // flex: 1,
                              flexDirection: 'row',
                            }}>
                            Room : {item.Room}{' '}
                          </Text>
                          <Text
                            style={{
                              ...styles.Status1,
                              color: Color.black,
                            }}>
                            Bed : {item.bed == 2 ? 'Double' : 'Single'}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
                {/* {console.log(
                  'diff',
                  parseInt(
                    (new Date(
                      item.startdate.split('/')[2],
                      item.startdate.split('/')[1] - 1,
                      item.startdate.split('/')[0],
                    ) -
                      new Date()) /
                      (1000 * 60 * 60),
                  ),
                )} */}
                {/* {console.log(
                'diff',
                (new Date(
                  item.enddate.split('/')[2],
                  item.enddate.split('/')[1] - 1,
                  item.enddate.split('/')[0],
                ) -
                  new Date(
                    item.startdate.split('/')[2],
                    item.startdate.split('/')[1] - 1,
                    item.startdate.split('/')[0],
                  )) /
                  (1000 * 60 * 60 * 24),
              )} */}

                {
                  //     parseInt(
                  //   (new Date(
                  //     item.startdate.split('/')[2],
                  //     item.startdate.split('/')[1] - 1,
                  //     item.startdate.split('/')[0],
                  //   ) -
                  //     new Date()) /
                  //     (1000 * 60 * 60),
                  // ) > 0 &&
                  item.status != 2 && item.status != 3  && (
                    <TouchableOpacity
                      onPress={() => DeleteBooking(item.bookings_id)}
                      style={styles.deleteButton}>
                      <Text style={styles.deleteButtonText}>
                        Cancel Booking
                      </Text>
                    </TouchableOpacity>
                  )
                }
                <View
                  style={{
                    borderBottomColor: 'black', // Change the line color
                    borderBottomWidth: 1, // Change the line thickness
                    marginTop: 20,
                  }}
                />
              </View>
            )}
          />
        ) : (
          <View style={{justifyContent: 'center', height: height * 0.8}}>
            <Text
              style={{
                alignSelf: 'center',
                color: Color.red,
                fontFamily: Fonts.primarySemiBold,
                fontSize: 25,
              }}>
              No Booking History
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 20,
    marginBottom: 130,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookingItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
  },
  pgName: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    color: Color.black,
  },
  date: {
    fontSize: 14,
    color: Color.black,
    fontFamily: Fonts.primarySemiBold,
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 10,
  },
  Status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.black,
    marginVertical: 10,
  },
  Status1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: Color.darkred,
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BookingHistoryScreen;
