import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Bottomnavbar from '../../../navigation/BottomNavigation';
import {Color, Fonts} from '../../../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import StickyHeaderExample from '../../components/StickyHeader';
import {postData} from '../../../API';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useSelector} from 'react-redux';

const Favourites = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [favourateposts, setfavouratePosts] = React.useState([]);
  const user = useSelector(state => state.user);
  console.log('user', user);
  const getFavourateHotels = async () => {
    var body = {
      user_id: user.id,
    };

    console.log('body', body);

    const response = await postData('favourite_list', body);

    console.log('response', response);

    if (response.data.length > 0) {
      setfavouratePosts(response.data);
    }
  };

  React.useEffect(() => {
    getFavourateHotels();
  }, []);

  return (
    <View style={{height: height * 1}}>
      {/* <StickyHeaderExample/> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: height * 0.09,
          backgroundColor: '#fff',
        }}>
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
        {favourateposts.length > 0 ? (
          <View>
            {favourateposts.map(item => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('RoomDetails', {item: item})
                  }
                  style={styles.card}>
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
                      {item.name}
                    </Text>
                    <Text style={{marginTop: -40}}>
                      <AirbnbRating
                        count={5}
                        defaultRating={item.rating}
                        size={15}
                        reviews={false}
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
                      {item.city}
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
                      resizeMode="contain"
                      source={{
                        uri: `https://hostel.propertyindholera.com/public/hotelmultipleimage/${item.bannerimage}`,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={{height: height * 0.8,justifyContent:'center'}}>
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
      </ScrollView>
      <Bottomnavbar navigation={navigation} page={'Favourites'} />
    </View>
  );
};

export default Favourites;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: Color.white,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 10,
    height: 160,
  },
});
