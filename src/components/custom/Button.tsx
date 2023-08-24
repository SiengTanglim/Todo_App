import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {borderRadius} from '../../styles';
import colors from '../../styles/colors';
import {TextTranslate, TextTranslateBold} from './TextTranslate';

export const SubmitButton = (props: any) => {
  return (
    <TouchableOpacity {...props} style={[styles.submitButton, props.style]}>
      <TextTranslate style={{color: colors.whiteColor}}>
        {props.children}
      </TextTranslate>
    </TouchableOpacity>
  );
};

export const SubmitButtonBold = (props: any) => {
  return (
    <TouchableOpacity {...props} style={[styles.submitButton, props.style]}>
      <TextTranslateBold style={{color: colors.whiteColor}}>
        {props.children}
      </TextTranslateBold>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: colors.baseColor,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius,
    marginVertical: 30,
  },
});
