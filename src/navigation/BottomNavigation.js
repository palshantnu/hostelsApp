import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Color} from '../theme';

const Bottomnavbar = ({navigation, page}) => {
  // console.log(page)

  return (
    <View style={[styles.container]}>
      {page === 'Favourites' ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('Favourites')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: Color.lightsteelblue,
            borderBottomWidth: 2,
            padding: 5,
          }}>
          <Ionicons
            name="heart"
            size={30}
            color={Color.lightsteelblue}
            style={[styles.activeicon1]}
          />
          <Text style={styles.ActiveTxt}>Favorite</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('Favourites')}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <Ionicons
            name="heart"
            size={30}
            color={Color.apptheme}
            style={[styles.icon1]}
          />
          <Text style={styles.UnActiveTxt}>Favorite</Text>
        </TouchableOpacity>
      )}
      {page === 'Home' ? (
        <TouchableOpacity onPress={() => navigation.navigate('Index')}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: Color.lightsteelblue,
              borderWidth: 2,
              padding: 0,
              borderRadius: 50,
              height: 50,
              width: 50,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                borderRadius: 50,
                backgroundColor: '#fff',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons
                name="home"
                size={30}
                color="black"
                style={[
                  styles.activeicon1,
                  {
                    elevation: 9,
                    alignSelf: 'center',
                    backgroundColor: '#fff',
                    padding: 10,
                  },
                ]}
              />
            </View>
          </View>
          <Text style={styles.ActiveTxt}>Stays</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('Index')}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <Ionicons
            name="home"
            size={30}
            color={Color.apptheme}
            style={[styles.icon1]}
          />
          <Text style={styles.UnActiveTxt}>Stays</Text>
        </TouchableOpacity>
      )}

      {page === 'Settings' ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: Color.lightsteelblue,
            borderBottomWidth: 2,
            padding: 5,
          }}>
          <Ionicons
            name="settings"
            size={30}
            color="black"
            style={[styles.activeicon1]}
          />
          <Text style={styles.ActiveTxt}>Settings</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <Ionicons
            name="settings"
            size={30}
            color={Color.apptheme}
            style={[styles.icon1]}
            // onPress={() =>
            //   navigation.navigate('Calendar', {page: 'ClassTimetable'})
            // }
          />
          <Text style={styles.UnActiveTxt}>Settings</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Bottomnavbar;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#f8f8ff',
    // borderTopLeftRadius:20,
    // borderTopRightRadius:20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
    borderTopWidth: 0,
    // paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 2,
    height: height * 0.09,
    // marginBottom:200
  },
  icon1: {
    color: '#dcdcdc',

    fontSize: 25,
  },
  activeicon1: {
    color: Color.lightsteelblue,

    // backgroundColor:'black',
    fontSize: 25,
    borderRadius: 50,
    padding: 0,
  },
  ActiveTxt: {
    fontSize: 11,
    color: '#000',
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  UnActiveTxt: {
    fontSize: 11,
    color: '#000',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
  },
});
