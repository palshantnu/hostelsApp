import React, {useState} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import WS from 'react-native-websocket';
import {Color} from '../theme';

const WebSocket = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleOpen = () => {
    console.log('WebSocket connection opened');
    socket.onmessage = e => {
      console.log('Received message from the server:', e.data);
    };
    // You can send a welcome message here or perform other actions upon connection.
  };

  const handleMessage = message => {
    console.log('Received message:', message);
    // Update the message state with the received message
    setMessage(JSON.stringify(message));
    setMessages(prevMessages => [...prevMessages, message]);
  };
  console.log('messages', messages);
  const handleError = error => {
    console.log('WebSocket error:', error);
  };

  const handleClose = () => {
    console.log('WebSocket connection closed');
  };

  const sendMessage = () => {
    if (text.trim() !== '') {
      // Send the message through the WebSocket
      if (this.ws) {
        this.ws.send(text);
      }
      setText('');
    }
  };

  return (
    <View style={{backgroundColor: '#fff'}}>
      <WS
        ref={ref => {
          this.ws = ref;
        }}
        url="ws://192.168.29.138:8080"
        onOpen={handleOpen}
        onMessage={handleMessage}
        onError={handleError}
        onClose={handleClose}
        reconnect // Will try to reconnect onClose
      />
      {/* {messages.map(item => {
        return <Text style={{color: Color.black}}>{item.data}</Text>;
      })} */}
      <Text
        style={{
          color: Color.black,
          alignSelf: 'center',
          backgroundColor: messages.length % 2 === 0 ? 'red' : 'green',
        }}>
        {messages.length}
      </Text>
      <TextInput
        value={text}
        onChangeText={inputText => setText(inputText)}
        placeholder="Type your message"
      />
      <TouchableOpacity style={{padding: 20}} onPress={sendMessage}>
        <Text style={{color: 'black'}}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WebSocket;
