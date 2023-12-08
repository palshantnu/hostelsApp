import React from 'react';
import {Text, Dimensions, StyleSheet, View, Image} from 'react-native';

import {SliderBox} from 'react-native-image-slider-box';

const images = [
  'https://images.tv9hindi.com/wp-content/uploads/2022/04/Patna-Coaching-Classes-Closed.jpg',

  'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/04/04/668149-coaching-class.jpg',
  'https://www.proevolution.pro/wp-content/uploads/2020/11/coaching-manager-1.png',

  'https://content.jdmagicbox.com/comp/gwalior/y3/9999px751.x751.220319113519.c2y3/catalogue/narayana-coaching-center-city-centre-gwalior-iit-tutorials-a7qkoca59v.jpg',
];

const Slider = props => {
  var img = [];

  console.log('props', JSON.parse(props.images)[0]);
  for (let index = 0; index < JSON.parse(props.images).length; index++) {
    const element = JSON.parse(props.images)[index];
    console.log('element', element);
    img.push(
      'https://hostel.propertyindholera.com/public/hotelmultipleimage/' +
        element,
    );
  }
  console.log('img', img);
  return (
    <View style={styles.container}>
      <SliderBox
        //   ImageComponent={FastImage}
        images={img}
        sliderBoxHeight={250}
        dotColor="#fff"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
        resizeMethod={'cover'}
        resizeMode={'cover'}
        paginationBoxStyle={{
          position: 'absolute',
          bottom: 0,
          padding: 0,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
        }}
        dotStyle={{
          width: 15,
          height: 15,
          borderRadius: 15,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: 'rgba(128, 128, 128, 0.92)',
        }}
        ImageComponentStyle={{borderRadius: 0, width: '100%', marginTop: 0}}
        imageLoadingColor="#2196F3"
      />
    </View>
  );
};

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  // container: {backgroundColor: 'white', height: height * 0.3},
});

export default Slider;
