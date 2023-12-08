import { View, Text } from 'react-native'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

const LogOut = ({navigation}) => {
    const dispatch = useDispatch();

    const LogOut = () =>{
        dispatch({type: 'LOGOUT'});
      
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      }
      React.useEffect(() => {
      
     LogOut();

      }, [])
      
  return (

    <View>
      {/* <Text>LogOut</Text> */}
    </View>
  )
}

export default LogOut