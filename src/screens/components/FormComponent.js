// HotelGuestForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const HotelGuestForm = ({ onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState('');

  const handleSave = () => {
    if (name && email && checkInDate) {
      onSave({ name, email, checkInDate });
      setName('');
      setEmail('');
      setCheckInDate('');
    } else {
      // Handle validation or show an error message
    }
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput
        placeholder="Enter guest name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text>Email:</Text>
      <TextInput
        placeholder="Enter guest email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <Text>Check-in Date:</Text>
      <TextInput
        placeholder="Enter check-in date"
        value={checkInDate}
        onChangeText={text => setCheckInDate(text)}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default HotelGuestForm;
