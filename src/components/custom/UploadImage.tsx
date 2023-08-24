import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import style from '../../styles';
import colors from '../../styles/colors';
import { BottomSheet } from './BottomSheet';
import { TextTranslate } from './TextTranslate';

const UploadImage = React.forwardRef((props: any, ref: any) => {
  return (
    <BottomSheet ref={ref} title={'choose'} h={props.size}>
      <TouchableOpacity
        onPress={props.onCamera}
        style={style.buttonChoose}>
        <Feather name="camera" size={18} color={colors.iconColor} />
        <TextTranslate style={styles.text}>camera</TextTranslate>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onSelectImage}
        style={style.buttonChoose}>
        <Feather name="image" size={18} color={colors.iconColor} />
        <TextTranslate style={styles.text}>gallery</TextTranslate>
      </TouchableOpacity>
      {props.image != null ?
        <TouchableOpacity
          onPress={props.onDelete}
          style={style.buttonChoose}>
          <Feather name='trash-2' size={18} color={colors.baseColor} />
          <TextTranslate style={[styles.text,{color:colors.baseColor}]}>delete</TextTranslate>
        </TouchableOpacity>
        : null}
    </BottomSheet>
  );
});

export default React.memo(UploadImage);

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    color: colors.iconColor
  },
});
