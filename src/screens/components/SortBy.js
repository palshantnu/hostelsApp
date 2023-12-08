import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import {ScrollView} from 'react-native-gesture-handler';
import {Button, Checkbox} from 'react-native-paper';
import {Color, Fonts} from '../../theme';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const SortBy = ({navigation, posts, ...props}) => {
  // const [sortedProducts, setSortedProducts] = useState([]);
  const [sortType, setSortType] = useState('price'); // Default sorting type
  const [sortOrder, setSortOrder] = useState('asc');
  //   const item = route.params;
  console.log('itemdcd', props);
  const [products, setProducts] = useState([]); // Your product data
  const [sortedProducts, setSortedProducts] = useState(posts);

  const handleSortChange = sortType => {
    let sorted = [...posts];
    if (sortType === '1') {
      sorted.sort((a, b) => a.price_per_night - b.price_per_night);
    } else if (sortType === '2') {
      sorted.sort((a, b) => b.price_per_night - a.price_per_night);
    }
    setSortedProducts(sorted);
    console.log('sorted', sorted);
  };

  // const sortProducts = async type => {
  //   let sorted = [...posts];
  //   console.log('sor,n  jkted', sorted);
  //   if (type === sortType) {
  //     // Toggle between ascending and descending order when sorting by the same type
  //     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  //   } else {
  //     setSortType(type);
  //     setSortOrder('asc');
  //   }

  //   sorted = sorted.sort((a, b) => {
  //     if (type === 'price') {
  //       return sortOrder === 'asc'
  //         ? parseFloat(a.price_per_night) - parseFloat(b.price_per_night)
  //         : parseFloat(b.price_per_night) - parseFloat(a.price_per_night);
  //     } else if (type === 'name') {
  //       return sortOrder === 'asc'
  //         ? a.name.localeCompare(b.name)
  //         : b.name.localeCompare(a.name);
  //     }
  //     // Add more sorting options as needed
  //   });

  //   setSortedProducts(sorted);
  //   console.log('sorted', sorted);
  // };

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     sortProducts('price');

  //     // The screen is focused
  //     // Call any action
  //   });
  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  const refRBSheet = useRef();
  const sendDataToParent = () => {
    props.onData(sortedProducts);
    // refRBSheet.current.close()
  };
  const [checked, setChecked] = React.useState('');

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 20, padding: 10}}>
          <Text
            style={{
              color: Color.gray,
              fontFamily: Fonts.primarySemiBold,
              fontSize: 15,
            }}>
            SORT BY
          </Text>
        </View>
        <View style={styles.horizontalLine} />

        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: Color.black,
                fontFamily: Fonts.primarySemiBold,
                fontSize: 13,
              }}>
              Low To High
            </Text>
            <Checkbox
              status={checked == '1' ? 'checked' : 'unchecked'}
              onPress={() => {
                handleSortChange('1');
                setChecked('1');
              }}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: Color.black,
                fontFamily: Fonts.primarySemiBold,
                fontSize: 13,
              }}>
              High To Low
            </Text>
            <Checkbox
              status={checked == '2' ? 'checked' : 'unchecked'}
              onPress={() => {
                {
                  handleSortChange('2');
                  setChecked('2');
                }
              }}
            />
          </View>
        </View>

        {/* <Button title={``} onPress={() => sortProducts('price')}>
          Low to High{sortType === 'price' && sortOrder === 'asc' ? '▲' : ''}
        </Button>
        <Button title={``} onPress={() => sortProducts('price')}>
          High to Low{sortType === 'price' && sortOrder === 'desc' ? '▼' : ''}
        </Button> */}
        {/* <Button
          title={`High to Low ${
            sortType === 'price' && sortOrder === 'desc' ? '▼' : ''
          }`}
          onPress={() => sortProducts('price')}
        /> */}
        {/* <Button title={``} onPress={() => sortProducts('price')}>
          A to Z{sortType === 'name' && sortOrder === 'asc' ? '▲' : ''}
        </Button>
        <Button title={``} onPress={() => sortProducts('price')}>
          Z to A{sortType === 'name' && sortOrder === 'desc' ? '▼' : ''}
        </Button> */}
      </View>
      <TouchableOpacity
        onPress={() => sendDataToParent()}
        style={{
          backgroundColor: Color.lightsteelblue,
          padding: 5,
          width: '80%',
          borderRadius: 5,
          elevation: 9,
          alignSelf: 'center',
          // margin: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        {/* <Foundation name="dollar-bill" size={20} color={'#fff'} /> */}
        <Text
          style={{
            color: '#fff',
            alignSelf: 'center',
            fontSize: 15,
            fontWeight: '500',
            marginVertical: 10,
          }}>
          {/* <Text style={styles.txt5}>
              {' '} */}{' '}
          Apply
          {/* </Text> */}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SortBy;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    width: 140,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  horizontalLine: {
    borderBottomColor: '#000', // Change this to the desired line color
    borderBottomWidth: 1, // Change this to the desired line width
  },
});
