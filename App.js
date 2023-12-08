import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import MainStack from './src/navigation/MainStack';
import {NavigationContainer} from '@react-navigation/native';
import {Color} from './src/theme';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './src/Redux/Store';

const App = () => {

  let {store, persistor} = configureStore ();

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <StatusBar
        animated={true}
        // backgroundColor="#1e90ff"
        backgroundColor={Color.lightsteelblue}
        barStyle="dark-content"
      />
      <MainStack />
      <FlashMessage position="top" />
    </NavigationContainer>
    </PersistGate>
    </Provider>
  );
};

export default App;
