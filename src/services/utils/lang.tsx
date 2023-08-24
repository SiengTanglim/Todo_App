import style from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Language = {
  KHMER: 'km',
  ENGLISH: 'en',
  CHINESE: 'ch',
};

export const style_km = style.p;
export const style_en = style.pEnglish;
export const style_ch = style.pChinese;

export const FormatLang: any = {
  km: style_km,
  en: style_en,
  ch: style_ch,
};

export const FormatLangBold: any = {
  km: style.pBold,
  en: style.pEnglishBold,
  ch: style.pChineseBold,
};

export const en = require('../../res/lang/en.json');
export const km = require('../../res/lang/km.json');
export const ch = require('../../res/lang/ch.json');

export const flag_en = require('../../assets/uk.png');
export const flag_km = require('../../assets/km.png');
export const flag_ch = require('../../assets/ch.png');

export const flag: any = {
  flag_en,
  flag_km,
  flag_ch,
};

export default async function lang(language = null) {
  const lang =
    language === null ? await AsyncStorage.getItem('@lang') : language;
  if (lang === null || lang === 'km') return km;
  else if (lang === 'en') return en;
  else return ch;
}
