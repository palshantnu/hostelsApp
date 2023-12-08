import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect} from 'react';
import Bottomnavbar from '../../../navigation/BottomNavigation';
import {Color, Fonts} from '../../../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {postData} from '../../../API';
// import { TextInput } from 'react-native-paper';

const Profile = ({navigation}) => {
  const {width, height} = Dimensions.get('window');

  const [profileDetails, setprofileDetails] = React.useState([]);
  const user = useSelector(state => state.user);
  console.log('user', user);
  const getFavourateHotels = async () => {
    var body = {
      user_id: user.id,
    };

    console.log('body', body);

    const response = await postData('userprofile', body);

    console.log('response', response);

    setprofileDetails(response.data);
  };

  useEffect(() => {
    getFavourateHotels();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
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
            Profile
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
              Name
            </Text>
            <TextInput
              underlineColor={'transparent'}
              autoFocus
              outlineColor={'#ffff'}
              //   placeholder="User ID"
              style={{
                borderBottomWidth: 0.5,
                color: Color.gray,
                fontFamily: Fonts.primarySemiBold,
              }}
              value={profileDetails.name}
              editable={false}
            />
          </View>
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <Text
              style={{
                color: Color.black,
                fontFamily: Fonts.primarySemiBold,
                fontSize: 15,
              }}>
              Email
            </Text>
            <TextInput
              underlineColor={'transparent'}
              autoFocus
              outlineColor={'#ffff'}
              //   placeholder="User ID"
              editable={false}
              value={profileDetails.email}
              style={{
                borderBottomWidth: 0.5,
                color: Color.gray,
                fontFamily: Fonts.primarySemiBold,
              }}
            />
          </View>
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <Text
              style={{
                color: Color.black,
                fontFamily: Fonts.primarySemiBold,
                fontSize: 15,
              }}>
              Mobile
            </Text>
            <TextInput
              underlineColor={'transparent'}
              autoFocus
              outlineColor={'#ffff'}
              //   placeholder="User ID"
              editable={false}
              value={profileDetails.mobile}
              style={{
                borderBottomWidth: 0.5,
                color: Color.gray,
                fontFamily: Fonts.primarySemiBold,
              }}
            />
          </View>
        </View>
      </View>
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
