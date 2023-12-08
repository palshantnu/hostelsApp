import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import Bottomnavbar from '../../../navigation/BottomNavigation';
import {Color, Fonts} from '../../../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Settings = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  return (
    <View style={{height: height * 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: height * 0.09,
          backgroundColor: '#fff',
        }}>
        <View style={{backgroundColor:Color.lightsteelblue, elevation: 9, padding: 20}}>
          <Text
            style={{
              color: Color.white,
              fontFamily: Fonts.primarySemiBold,
              fontSize: 20,
            }}>
            Account
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{
            backgroundColor: '#fff',
            padding: 20,
            marginTop: 10,
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            // alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignContent: 'center'}}>
            <FontAwesome
              name="user-circle"
              size={30}
              color={Color.lightsteelblue}
              style={{textAlignVertical: 'center'}}
            />
            <Text
              style={{
                color: Color.black,
                fontFamily: Fonts.primarySemiBold,
                fontSize: 15,
                // textAlignVertical: 'center',
              }}>
              {'   '}
               Profile
            </Text>
          </View>
          {/* <Entypo
            name="chevron-right"
            size={25}
            color={Color.black}
            style={{justifyContent: 'center'}}
          /> */}
        </TouchableOpacity>
        <View style={styles.horizontalLine}/>
        <TouchableOpacity
          onPress={() => navigation.navigate('BookingHistoryScreen')}
          style={{
            backgroundColor: '#fff',
            padding: 20,
            marginTop: 10,
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            // alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignContent: 'center'}}>
            <FontAwesome
              name="history"
              size={30}
              color={Color.lightsteelblue}
              style={{textAlignVertical: 'center'}}
            />
            <Text
              style={{
                color: Color.black,
                fontFamily: Fonts.primarySemiBold,
                fontSize: 15,
                // textAlignVertical: 'center',
              }}>
              {'   '}
              Booking History
            </Text>
          </View>
          {/* <Entypo
            name="chevron-right"
            size={25}
            color={Color.black}
            style={{justifyContent: 'center'}}
          /> */}
        </TouchableOpacity>
        <View style={styles.horizontalLine}/>
        <TouchableOpacity
          onPress={() => navigation.navigate('LogOut')}
          style={{
            backgroundColor: '#fff',
            padding: 20,
            marginTop: 10,
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            // alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignContent: 'center'}}>
            <AntDesign
              name="logout"
              size={25}
              color={Color.lightsteelblue}
              style={{textAlignVertical: 'center'}}
            />
            <Text
              style={{
                color: Color.black,
                fontFamily: Fonts.primarySemiBold,
                fontSize: 15,
                // textAlignVertical: 'center',
              }}>
              {'    '}
              LogOut
            </Text>
          </View>
          {/* <Entypo
            name="chevron-right"
            size={25}
            color={Color.black}
            style={{justifyContent: 'center'}}
          /> */}
        </TouchableOpacity>
      </ScrollView>
      <Bottomnavbar navigation={navigation} page={'Settings'} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  horizontalLine: {
    width: '95%', // Set the width to fill the container horizontally
    height: 1, // Adjust the height of the line as needed
    backgroundColor: 'grey', // Change the color as desired
    alignSelf:'center'
  },
});
