import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Biometrics from 'react-native-biometrics';

const BiometricAuthApp = () => {
  const [biometricType, setBiometricType] = useState(''); // To store the available biometric type

  // Check for biometric availability
  const checkBiometricAvailability = () => {
    Biometrics.isSensorAvailable()
      .then((result) => {
        setBiometricType(result.biometryType); // Set the available biometric type
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Authenticate with biometrics
  const authenticateWithBiometrics = () => {
    Biometrics.simplePrompt('Authenticate with Biometrics')
      .then((result) => {
        console.log('Biometric Authentication Successful', result);
      })
      .catch((error) => {
        console.log('Biometric Authentication Failed', error);
      });
  };

  return (
    <View>
      <Text>Biometric Type: {biometricType}</Text>
      <TouchableOpacity onPress={checkBiometricAvailability}>
        <Text>Check Biometric Availability</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={authenticateWithBiometrics}>
        <Text>Authenticate with Biometrics</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BiometricAuthApp;
