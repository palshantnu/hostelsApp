import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Bottomnavbar from '../../../navigation/BottomNavigation';
import {Searchbar} from 'react-native-paper';
import {Color, Fonts} from '../../../theme';
import Toast from 'react-native-simple-toast';
import Entypo from 'react-native-vector-icons/Entypo';
import {getData, postData} from '../../../API';
import {useSelector} from 'react-redux';

const Index = ({navigation, route}) => {
  const {width, height} = Dimensions.get('window');
  const [item1, setItem1] = useState('');
  const [RecentPost, setRecentPost] = useState('');
  // if (route.params) {
  //   console.log(route.params.item.city);
  //   setItem1(route.params.item.city);
  // } else {
  //   console.log('wdkjj');
  // }
  // console.log('bjhsa', item);
  // const [searchQuery, setSearchQuery] = useState('');
  const [City, setCity] = useState('Gwalior');
  const [state, setState] = useState('Madhya Pradesh');

  // const onChangeSearch = query => {
  //   setSearchQuery(query);
  // };
  const [box, setBox] = React.useState('All');
  const user = useSelector(state => state.user);
  console.log('user', user);
  const nextScreen = () => {
    if (route.params) {
      navigation.navigate('Stays', {
        item: {
          box: box,
          city: route.params.item.city,
          state: route.params.item.state,
        },
      });
    } else {
      // Alert.alert('hbs');
      if (City && state) {
        navigation.navigate('Stays', {
          item: {
            box: box,
            city: City,
            state: state,
          },
        });
      } else {
        Alert.alert('select location');
      }
    }
  };

  const getRecentPost = async () => {
    const response = await getData(`recenthotellist/${user.id}`);
    console.log('response', response);
    setRecentPost(response.data);
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getRecentPost();
      // The screen is focused
      // Call any action
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const deleteRecentPost = async id => {
    const body = {
      hotel_id: id,
      user_id: user.id,
    };
    console.log('body',body);
    const response = await postData('recenthoteldelete', body);
    console.log('response', response);
    getRecentPost();
  };

  useEffect(() => {
    getRecentPost();
  }, []);

  return (
    <View style={{height: height * 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: height * 0.09,
          backgroundColor: '#fff',
        }}>
        <View>
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 10,
              alignSelf: 'center',
              margin: 20,
            }}
            source={require('../../../../assets/image/applogo.png')}
          />
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
                value={
                  route.params
                    ? route.params.item.city + ' , ' + route.params.item.state
                    : City + (state && ' , ') + state
                }
                style={styles.searchBar}
                // clearButtonMode="never"
                onClearIconPress={() => {
                  setCity('');
                  setState('');
                }}
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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
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
                      box == 'PG' ? Color.lightsteelblue : null,
                    padding: 10,
                    width: width * 0.25,
                  }}>
                  <Text
                    style={{
                      fontWeight: '800',
                      fontSize: 16,
                      alignSelf: 'center',
                      color: box == 'PG' ? '#fff' : '#000',
                    }}
                    onPress={() => setBox('PG')}>
                    PG
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 20,
                    backgroundColor:
                      box == 'Hostel' ? Color.lightsteelblue : null,
                    padding: 10,
                    width: width * 0.25,
                  }}>
                  <Text
                    style={{
                      fontWeight: '800',
                      fontSize: 16,
                      alignSelf: 'center',
                      color: box == 'Hostel' ? '#fff' : '#000',
                    }}
                    onPress={() => setBox('Hostel')}>
                    Hostels
                  </Text>
                </View>
              </View>
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
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: 15,
              }}>
              <TouchableOpacity
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
            </View> */}
            <TouchableOpacity
              onPress={() => nextScreen()}
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
            </TouchableOpacity>
          </View>
          {/* <View style={{marginLeft: 0}}>
            <Text
              style={{
                color: 'grey',
                alignSelf: 'left',
                fontSize: 15,
                fontFamily: Fonts.primarySemiBold,
                marginLeft: 10,
              }}>
              RECENT SEARCHES
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 20}}>
              <View
                style={{
                  width: 140,
                  backgroundColor: '#fff',
                  elevation: 5,
                  borderRadius: 10,
                  marginBottom: 20,
                  marginHorizontal: 10,
                }}>
                <View style={{}}>
                  <Image
                    style={{
                      width: 140,
                      height: 90,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                    source={{
                      uri: 'https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Lands_End_Mumbai/images/4x3/R&S_WOGLI_Exterior-Master.jpg',
                    }}
                  />
                  <View style={{position: 'absolute', alignSelf: 'flex-end'}}>
                    <Entypo
                      name="cross"
                      size={20}
                      color={Color.white}
                      style={{justifyContent: 'center'}}
                    />
                  </View>
                </View>
                <View style={{alignItems: 'center', padding: 15}}>
                  <Text
                    style={{
                      color: Color.black,
                      alignSelf: 'left',
                      fontSize: 15,
                      fontFamily: Fonts.primarySemiBold,
                    }}>
                    Gwalior
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      alignSelf: 'left',
                      fontSize: 13,
                      fontFamily: Fonts.primaryRegular,
                    }}>
                    1 Oct - 2 Oct
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: 140,
                  backgroundColor: '#fff',
                  elevation: 5,
                  borderRadius: 10,
                  marginBottom: 20,
                  marginHorizontal: 10,
                }}>
                <View style={{}}>
                  <Image
                    style={{
                      width: 140,
                      height: 90,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                    source={{
                      uri: 'https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Lands_End_Mumbai/images/4x3/R&S_WOGLI_Exterior-Master.jpg',
                    }}
                  />
                  <View style={{position: 'absolute', alignSelf: 'flex-end'}}>
                    <Entypo
                      name="cross"
                      size={20}
                      color={Color.white}
                      style={{justifyContent: 'center'}}
                    />
                  </View>
                </View>
                <View style={{alignItems: 'center', padding: 15}}>
                  <Text
                    style={{
                      color: Color.black,
                      alignSelf: 'left',
                      fontSize: 15,
                      fontFamily: Fonts.primarySemiBold,
                    }}>
                    Gwalior
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      alignSelf: 'left',
                      fontSize: 13,
                      fontFamily: Fonts.primaryRegular,
                    }}>
                    1 Oct - 2 Oct
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: 140,
                  backgroundColor: '#fff',
                  elevation: 5,
                  borderRadius: 10,
                  marginBottom: 20,
                  marginHorizontal: 10,
                }}>
                <View style={{}}>
                  <Image
                    style={{
                      width: 140,
                      height: 90,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                    source={{
                      uri: 'https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Lands_End_Mumbai/images/4x3/R&S_WOGLI_Exterior-Master.jpg',
                    }}
                  />
                  <View style={{position: 'absolute', alignSelf: 'flex-end'}}>
                    <Entypo
                      name="cross"
                      size={20}
                      color={Color.white}
                      style={{justifyContent: 'center'}}
                    />
                  </View>
                </View>
                <View style={{alignItems: 'center', padding: 15}}>
                  <Text
                    style={{
                      color: Color.black,
                      alignSelf: 'left',
                      fontSize: 15,
                      fontFamily: Fonts.primarySemiBold,
                    }}>
                    Gwalior
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      alignSelf: 'left',
                      fontSize: 13,
                      fontFamily: Fonts.primaryRegular,
                    }}>
                    1 Oct - 2 Oct
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View> */}
          <View>
            <Text
              style={{
                color: 'grey',
                alignSelf: 'left',
                fontSize: 15,
                fontFamily: Fonts.primarySemiBold,
                marginLeft: 10,
              }}>
              PLACES YOU RECENTLY VIEWED
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 20, marginBottom: 20}}>
              {RecentPost.length > 0 &&
                RecentPost.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('RoomDetails', {item: item})
                      }
                      style={{marginHorizontal: 10, width: 250}}>
                      <Image
                        style={{
                          width: 250,
                          height: 110,
                          borderRadius: 10,
                        }}
                        source={{
                          uri: `https://hostel.propertyindholera.com/public/hotelmultipleimage/${item.bannerimage}`,
                        }}
                      />
                      <View
                        style={{
                          width: 250,
                          height: 110,
                          position: 'absolute',
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          borderRadius: 10,
                        }}
                      />

                      <View
                        style={{
                          position: 'absolute',
                          width: 200,
                          alignSelf: 'baseline',
                          bottom: 10,
                          left: 10,
                        }}>
                        <Text
                          style={{
                            color: Color.white,
                            alignSelf: 'baseline',
                            fontSize: 12,
                            fontFamily: Fonts.primarySemiBold,
                            // marginLeft: 10,
                            textAlign: 'center',
                          }}>
                          PLACES YOU RECENTLY VIEWED
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View
                            style={{
                              backgroundColor: Color.darkgreen,
                              width: 30,
                              height: 30,
                              borderRadius: 50,
                              justifyContent: 'center',
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
                              {item.rating == null ? 0 : item.rating}
                            </Text>
                          </View>
                          <Text
                            style={{
                              color: Color.white,
                              alignSelf: 'center',
                              fontSize: 12,
                              fontFamily: Fonts.primarySemiBold,
                              // marginLeft: 10,
                              textAlign: 'center',
                            }}>
                            {'  '}
                            {item.address}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => deleteRecentPost(item.id)}
                        style={{alignSelf: 'flex-end', position: 'absolute'}}>
                        <Entypo
                          name="cross"
                          size={20}
                          color={Color.white}
                          style={{justifyContent: 'center'}}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                })}
              {/* <View style={{marginHorizontal: 10, width: 200}}>
                <Image
                  style={{
                    width: 200,
                    height: 110,
                    borderRadius: 10,
                  }}
                  source={{
                    uri: 'https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Lands_End_Mumbai/images/4x3/R&S_WOGLI_Exterior-Master.jpg',
                  }}
                />
                <View
                  style={{
                    width: 200,
                    height: 110,
                    position: 'absolute',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: 10,
                  }}
                />

                <View
                  style={{
                    position: 'absolute',
                    width: 200,
                    alignSelf: 'baseline',
                    bottom: 10,
                    left: 10,
                  }}>
                  <Text
                    style={{
                      color: Color.white,
                      alignSelf: 'baseline',
                      fontSize: 10,
                      fontFamily: Fonts.primarySemiBold,
                      // marginLeft: 10,
                      textAlign: 'center',
                    }}>
                    PLACES YOU RECENTLY VIEWED
                  </Text>
                </View>
                <View style={{alignSelf: 'flex-end', position: 'absolute'}}>
                  <Entypo
                    onPress={() => deleteRecentPost()}
                    name="cross"
                    size={20}
                    color={Color.white}
                    style={{justifyContent: 'center'}}
                  />
                </View>
              </View> */}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <Bottomnavbar navigation={navigation} page={'Home'} />
    </View>
  );
};

export default Index;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 9,
    // marginBottom: 5,
    margin: 20,
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
});
