import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';

import {Color, Fonts} from '../../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Searchbar} from 'react-native-paper';
import {postData} from '../../API';
// import { TextInput } from 'react-native-paper';

const SearchBar = ({navigation,route}) => {
  const {width, height} = Dimensions.get('window');
  const [searchQuery, setSearchQuery] = useState('');
  const [City, setCity] = useState([]);

  const getCity = async citys => {
    console.log('citys', citys);
    var body = {
      city: citys,
    };

    const response = await postData('statecity', body);
    setCity(response.data);
    console.log(response);
    setShowDropdown(true);
  };
  const [selectedValue, setSelectedValue] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  console.log('hjsh', City);
  const selectItem = item => {
    navigation.navigate('Index', {item: item});
    // setSelectedValue(item);
    // setShowDropdown(false);
  };

  return (
    <View style={{backgroundColor: '#fff', height: height * 1}}>
      <View style={{}}>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 9,
            padding: 20,
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <FontAwesome5
            name="arrow-left"
            size={25}
            color={Color.black}
            style={{justifyContent: 'center'}}
          />
          <Searchbar
            onPressIn={() => navigation.navigate('SearchBar')}
            placeholder="Search"
            onChangeText={txt => getCity(txt)}
            // value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.input}
            iconColor="#007AFF" // Customize icon color
          />
        </View>
      </View>
      {showDropdown && (
        <FlatList
          style={{position: 'relative', marginTop: 0, zIndex: 10}}
          data={City}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={{padding: 16, backgroundColor: Color.white}}>
              {console.log('jksa', item.city)}
              <Text
                onPress={() => selectItem(item)}
                style={{color: Color.black}}>
                {item.city} , {item.state}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SearchBar;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  searchBar: {
    width: width / 1.3, // Half of the screen's width
    borderRadius: 10, // Customize border radius
    elevation: 2, // Add shadow
    backgroundColor: '#fff', // Background color
    borderWidth: 0.2,
    height: height / 20,
  },
  input: {
    fontSize: 15, // Customize font size
    color: '#000', // Text color
    alignSelf: 'center',
  },
});
