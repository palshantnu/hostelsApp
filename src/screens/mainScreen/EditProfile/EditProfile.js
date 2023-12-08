import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import Bottomnavbar from '../../../navigation/BottomNavigation';
import {Color, Fonts} from '../../../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import { TextInput } from 'react-native-paper';

const EditProfile = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 9,
            padding: 20,
            flexDirection: 'row',
            // alignItems: 'center',
          }}>
          <FontAwesome5
          onPress={() => navigation.goBack()}
            name="arrow-left"
            size={25}
            color={Color.black}
            style={{justifyContent: 'center'}}
          />
          <Text
            style={{
              color: Color.black,
              fontFamily: Fonts.primarySemiBold,
              fontSize: 18,
              marginLeft: 30,
            }}>
            Edit Profile
          </Text>
        </View>

        <View style={{}}>
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <Text
              style={{
                color: Color.black,
                fontFamily: Fonts.primarySemiBold,
                fontSize: 15,
              }}>
              first name
            </Text>
            <TextInput
              underlineColor={'transparent'}
              autoFocus
              outlineColor={'#ffff'}
              //   placeholder="User ID"
              style={{borderBottomWidth: 0.5}}
            />
          </View>
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <Text
              style={{
                color: Color.black,
                fontFamily: Fonts.primarySemiBold,
                fontSize: 15,
              }}>
              last name
            </Text>
            <TextInput
              underlineColor={'transparent'}
              autoFocus
              outlineColor={'#ffff'}
              //   placeholder="User ID"
              style={{borderBottomWidth: 0.5}}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginBottom: 20,
          backgroundColor: Color.lightsteelblue,
          padding: 15,
          width: '80%',
          alignSelf: 'center',
          borderRadius: 5,
          elevation: 9,
          bottom: 0,
        }}>
        <Text
          style={{
            color: '#fff',
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: '500',
          }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
