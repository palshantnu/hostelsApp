// FormComponent.js
import React, { useState } from 'react';
import { View, Button, ScrollView, Text } from 'react-native';
import HotelGuestForm from './FormComponent';

const FormComponent = () => {
  const [guests, setGuests] = useState([]);

  const handleAddGuest = guestData => {
    setGuests([...guests, guestData]);
  };
  const handleAddForm = () => {
    setGuests([...guests, {}]); // Add an empty form to the state
  };
  console.log(guests);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {guests.length === 0 ? (
          <Text>No guests added yet.</Text>
        ) : (
          guests.map((guest, index) => (
            <View key={index}>
              <Text>Name: {guest.name}</Text>
              <Text>Email: {guest.email}</Text>
              <Text>Check-in Date: {guest.checkInDate}</Text>
            </View>
          ))
        )}
        <HotelGuestForm onSave={handleAddGuest} />
      </ScrollView>
      <Button title="Add Guest" onPress={() => handleAddForm()} />
    </View>
  );
};

export default FormComponent;
