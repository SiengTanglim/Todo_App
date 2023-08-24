import {Dimensions, StyleSheet} from 'react-native';
import {
  Battambang,
  BattambangBold,
  fontGSans,
  fontSemiBold,
} from '../services/config/fonts';
import colors from './colors';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const paddingHorizontal = 15;
export const resizeMode = 'contain';
export const borderRadius = 10;
const style = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  ///Font Style
  p: {
    color: colors.textColor,
    fontSize: 16,
    ...Battambang,
  },
  pBold: {
    color: colors.textColor,
    fontSize: 16,
    ...BattambangBold,
  },
  pEnglish: {
    color: colors.textColor,
    fontSize: 16,
    ...fontGSans,
  },
  pEnglishBold: {
    color: colors.textColor,
    fontSize: 16,
    ...fontSemiBold,
  },
  pChinese: {
    color: colors.textColor,
    fontSize: 16,
    ...Battambang,
  },
  pChineseBold: {
    color: colors.textColor,
    fontSize: 16,
    ...BattambangBold,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 0.3,
  },
  shadowCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  shadowHeader: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  buttonChoose: {
    flexDirection: 'row',
    width: deviceWidth,
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;
