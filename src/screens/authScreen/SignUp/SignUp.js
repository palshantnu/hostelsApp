import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showMessage} from 'react-native-flash-message';
import {postData} from '../../../API';
import {Color, Fonts} from '../../../theme';
const {height} = Dimensions.get('window');

const SignUp = ({navigation}) => {
  const [showNewPass, setShowNewPass] = React.useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const postDataSignUp = async () => {
    if (name === '') {
      alert('name is req');
    } else if (email === '') {
      alert('email is req');
    } else if (!email.includes('@')) {
      alert('email is not valid');
    } else if (password === '') {
      alert('password is req');
    } else if (phone === '') {
      alert('Mobile number is req');
    } else if (phone.length != 10) {
      alert('Please enter valid number');
    } else {
      var body = {
        name: name,
        email: email,
        password: password,
        mobile: phone,
      };

      const response = await postData('hostelsignup', body);

      console.log('response', response);
      if (response.message == 'User registered successfully') {
        showMessage({
          message: response.message,
          // description: 'This is our second message',
          type: 'success',
        });
        navigation.navigate('Login');
      } else {
        showMessage({
          message: 'Error',
          // description: 'This is our second message',
          type: 'danger',
        });
      }
    }
  };
  return (
    <ScrollView style={{backgroundColor: '#ffff', height: height * 1}}>
      <View style={{padding: 20, marginTop: '20%'}}>
        <View>
          <Text
            style={{
              fontSize: 30,
              padding: 0,
              color: Color.lightsteelblue,
              //   fontWeight: 'bold',
              fontFamily: Fonts.primarySemiBold,
            }}>
            Join Us !
          </Text>
          <Text
            style={{
              color: Color.lightsteelblue,
              fontFamily: Fonts.primarySemiBold,
            }}>
            open a free account now
          </Text>
        </View>

        <View>
          <View style={{marginTop: 20}}>
            <TextInput
              underlineColor={'transparent'}
              left={
                <TextInput.Icon
                  icon={() => <Icon name={'user-circle'} size={20} />}
                />
              }
              autoFocus
              outlineColor={'#ffff'}
              onChangeText={setName}
              placeholder="Name"
              mode="outlined"
              style={styles.txtinput}
            />
          </View>

          <View style={{marginTop: 20}}>
            <TextInput
              underlineColor={'transparent'}
              left={
                <TextInput.Icon
                  icon={() => <Icon name={'envelope-o'} size={20} />}
                />
              }
              autoFocus
              outlineColor={'#ffff'}
              onChangeText={setEmail}
              placeholder="Email"
              mode="outlined"
              style={styles.txtinput}
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextInput
              underlineColor={'transparent'}
              left={
                <TextInput.Icon
                  icon={() => <Icon name={'phone'} size={20} />}
                />
              }
              autoFocus
              outlineColor={'#ffff'}
              onChangeText={setPhone}
              placeholder="Mobile No."
              mode="outlined"
              style={styles.txtinput}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextInput
              style={styles.txtinput}
              mode="outlined"
              secureTextEntry={showNewPass}
              outlineColor={'#ffff'}
              right={
                <TextInput.Icon
                  icon={showNewPass ? 'eye-off' : 'eye'}
                  onPress={() => setShowNewPass(prev => !prev)}
                />
              }
              left={<TextInput.Icon icon="lock" />}
              value={password}
              autoFocus
              onChangeText={text => {
                setPassword(text);
              }}
              placeholder={'Password'}

              // label="Password"
            />
          </View>
          <TouchableOpacity
            style={{
              marginTop: 30,
              backgroundColor: Color.lightsteelblue,
              padding: 15,
              width: '100%',
              alignSelf: 'center',
              borderRadius: 5,
              elevation: 9,
              fontFamily: Fonts.primarySemiBold,
            }}
            onPress={() => postDataSignUp()}>
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
                fontSize: 18,
                fontWeight: '500',
              }}>
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 30,
              backgroundColor: '#fffff',
              padding: 15,
              width: '100%',
              alignSelf: 'center',
              borderRadius: 5,
              borderWidth: 2,
              borderColor: Color.lightsteelblue,
            }}>
            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                fontSize: 15,
                fontWeight: '500',
              }}>
              Already registered ?{' '}
              <Text
                style={{color: Color.lightsteelblue}}
                onPress={() => navigation.navigate('Login')}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    // borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginBottom: 30,
  },

  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    margin: 5,
    borderColor: '#9932cc',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    lineHeight: 16 * 1.4,
  },
  txtinput: {
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
