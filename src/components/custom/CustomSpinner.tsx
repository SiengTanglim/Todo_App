import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';
import React from 'react';
import style, { deviceHeight, deviceWidth } from '../../styles';
import colors from '../../styles/colors';
import { TextTranslate } from './TextTranslate';

const CustomSpinner = (props: any) => {
  return props.visible ? (
    <View style={styles.container}>
      <View style={[style.row, styles.loading]}>
        <ActivityIndicator size="large" color={colors.baseColor} />
        <TextTranslate style={{ marginLeft: 15 }}>loading</TextTranslate>
      </View>
    </View>
  ) : null;
};

export default React.memo(CustomSpinner);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:5
  },
  loading: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});
