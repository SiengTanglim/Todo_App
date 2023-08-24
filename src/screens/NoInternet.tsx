import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { TextTranslate, TextTranslateBold } from '../components/custom/TextTranslate';
import style, { deviceWidth } from '../styles';
import colors from '../styles/colors';

const NoInternet = () => {
  return (
    <View style={styles.safeAreaContainer}>
      <View style={styles.iconContainer}>
        <AutoHeightImage source={require('../assets/lost-wifi-connection.webp')}
          width={deviceWidth - 60}
        />
      </View>
      <TextTranslateBold style={{ color: colors.baseColor }}>no_internet</TextTranslateBold>
      <TextTranslate style={styles.check}>check_internet</TextTranslate>
    </View>
  );
};

export default React.memo(NoInternet);

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  check: {
    textAlign: 'center',
    color: colors.textColor,
    marginTop: 20
  }
});