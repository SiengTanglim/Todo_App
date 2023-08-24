import {
  StyleSheet,
  View
} from 'react-native';
import React from 'react';
import { deviceWidth, paddingHorizontal } from '../../styles';
import AutoHeightImage from 'react-native-auto-height-image';
import colors from '../../styles/colors';
import { TextTranslateBold } from './TextTranslate';

const NoData = () => {
  return (
    <View style={styles.container}>
      <AutoHeightImage
        width={120}
        source={require('../../assets/no_data.png')}
        style={{ opacity: 0.5 }}
      />
      <TextTranslateBold style={styles.text}>no_data</TextTranslateBold>
    </View>
  );
};

export default React.memo(NoData);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: paddingHorizontal * 2
  },
  text: {
    color: colors.borderColorItem,
    opacity: 0.6,
    fontSize: 16,
    marginTop: 10
  }
});
