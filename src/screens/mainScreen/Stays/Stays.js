import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Searchbar, Modal} from 'react-native-paper';
import {Color, Fonts} from '../../../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Bottomnavbar from '../../../navigation/BottomNavigation';
import {postData} from '../../../API';
import ProfilePlaceholder from '../../components/Loading';
import Entypo from 'react-native-vector-icons/Entypo';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {showMessage} from 'react-native-flash-message';
import Slider from 'react-native-slider';
import RBSheet from 'react-native-raw-bottom-sheet';
import SortBy from '../../components/SortBy';
import {useSelector} from 'react-redux';

const Stays = ({navigation, route}) => {
  const {width, height} = Dimensions.get('window');
  const user = useSelector(state => state.user);
  console.log('user', user);
  const [loading, setLoading] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [Favouriteposts, setFavourite] = React.useState([]);
  const item = route.params;
  const [modalVisible, setModalVisible] = React.useState(false);
  const refRBSheet = useRef();
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // console.log('item', item);

  const getHotelsAndHostels = async () => {
    var body1 = {
      city: item.item.city,
      state: item.item.state,
    };
    var body2 = {
      city: item.item.city,
      state: item.item.state,
      type: item.item.box,
    };
    // console.log('body', body1);

    const response = await postData(
      'alldatahotels',
      item.item.box == 'All' ? body1 : body1,
    );

    // console.log('body1', body1);
    // console.log('response', response.data[0].type[5]);
    //   response.data.map(item2 => {
    //   // Check if the selectedType is null (no filter) or the item's "type" contains the selected type
    //   console.log('item2',item2.type);
    //   // item2.type.filter(item3=>item3 == item.item.box)
    //   const data2 = JSON.stringify(item2.type)
    //   console.log('data2',data2);
    //   for (let index = 0; index < data2.length; index++) {
    //     const element = item2.type;
    //     console.log('element',element);

    //   }

    // });
    const data = response.data;
    function filterDataByType(data, index) {
      return data.filter(item => {
        // Check if the type array has a value at the specified index
        const beasts = JSON.parse(item.type);
        console.log('item.type', JSON.parse(item.type));
        console.log(beasts.indexOf('pg'));
        console.log(beasts.indexOf('hostel'));
        return (
          JSON.parse(item.type)[index] === 'pg' ||
          JSON.parse(item.type)[index] === 'hostel'
        );
      });
    }

    // Example: Filter data at the first index (0) for "pg"
    const filteredDataAtFirstIndex = filterDataByType(data, 0);

    // Example: Filter data at the second index (1) for "hostel"
    const filteredDataAtSecondIndex = filterDataByType(data, 1);

    // Output filtered data

    setLoading(false);
    if (response.data.length > 0) {
      console.log(item.item.box);
      if (item.item.box == 'PG') {
        setPosts(filteredDataAtFirstIndex);
      } else if (item.item.box == 'Hostel') {
        setPosts(filteredDataAtSecondIndex);
      } else {
        setPosts(response.data);
      }

      console.log(
        'Filtered Data at First Index (pg):',
        filteredDataAtFirstIndex,
      );
      console.log(
        'Filtered Data at Second Index (hostel):',
        filteredDataAtSecondIndex,
      );
    }
  };

  const [likes, setlikes] = React.useState([]);
  const Like = [];
  const LikePost = item => {
    // console.log(item);
    // // console.log('item');
    // Likes.push(item);
    // Create an empty array
    const newLikes = [...likes];

    // Add a new like to the copied array
    newLikes.push(item);

    // Update the state with the new array
    setlikes(newLikes);
    Like.push(item); // Push the object into the array
    // console.log('Like', Like);
  };

  const GetFavouriteHotel = async data => {
    console.log('data', data);
    var body = {
      user_id: user.id,
    };

    // console.log('body', body);

    const response = await postData('favourite_get', body);

    // console.log('response', response);
    // ToastAndroid.show('here is your row id... ', ToastAndroid.SHORT);
    if (response.message) {
      setFavourite(response.data);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    getHotelsAndHostels();
    GetFavouriteHotel();
  }, []);

  const PostFavouriteHotel = async (data, status) => {
    // console.log('data', data, status);
    var body = {
      hotel_id: data.id,
      user_id: user.id,
      status: status == 1 ? 0 : 1,
    };

    // console.log('body', body);

    const response = await postData('hotelfavourite', body);

    console.log('response', response);
    // ToastAndroid.show('here is your row id... ', ToastAndroid.SHORT);
    if (response.message) {
      GetFavouriteHotel();
      showMessage({
        message: response.data,
        // description: 'This is our second message',
        type: 'success',
      });
    }
  };

  const snapToIncrement = value => {
    return Math.round(value / 100) * 100;
  };

  // Filter products based on price range

  const filterProducts = () => {
    const filtered = posts.filter(product => {
      const productPrice = parseFloat(product.price_per_night);

      return productPrice >= 100 && productPrice <= minPrice;
    });
    // console.log('product', filtered);
    setFilteredProducts(filtered);
    // console.log('filtered', filtered);
  };

  const [dataFromChild, setDataFromChild] = useState([]);

  const handleChildData = data => {
    setDataFromChild(data);

    refRBSheet.current.close();
  };

  const postRecentPosts = async item => {
    console.log('item', item);
    const body = {
      hotel_id: item.id,
      user_id: user.id,
    };
    console.log('body', body);
    const response = await postData('recenthotel', body);
    // console.log('response', response);
    if (response.message == 'data successfully update') {
      navigation.navigate('RoomDetails', {item: item});
    }
  };

  console.log('dataFromChild', dataFromChild);
  return (
    <View style={{height: height * 1}}>
      <View
        style={{
          position: 'absolute',
          zIndex: 0,
          width: width * 1,
        }}>
        <View style={styles.card}>
          <Text
            style={{
              color: '#000',
              fontFamily: 'Poppins-Regular',
              margin: 10,
              fontSize: 12,
            }}>
            Destination
          </Text>
          <View style={styles.container}>
            <Searchbar
              onPressIn={() => navigation.navigate('SearchBar')}
              placeholder="Search"
              // onChangeText={txt => getCity(txt)}
              value={item.item.city + ' , ' + item.item.state}
              style={styles.searchBar}
              inputStyle={styles.input}
              iconColor="#007AFF" // Customize icon color
            />
          </View>

          <View
            style={{
              width: '90%', // Width of the line
              height: 1, // Height of the line (full height of its parent)
              backgroundColor: 'grey', // Color of the line
              alignSelf: 'center',
              marginTop: 10,
            }}
          />
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 20,
                backgroundColor: '#fff',
                padding: 0,
                borderRadius: 20,
                width: width * 0.75,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: box == 'All' ? Color.lightsteelblue : null,
                  padding: 10,
                  width: width * 0.25,
                }}>
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 16,
                    alignSelf: 'center',
                    color: box == 'All' ? '#fff' : '#000',
                  }}
                  onPress={() => setBox('All')}>
                  All
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor:
                    box == 'Hotels' ? Color.lightsteelblue : null,
                  padding: 10,
                  width: width * 0.25,
                }}>
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 16,
                    alignSelf: 'center',
                    color: box == 'Hotels' ? '#fff' : '#000',
                  }}
                  onPress={() => setBox('Hotels')}>
                  Hotels
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor:
                    box == 'Hostels' ? Color.lightsteelblue : null,
                  padding: 10,
                  width: width * 0.25,
                }}>
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 16,
                    alignSelf: 'center',
                    color: box == 'Hostels' ? '#fff' : '#000',
                  }}
                  onPress={() => setBox('Hostels')}>
                  Hostels
                </Text>
              </View>
            </View>
          </View> */}
          {/* <View
            style={{
              width: '90%', // Width of the line
              height: 1, // Height of the line (full height of its parent)
              backgroundColor: 'grey', // Color of the line
              alignSelf: 'center',
              marginTop: 10,
            }}
          /> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingVertical: 15,
            }}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{alignContent: 'center', flexDirection: 'row'}}>
              <AntDesign
                name="bars"
                size={20}
                color={Color.lightsteelblue}
                style={{justifyContent: 'center'}}
              />
              <Text
                style={{
                  color: Color.lightsteelblue,
                  fontFamily: 'Poppins-SemiBold',
                  margin: 0,
                  fontSize: 15,
                  textAlign: 'justify',
                }}>
                {'  '}
                FILTERS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={{alignItems: 'center', flexDirection: 'row'}}>
              <Octicons
                name="sort-desc"
                size={20}
                color={Color.lightsteelblue}
                style={{justifyContent: 'center'}}
              />
              <Text
                style={{
                  color: Color.lightsteelblue,
                  fontFamily: 'Poppins-SemiBold',
                  margin: 0,
                  fontSize: 15,
                }}>
                {'  '}
                SORT
              </Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            style={{
              marginTop: 15,
              backgroundColor: Color.lightsteelblue,
              padding: 10,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 5,
              elevation: 9,
            }}>
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
                fontSize: 18,
                fontFamily: Fonts.primarySemiBold,
              }}>
              Search
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView
        // horizontal={true}
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 0,
          backgroundColor: Color.white,
          marginBottom: height * 0.09,
          zIndex: -1,
        }}>
        {loading ? (
          <View style={{marginTop: height * 0.28}}>
            <ProfilePlaceholder />
            {console.log('filteredProducts', filteredProducts)}
          </View>
        ) : (
          <View>
            {dataFromChild.length > 0 ? (
              <View>
                <View style={{height: height * 0.28}} />
                {dataFromChild.map(item => {
                  return (
                    <View
                      style={{
                        width: width * 0.9,
                        backgroundColor: '#fff',
                        elevation: 5,
                        borderRadius: 10,
                        marginBottom: 20,
                        marginHorizontal: 10,
                        alignSelf: 'center',
                      }}>
                      <View style={{}}>
                        <Image
                          style={{
                            width: width * 0.9,
                            height: height * 0.2,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                          }}
                          resizeMode="cover"
                          source={{
                            uri: `https://hostel.propertyindholera.com/public/hotelmultipleimage/${item.bannerimage}`,
                          }}
                        />
                        <View
                          style={{
                            position: 'absolute',
                            alignSelf: 'flex-end',
                            paddingRight: 10,
                            paddingTop: 10,
                          }}>
                          {Favouriteposts.filter(
                            item2 => item2.hotel_id == item.id,
                          ).map(data => {
                            return (
                              <View>
                                <Entypo
                                  name={'heart'}
                                  size={25}
                                  color={
                                    data.status == 0 ? Color.white : Color.red
                                  }
                                  style={{justifyContent: 'center'}}
                                  onPress={() =>
                                    PostFavouriteHotel(item, data.status)
                                  }
                                />
                              </View>
                            );
                          })}
                          {Favouriteposts.filter(
                            item2 => item2.hotel_id == item.id,
                          ).length == 0 && (
                            <Entypo
                              name={'heart'}
                              size={25}
                              color={Color.white}
                              style={{justifyContent: 'center'}}
                              onPress={() => PostFavouriteHotel(item, 0)}
                            />
                          )}
                          {/* {likes.length > 0 &&
                            [...new Set(likes)].map(item1 => {
                              {
                                console.log('djbsxj', [...new Set(likes)]);
                              }
                              return (
                                <View>
                                  {item1.id == item.id ? (
                                    <Entypo
                                      name={'heart'}
                                      size={25}
                                      color={'red'}
                                      style={{justifyContent: 'center'}}
                                      onPress={() => LikePost(item)}
                                    />
                                  ) : (
                                    <Entypo
                                      name={'heart'}
                                      size={25}
                                      color={'white'}
                                      style={{justifyContent: 'center'}}
                                      onPress={() => LikePost(item)}
                                    />
                                  )}
                                </View>
                              );
                            })}
                          {likes.length == 0 && (
                            <View>
                              <Entypo
                                name={'heart'}
                                size={25}
                                color={Color.white}
                                style={{justifyContent: 'center'}}
                                onPress={() => LikePost(item)}
                              />
                            </View>
                          )} */}
                        </View>
                      </View>
                      <View style={{paddingHorizontal: 15, marginTop: -30}}>
                        <Text
                          style={{
                            color: Color.black,
                            alignSelf: 'left',
                            fontSize: 15,
                            fontFamily: Fonts.primarySemiBold,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              marginVertical: 10,
                              justifyContent: 'center',
                            }}>
                            <AirbnbRating
                              count={5}
                              defaultRating={item.rating}
                              size={15}
                              reviews={false}
                            />
                          </Text>{' '}
                        </Text>
                      </View>
                      <View style={{paddingHorizontal: 15, padding: 0}}>
                        <Text
                          style={{
                            color: Color.black,
                            alignSelf: 'left',
                            fontSize: 15,
                            fontFamily: Fonts.primarySemiBold,
                          }}>
                          {item.name}
                          {'  '}
                          {/*  */}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => postRecentPosts(item)}
                        style={{
                          marginHorizontal: 10,
                          paddingVertical: 12,
                          paddingHorizontal: 5,
                          borderWidth: 0.5,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            color: Color.darkgreen,
                            alignSelf: 'left',
                            fontSize: 15,
                            fontFamily: Fonts.primarySemiBold,
                          }}>
                          ₹ {item.price_per_night}
                          {'  '}
                          {/*  */}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: Color.black,
                              alignSelf: 'left',
                              fontSize: 15,
                              fontFamily: Fonts.primarySemiBold,
                            }}>
                            View Deal{'  '}
                          </Text>
                          <FontAwesome5
                            name="chevron-right"
                            size={20}
                            color={Color.black}
                            style={{justifyContent: 'center'}}
                          />
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            backgroundColor: Color.darkgreen,
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                            justifyContent: 'center',
                            margin: 10,
                          }}>
                          <Text
                            style={{
                              color: Color.white,
                              alignSelf: 'baseline',
                              fontSize: 12,
                              fontFamily: Fonts.primarySemiBold,
                              // marginLeft: 10,
                              textAlign: 'center',
                              alignSelf: 'center',
                            }}>
                            9
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: Color.black,
                            alignSelf: 'center',
                            fontSize: 12,
                            fontFamily: Fonts.primarySemiBold,
                          }}>
                          {item.city}
                          {'  '}
                          {item.state}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View>
                {filteredProducts.length > 0 ? (
                  <View>
                    <View style={{height: height * 0.28}} />
                    {filteredProducts.length > 0 ? (
                      <View>
                        {filteredProducts.map(item => {
                          return (
                            <View
                              style={{
                                width: width * 0.9,
                                backgroundColor: '#fff',
                                elevation: 5,
                                borderRadius: 10,
                                marginBottom: 20,
                                marginHorizontal: 10,
                                alignSelf: 'center',
                              }}>
                              <View style={{}}>
                                <Image
                                  style={{
                                    width: width * 0.9,
                                    height: height * 0.2,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                  }}
                                  resizeMode="cover"
                                  source={{
                                    uri: `https://hostel.propertyindholera.com/public/hotelmultipleimage/${item.bannerimage}`,
                                  }}
                                />
                                <View
                                  style={{
                                    position: 'absolute',
                                    alignSelf: 'flex-end',
                                    paddingRight: 10,
                                    paddingTop: 10,
                                  }}>
                                  {Favouriteposts.filter(
                                    item2 => item2.hotel_id == item.id,
                                  ).map(data => {
                                    return (
                                      <View>
                                        <Entypo
                                          name={'heart'}
                                          size={25}
                                          color={
                                            data.status == 0
                                              ? Color.white
                                              : Color.red
                                          }
                                          style={{justifyContent: 'center'}}
                                          onPress={() =>
                                            PostFavouriteHotel(
                                              item,
                                              data.status,
                                            )
                                          }
                                        />
                                      </View>
                                    );
                                  })}
                                  {Favouriteposts.filter(
                                    item2 => item2.hotel_id == item.id,
                                  ).length == 0 && (
                                    <Entypo
                                      name={'heart'}
                                      size={25}
                                      color={Color.white}
                                      style={{justifyContent: 'center'}}
                                      onPress={() =>
                                        PostFavouriteHotel(item, 0)
                                      }
                                    />
                                  )}
                                  {/* {likes.length > 0 &&
                            [...new Set(likes)].map(item1 => {
                              {
                                console.log('djbsxj', [...new Set(likes)]);
                              }
                              return (
                                <View>
                                  {item1.id == item.id ? (
                                    <Entypo
                                      name={'heart'}
                                      size={25}
                                      color={'red'}
                                      style={{justifyContent: 'center'}}
                                      onPress={() => LikePost(item)}
                                    />
                                  ) : (
                                    <Entypo
                                      name={'heart'}
                                      size={25}
                                      color={'white'}
                                      style={{justifyContent: 'center'}}
                                      onPress={() => LikePost(item)}
                                    />
                                  )}
                                </View>
                              );
                            })}
                          {likes.length == 0 && (
                            <View>
                              <Entypo
                                name={'heart'}
                                size={25}
                                color={Color.white}
                                style={{justifyContent: 'center'}}
                                onPress={() => LikePost(item)}
                              />
                            </View>
                          )} */}
                                </View>
                              </View>
                              <View
                                style={{paddingHorizontal: 15, marginTop: -30}}>
                                <Text
                                  style={{
                                    color: Color.black,
                                    alignSelf: 'left',
                                    fontSize: 15,
                                    fontFamily: Fonts.primarySemiBold,
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      marginVertical: 10,
                                      justifyContent: 'center',
                                    }}>
                                    <AirbnbRating
                                      count={5}
                                      defaultRating={item.rating}
                                      size={15}
                                      reviews={false}
                                    />
                                  </Text>{' '}
                                </Text>
                              </View>
                              <View style={{paddingHorizontal: 15, padding: 0}}>
                                <Text
                                  style={{
                                    color: Color.black,
                                    alignSelf: 'left',
                                    fontSize: 15,
                                    fontFamily: Fonts.primarySemiBold,
                                  }}>
                                  {item.name}
                                  {'  '}
                                  {/*  */}
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => postRecentPosts(item)}
                                style={{
                                  marginHorizontal: 10,
                                  paddingVertical: 12,
                                  paddingHorizontal: 5,
                                  borderWidth: 0.5,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  style={{
                                    color: Color.darkgreen,
                                    alignSelf: 'left',
                                    fontSize: 15,
                                    fontFamily: Fonts.primarySemiBold,
                                  }}>
                                  ₹ {item.price_per_night}
                                  {'  '}
                                  {/*  */}
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{
                                      color: Color.black,
                                      alignSelf: 'left',
                                      fontSize: 15,
                                      fontFamily: Fonts.primarySemiBold,
                                    }}>
                                    View Deal{'  '}
                                  </Text>
                                  <FontAwesome5
                                    name="chevron-right"
                                    size={20}
                                    color={Color.black}
                                    style={{justifyContent: 'center'}}
                                  />
                                </View>
                              </TouchableOpacity>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    backgroundColor: Color.darkgreen,
                                    width: 30,
                                    height: 30,
                                    borderRadius: 50,
                                    justifyContent: 'center',
                                    margin: 10,
                                  }}>
                                  <Text
                                    style={{
                                      color: Color.white,
                                      alignSelf: 'baseline',
                                      fontSize: 12,
                                      fontFamily: Fonts.primarySemiBold,
                                      // marginLeft: 10,
                                      textAlign: 'center',
                                      alignSelf: 'center',
                                    }}>
                                    9
                                  </Text>
                                </View>
                                <Text
                                  style={{
                                    color: Color.black,
                                    alignSelf: 'center',
                                    fontSize: 12,
                                    fontFamily: Fonts.primarySemiBold,
                                  }}>
                                  {item.city}
                                  {'  '}
                                  {item.state}
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    ) : (
                      <View>
                        <Image
                          style={{
                            width: width * 0.9,
                            height: height * 0.2,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            alignSelf: 'center',
                          }}
                          resizeMode="cover"
                          source={{
                            uri: 'https://cdn.vectorstock.com/i/preview-1x/02/55/no-data-and-search-not-found-concept-vector-47040255.jpg',
                          }}
                        />
                      </View>
                    )}
                  </View>
                ) : (
                  <View>
                    <View style={{height: height * 0.28}} />
                    {posts.length > 0 ? (
                      <View>
                        {posts.map(item => {
                          return (
                            <View
                              style={{
                                width: width * 0.9,
                                backgroundColor: '#fff',
                                elevation: 5,
                                borderRadius: 10,
                                marginBottom: 20,
                                marginHorizontal: 10,
                                alignSelf: 'center',
                              }}>
                              <View style={{}}>
                                <Image
                                  style={{
                                    width: width * 0.9,
                                    height: height * 0.2,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                  }}
                                  resizeMode="cover"
                                  source={{
                                    uri: `https://hostel.propertyindholera.com/public/hotelmultipleimage/${item.bannerimage}`,
                                  }}
                                />
                                <View
                                  style={{
                                    position: 'absolute',
                                    alignSelf: 'flex-end',
                                    paddingRight: 10,
                                    paddingTop: 10,
                                  }}>
                                  {Favouriteposts.filter(
                                    item2 => item2.hotel_id == item.id,
                                  ).map(data => {
                                    return (
                                      <View>
                                        <Entypo
                                          name={'heart'}
                                          size={25}
                                          color={
                                            data.status == 0
                                              ? Color.white
                                              : Color.red
                                          }
                                          style={{justifyContent: 'center'}}
                                          onPress={() =>
                                            PostFavouriteHotel(
                                              item,
                                              data.status,
                                            )
                                          }
                                        />
                                      </View>
                                    );
                                  })}
                                  {Favouriteposts.filter(
                                    item2 => item2.hotel_id == item.id,
                                  ).length == 0 && (
                                    <Entypo
                                      name={'heart'}
                                      size={25}
                                      color={Color.white}
                                      style={{justifyContent: 'center'}}
                                      onPress={() =>
                                        PostFavouriteHotel(item, 0)
                                      }
                                    />
                                  )}
                                  {/* {likes.length > 0 &&
                            [...new Set(likes)].map(item1 => {
                              {
                                console.log('djbsxj', [...new Set(likes)]);
                              }
                              return (
                                <View>
                                  {item1.id == item.id ? (
                                    <Entypo
                                      name={'heart'}
                                      size={25}
                                      color={'red'}
                                      style={{justifyContent: 'center'}}
                                      onPress={() => LikePost(item)}
                                    />
                                  ) : (
                                    <Entypo
                                      name={'heart'}
                                      size={25}
                                      color={'white'}
                                      style={{justifyContent: 'center'}}
                                      onPress={() => LikePost(item)}
                                    />
                                  )}
                                </View>
                              );
                            })}
                          {likes.length == 0 && (
                            <View>
                              <Entypo
                                name={'heart'}
                                size={25}
                                color={Color.white}
                                style={{justifyContent: 'center'}}
                                onPress={() => LikePost(item)}
                              />
                            </View>
                          )} */}
                                </View>
                              </View>
                              <View
                                style={{paddingHorizontal: 15, marginTop: -30}}>
                                <Text
                                  style={{
                                    color: Color.black,
                                    alignSelf: 'left',
                                    fontSize: 15,
                                    fontFamily: Fonts.primarySemiBold,
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      marginVertical: 10,
                                      justifyContent: 'center',
                                    }}>
                                    <AirbnbRating
                                      count={5}
                                      defaultRating={item.rating}
                                      size={15}
                                      reviews={false}
                                    />
                                  </Text>{' '}
                                </Text>
                              </View>
                              <View style={{paddingHorizontal: 15, padding: 0}}>
                                <Text
                                  style={{
                                    color: Color.black,
                                    alignSelf: 'left',
                                    fontSize: 15,
                                    fontFamily: Fonts.primarySemiBold,
                                  }}>
                                  {item.name}
                                  {'  '}
                                  {/*  */}
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => postRecentPosts(item)}
                                style={{
                                  marginHorizontal: 10,
                                  paddingVertical: 12,
                                  paddingHorizontal: 5,
                                  borderWidth: 0.5,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  style={{
                                    color: Color.darkgreen,
                                    alignSelf: 'left',
                                    fontSize: 15,
                                    fontFamily: Fonts.primarySemiBold,
                                  }}>
                                  ₹ {item.price_per_night}
                                  {'  '}
                                  {/*  */}
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{
                                      color: Color.black,
                                      alignSelf: 'left',
                                      fontSize: 15,
                                      fontFamily: Fonts.primarySemiBold,
                                    }}>
                                    View Deal{'  '}
                                  </Text>
                                  <FontAwesome5
                                    name="chevron-right"
                                    size={20}
                                    color={Color.black}
                                    style={{justifyContent: 'center'}}
                                  />
                                </View>
                              </TouchableOpacity>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    backgroundColor: Color.darkgreen,
                                    width: 30,
                                    height: 30,
                                    borderRadius: 50,
                                    justifyContent: 'center',
                                    margin: 10,
                                  }}>
                                  <Text
                                    style={{
                                      color: Color.white,
                                      alignSelf: 'baseline',
                                      fontSize: 12,
                                      fontFamily: Fonts.primarySemiBold,
                                      // marginLeft: 10,
                                      textAlign: 'center',
                                      alignSelf: 'center',
                                    }}>
                                    9
                                  </Text>
                                </View>
                                <Text
                                  style={{
                                    color: Color.black,
                                    alignSelf: 'center',
                                    fontSize: 12,
                                    fontFamily: Fonts.primarySemiBold,
                                  }}>
                                  {item.city}
                                  {'  '}
                                  {item.state}
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    ) : (
                      <View>
                        <Image
                          style={{
                            width: width * 0.9,
                            height: height * 0.2,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            alignSelf: 'center',
                          }}
                          resizeMode="cover"
                          source={{
                            uri: 'https://cdn.vectorstock.com/i/preview-1x/02/55/no-data-and-search-not-found-concept-vector-47040255.jpg',
                          }}
                        />
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{zIndex: 20}}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            // height:500
          }}>
          <View
            style={{
              alignSelf: 'center',
              height: 40,
              padding: 0,
              //   borderWidth: 1,
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 20,
              backgroundColor: '#fff',
              width: width * 0.9,
              //   height: height * 0.7,
              height: height * 0.75,
            }}>
            <View
              style={{
                backgroundColor: Color.lightsteelblue,
                padding: 10,
                marginBottom: 20,
                borderTopEndRadius: 10,
                borderTopLeftRadius: 10,
              }}>
              <Text
                style={{textAlign: 'right'}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Entypo name="cross" color={Color.white} size={30} />
              </Text>
            </View>
            <View style={{flex: 1}}>
              <View style={{flex: 1, paddingHorizontal: 15}}>
                <Text
                  style={{
                    color: Color.black,
                    fontFamily: Fonts.primarySemiBold,
                    fontSize: 15,
                    marginBottom: 20,
                  }}>
                  Price Range: Rs. 100 - Rs.{parseInt(minPrice)}
                </Text>
                <Slider
                  value={minPrice}
                  onValueChange={value => setMinPrice(snapToIncrement(value))}
                  minimumValue={100}
                  maximumValue={50000}
                  step={2}
                  thumbStyle={styles.thumb}
                  minimumTrackTintColor={Color.lightsteelblue}
                />
              </View>

              {/* <Slider
                value={maxPrice}
                onValueChange={value => setMaxPrice(value)}
                minimumValue={0}
                maximumValue={1000}
              /> */}
              <TouchableOpacity
                onPress={() => {
                  filterProducts();
                  setModalVisible(false);
                  getHotelsAndHostels();
                }}
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
                  Apply filter
                  {/* </Text> */}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <RBSheet
        ref={refRBSheet}
        // closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            backgroundColor: '#fff',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
        }}
        height={height * 0.5}>
        <SortBy
          navigation={navigation}
          posts={filteredProducts.length > 0 ? filteredProducts : posts}
          onData={handleChildData}
        />
      </RBSheet>
      <Bottomnavbar navigation={navigation} page={'Home'} />
    </View>
  );
};

export default Stays;
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    width: width * 0.92,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 9,
    // marginBottom: 5,
    margin: 0,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  searchBar: {
    width: width / 1.2, // Half of the screen's width
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
  thumb: {
    backgroundColor: Color.lightsteelblue,
    borderWidth: 2,
    borderColor: 'white',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
});
