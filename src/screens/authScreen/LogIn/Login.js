  import React, {useState, useEffect} from 'react';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import LinearGradient from 'react-native-linear-gradient';

  // import all the components we are going to use
  import {
    Switch,
    View,
    Text,
    Image,
    TouchableOpacity,
    Button,
    Dimensions,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
    ToastAndroid,
    StatusBar,
  } from 'react-native';
  import {TextInput} from 'react-native-paper';
  import {Color, Fonts} from '../../../theme';
  import {postData} from '../../../API';
  import {showMessage} from 'react-native-flash-message';
  import {useDispatch} from 'react-redux';
  import {CommonActions, useFocusEffect} from '@react-navigation/native';

  const Login = ({navigation}) => {
    const {width, height} = Dimensions.get('window');
    // const dispatch = useDispatch();

    const [showNewPass, setShowNewPass] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispatch = useDispatch();

    const submit = async () => {
      if (email === '') {
        Alert.alert('email is req');
      } else if (!email.includes('@')) {
        Alert.alert('email is not valid');
      } else if (password === '') {
        Alert.alert('password is req');
      } else {
        var body = {
          email: email,
          password: password,
        };

        const response = await postData('hotellogin', body);

        console.log('response', response);
        if (response.message == 'Login Successfully') {
          showMessage({
            message: response.message,
            // description: 'This is our second message',
            // type: 'success',
            color: Color.white,
            backgroundColor: Color.lightsteelblue,
          });
          dispatch({
            type: 'SET_USER',
            payload: response.data,
          });
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Index'}],
            }),
          );
        } else {
          showMessage({
            message: response.message,
            // description: 'This is our second message',
            // type: 'danger',
            color: Color.white,
            backgroundColor: Color.red,
          });
        }
      }
    };

    return (
      <View style={{flex: 1, backgroundColor: Color.white}}>
        <View
          style={{
            // backgroundColor: '#ffff',
            justifyContent: 'center',
            // height: height * 1,
            flex: 1,
          }}>
          <View style={{padding: 20, justifyContent: 'center'}}>
            <View style={{justifyContent: 'center'}}>
            <Image
              style={{
                width: 200,
                height: 200,
                borderRadius: 10,
                alignSelf: 'center',
                margin: 20,
              }}
              source={require('../../../../assets/image/applogo.png')}
            />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  padding: 10,
                  color: '#000',
                  // fontWeight: 'bold',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Login
              </Text>
            </View>

            <TextInput
              underlineColor={'transparent'}
              left={<TextInput.Icon icon="email" />}
              autoFocus
              outlineColor={'#ffff'}
              onChangeText={e => setEmail(e)}
              placeholder="Email ID"
              mode="outlined"
              style={styles.txtinput}
            />
            <View>
              <TextInput
                style={{...styles.txtinput, marginTop: 10}}
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
                // value={password}
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
              }}
              onPress={() => submit()}>
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontSize: 18,
                  // fontWeight: '500',
                  fontFamily: Fonts.primarySemiBold,
                }}>
                Login
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
                New to the app?{' '}
                <Text
                  style={{color: Color.lightsteelblue}}
                  onPress={() => navigation.navigate('SignUp')}>
                  Register
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  export default Login;

  const styles = StyleSheet.create({
    txtinput: {
      borderWidth: 0.5,
      borderRadius: 5,
    },
  });
