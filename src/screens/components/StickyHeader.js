import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Color,Fonts} from '../../theme';
import Entypo from 'react-native-vector-icons/Entypo';

const StickyHeaderExample = () => {
  const [scrollY] = useState(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 100],
    extrapolate: 'clamp',
  });
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['green', 'red'], // Change background colors as needed
    extrapolate: 'clamp',
  });

  const {width, height} = Dimensions.get('window');
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    setSearchQuery(query);
  };
  const [box, setBox] = React.useState('All');

  return (
    <View style={{flex: 1}}>
      
      <Animated.View
        style={{...styles.card,
          height: headerHeight,
        //   backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        //   backgroundColor:headerBackgroundColor
        }}>
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
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
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
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
           
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
          <TouchableOpacity
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
    
      </Animated.View>

      <ScrollView
        style={{flex: 1}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
  <View style={{backgroundColor: '#fff', elevation: 5, padding: 20}}>
          <Text
            style={{
              color: Color.black,
              fontFamily: Fonts.primarySemiBold,
              fontSize: 15,
            }}>
            Your Favorite
          </Text>
        </View>
        <View style={styles.card}>
          <View style={{width: width * 0.6, padding: 10}}>
            <Text
              style={{
                color: Color.black,
                alignSelf: 'baseline',
                fontSize: 15,
                fontFamily: Fonts.primarySemiBold,
                // marginLeft: 10,
                textAlign: 'center',
              }}>
              Hotel Mayur
            </Text>
            <Text style={{marginVertical:10}}>
            <Entypo
              name="star"
              size={15}
              color={Color.black}
              style={{justifyContent: 'center'}}
            />
            <Entypo
              name="star"
              size={15}
              color={Color.black}
              style={{justifyContent: 'center'}}
            />
            <Entypo
              name="star"
              size={15}
              color={Color.black}
              style={{justifyContent: 'center'}}
            />
            </Text>
            <Text
              style={{
                color: Color.gray,
                alignSelf: 'baseline',
                fontSize: 15,
                fontFamily: Fonts.primarySemiBold,
                // marginLeft: 10,
                textAlign: 'center',
              }}>
              Gwalior
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  backgroundColor: Color.green,
                  width: 30,
                  height: 30,
                  //   borderRadius: 50,
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
                  7.7
                </Text>
              </View>
              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: Color.black,
                    alignSelf: 'baseline',
                    fontSize: 10,
                    fontFamily: Fonts.primarySemiBold,
                    // marginLeft: 10,
                    textAlign: 'center',
                  }}>
                  Good
                </Text>
                <Text
                  style={{
                    color: Color.gray,
                    alignSelf: 'baseline',
                    fontSize: 10,
                    fontFamily: Fonts.primarySemiBold,
                    // marginLeft: 10,
                    textAlign: 'center',
                  }}>
                  203 REVIEWS
                </Text>
              </View>
            </View>
          </View>
          <View style={{width: width * 0.3}}>
            <Image
              style={{
                width: width * 0.3,
                height: 160,
                // borderRadius: 10,
                alignSelf: 'center',
                margin: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
              source={{
                uri: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/flyfish/raw/NH7200551580220/QS1042/QS1042-Q1/1584626150877.jpeg',
              }}
            />
          </View>
        </View>
        <View style={styles.card}>
          <View style={{width: width * 0.6, padding: 10}}>
            <Text
              style={{
                color: Color.black,
                alignSelf: 'baseline',
                fontSize: 15,
                fontFamily: Fonts.primarySemiBold,
                // marginLeft: 10,
                textAlign: 'center',
              }}>
              Hotel Mayur
            </Text>
            <Text style={{marginVertical:10}}>
            <Entypo
              name="star"
              size={15}
              color={Color.black}
              style={{justifyContent: 'center'}}
            />
            <Entypo
              name="star"
              size={15}
              color={Color.black}
              style={{justifyContent: 'center'}}
            />
            <Entypo
              name="star"
              size={15}
              color={Color.black}
              style={{justifyContent: 'center'}}
            />
            </Text>
            <Text
              style={{
                color: Color.gray,
                alignSelf: 'baseline',
                fontSize: 15,
                fontFamily: Fonts.primarySemiBold,
                // marginLeft: 10,
                textAlign: 'center',
              }}>
              Gwalior
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  backgroundColor: Color.green,
                  width: 30,
                  height: 30,
                  //   borderRadius: 50,
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
                  7.7
                </Text>
              </View>
              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: Color.black,
                    alignSelf: 'baseline',
                    fontSize: 10,
                    fontFamily: Fonts.primarySemiBold,
                    // marginLeft: 10,
                    textAlign: 'center',
                  }}>
                  Good
                </Text>
                <Text
                  style={{
                    color: Color.gray,
                    alignSelf: 'baseline',
                    fontSize: 10,
                    fontFamily: Fonts.primarySemiBold,
                    // marginLeft: 10,
                    textAlign: 'center',
                  }}>
                  203 REVIEWS
                </Text>
              </View>
            </View>
          </View>
          <View style={{width: width * 0.3}}>
            <Image
              style={{
                width: width * 0.3,
                height: 160,
                // borderRadius: 10,
                alignSelf: 'center',
                margin: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
              source={{
                uri: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/flyfish/raw/NH7200551580220/QS1042/QS1042-Q1/1584626150877.jpeg',
              }}
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={{width: width * 0.6, padding: 10}}>
            <Text
              style={{
                color: Color.black,
                alignSelf: 'baseline',
                fontSize: 15,
                fontFamily: Fonts.primarySemiBold,
                // marginLeft: 10,
                textAlign: 'center',
              }}>
              Hotel Mayur
            </Text>
            <Text style={{marginVertical:10}}>
            <Entypo
              name="star"
              size={15}
              color={Color.black}
              style={{justifyContent: 'center'}}
            />
            <Entypo
              name="star"
              size={15}
              color={Color.black}
              style={{justifyContent: 'center'}}
            />
            <Entypo
              name="star"
              size={15}
              color={Color.black}
              style={{justifyContent: 'center'}}
            />
            </Text>
            <Text
              style={{
                color: Color.gray,
                alignSelf: 'baseline',
                fontSize: 15,
                fontFamily: Fonts.primarySemiBold,
                // marginLeft: 10,
                textAlign: 'center',
              }}>
              Gwalior
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  backgroundColor: Color.green,
                  width: 30,
                  height: 30,
                  //   borderRadius: 50,
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
                  7.7
                </Text>
              </View>
              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: Color.black,
                    alignSelf: 'baseline',
                    fontSize: 10,
                    fontFamily: Fonts.primarySemiBold,
                    // marginLeft: 10,
                    textAlign: 'center',
                  }}>
                  Good
                </Text>
                <Text
                  style={{
                    color: Color.gray,
                    alignSelf: 'baseline',
                    fontSize: 10,
                    fontFamily: Fonts.primarySemiBold,
                    // marginLeft: 10,
                    textAlign: 'center',
                  }}>
                  203 REVIEWS
                </Text>
              </View>
            </View>
          </View>
          <View style={{width: width * 0.3}}>
            <Image
              style={{
                width: width * 0.3,
                height: 160,
                // borderRadius: 10,
                alignSelf: 'center',
                margin: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
              source={{
                uri: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/flyfish/raw/NH7200551580220/QS1042/QS1042-Q1/1584626150877.jpeg',
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StickyHeaderExample;

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
