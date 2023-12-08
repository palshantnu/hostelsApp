import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Dimensions, View} from 'react-native';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

export default function ProfilePlaceholder() {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
       
        <SkeletonPlaceholder.Item marginTop={10} width={width*1} height={height*0.4} />
        <SkeletonPlaceholder.Item marginTop={10} width={width*1} height={height*0.4} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}