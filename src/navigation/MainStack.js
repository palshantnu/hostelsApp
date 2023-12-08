import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../screens/mainScreen/homescreen/Index';
import Favourites from '../screens/mainScreen/Favourites/Favourites';
import Settings from '../screens/mainScreen/Settings/Settings';
import EditProfile from '../screens/mainScreen/EditProfile/EditProfile';
import Profile from '../screens/mainScreen/Profile/Profile';
import SearchBar from '../screens/components/SearchBar';
import Stays from '../screens/mainScreen/Stays/Stays';
import RoomDetails from '../screens/mainScreen/RoomDetails/RoomDetails';
import BookNow from '../screens/mainScreen/BookNow/BookNow';
import SignUp from '../screens/authScreen/SignUp/SignUp';
import Login from '../screens/authScreen/LogIn/Login';
import {useSelector} from 'react-redux';
import LogOut from '../screens/authScreen/LogOut/LogOut';
import BookingHistoryScreen from '../screens/mainScreen/BookingHistoryScreen/BookingHistoryScreen';

const Stack = createStackNavigator();

const MainStack = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName={isLoggedIn ? 'Index' : 'Login'}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Index"
        component={Index}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Favourites"
        component={Favourites}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SearchBar"
        component={SearchBar}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Stays"
        component={Stays}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="RoomDetails"
        component={RoomDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BookNow"
        component={BookNow}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BookingHistoryScreen"
        component={BookingHistoryScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LogOut"
        component={LogOut}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
