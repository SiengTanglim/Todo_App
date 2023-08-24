import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useAppSelector} from '../../hooks/redux';
import {FormatLang, FormatLangBold} from '../../services/utils/lang';
import {paddingHorizontal} from '../../styles';
import colors from '../../styles/colors';
import {TextTranslate} from './TextTranslate';

export const TextInputTranslate = React.forwardRef((props: any, ref: any) => {
  const lang = useAppSelector((state: any) => state.lang);
  const styleText = {
    ...FormatLang[lang.lang],
  };
  return (
    <TextInput
      ref={ref}
      {...props}
      placeholder={
        props.value
          ? lang[props.placeholder].format(
              props.is_translate ? lang[props.value] : props.value,
            )
          : lang[props.placeholder]
      }
      placeholderTextColor={colors.placeHolderColor}
      style={[styleText, styles.textInput, props.style]}
    />
  );
});

export const TextInputTranslateBold = React.forwardRef(
  (props: any, ref: any) => {
    const lang = useAppSelector((state: any) => state.lang);
    const styleText = {
      ...FormatLangBold[lang.lang],
    };
    return (
      <TextInput
        ref={ref}
        {...props}
        placeholder={
          props.value
            ? lang[props.placeholder].format(
                props.is_translate ? lang[props.value] : props.value,
              )
            : lang[props.placeholder]
        }
        placeholderTextColor={colors.placeHolderColor}
        style={[styleText, styles.textInput, props.style]}
      />
    );
  },
);

export const TextInputContainerTranslate = React.forwardRef(
  (props: any, ref: any) => {
    const lang = useAppSelector((state: any) => state.lang);
    const styleText = {
      ...FormatLang[lang.lang],
    };
    return (
      <View style={[styles.searchContainer, props.viewStyle]}>
        {props.leftIcon && props.leftIcon()}
        <TextInput
          ref={ref}
          {...props}
          placeholder={
            props.value
              ? lang[props.placeholder].format(
                  props.is_translate ? lang[props.value] : props.value,
                )
              : lang[props.placeholder]
          }
          placeholderTextColor={colors.placeHolderColor}
          style={[styleText, styles.textInput, props.style]}
        />
        {props.rightIcon && props.rightIcon()}
      </View>
    );
  },
);

export const TextInputContainerTranslateBold = React.forwardRef(
  (props: any, ref: any) => {
    const lang = useAppSelector((state: any) => state.lang);
    const styleText = {
      ...FormatLangBold[lang.lang],
    };
    return (
      <View style={[styles.searchContainer, props.viewStyle]}>
        {props.leftIcon && props.leftIcon()}
        <TextInput
          ref={ref}
          {...props}
          placeholder={
            props.value
              ? lang[props.placeholder].format(
                  props.is_translate ? lang[props.value] : props.value,
                )
              : lang[props.placeholder]
          }
          placeholderTextColor={colors.placeHolderColor}
          style={[styleText, styles.textInput, props.style]}
        />
        {props.rightIcon && props.rightIcon()}
      </View>
    );
  },
);

export const InputItem = React.forwardRef((props: any, ref: any) => {
  const lang = useAppSelector((state: any) => state.lang);
  const styleText = {
    ...FormatLang[lang.lang],
  };
  return (
    <View>
      <View
        style={[
          styles.inputItemContainer,
          {
            backgroundColor: props.background
              ? props.background
              : colors.whiteSmoke,
          },
        ]}
      >
        {props.renderIcon && (
          <View style={styles.itemIcon}>
            <View style={{paddingHorizontal: 10}}>{props.renderIcon}</View>
            <View
              style={{
                borderRightWidth: 1,
                height: 20,
                borderColor: colors.baseColor,
              }}
            />
          </View>
        )}
        <TextInput
          {...props}
          ref={ref}
          style={[
            styleText,
            styles.inputItemStyle,
            {
              flex: 1,
              paddingLeft: props.isIcon ? 0 : 10,
            },
          ]}
          placeholder={
            props.value
              ? lang[props.placeholder].format(
                  props.is_translate ? lang[props.value] : props.value,
                )
              : lang[props.placeholder]
          }
          placeholderTextColor={colors.placeHolderColor}
        ></TextInput>
      </View>
      <TextTranslate style={styles.errorMessage}>
        {props.errorMessage}
      </TextTranslate>
    </View>
  );
});
export const AreaInputItem = React.forwardRef((props: any, ref: any) => {
  const lang = useAppSelector((state: any) => state.lang);
  const styleText = {
    ...FormatLang[lang.lang],
  };
  return (
    <View>
      <View
        style={[
          styles.areaInputItemContainer,
          {
            backgroundColor: props.background
              ? props.background
              : colors.whiteSmoke,
          },
        ]}
      >
        {props.renderIcon && (
          <View style={styles.areaItemIcon}>
            <View style={{paddingHorizontal: 10}}>{props.renderIcon}</View>
            <View
              style={{
                borderRightWidth: 1,
                height: 20,
                borderColor: colors.baseColor,
              }}
            />
          </View>
        )}
        <TextInput
          {...props}
          ref={ref}
          style={[
            styleText,
            styles.inputItemStyle,
            {
              flex: 1,
              paddingLeft: props.isIcon ? 0 : 10,
            },
          ]}
          placeholder={
            props.value
              ? lang[props.placeholder].format(
                  props.is_translate ? lang[props.value] : props.value,
                )
              : lang[props.placeholder]
          }
          placeholderTextColor={colors.placeHolderColor}
        ></TextInput>
      </View>
      <TextTranslate style={styles.errorMessage}>
        {props.errorMessage}
      </TextTranslate>
    </View>
  );
});
export const InputItemDisabled = React.forwardRef((props: any, ref: any) => {
  const lang = useAppSelector((state: any) => state.lang);
  const styleText = {
    ...FormatLang[lang.lang],
  };
  return (
    <View>
      <View
        style={[
          styles.inputItemContainerDisable,
          {
            backgroundColor: props.background
              ? props.background
              : colors.whiteSmoke,
          },
        ]}
      >
        {props.renderIcon && (
          <View style={styles.itemIcon}>
            <View style={{paddingHorizontal: 10}}>{props.renderIcon}</View>
            <View
              style={{
                borderRightWidth: 1,
                height: 20,
                borderColor: colors.baseColor,
              }}
            />
          </View>
        )}
        <TextInput
          editable={false}
          {...props}
          ref={ref}
          style={[
            styleText,
            styles.inputItemStyleDisable,
            {
              flex: 1,
              paddingLeft: props.isIcon ? 0 : 10,
            },
          ]}
          placeholder={
            props.value
              ? lang[props.placeholder].format(
                  props.is_translate ? lang[props.value] : props.value,
                )
              : lang[props.placeholder]
          }
          placeholderTextColor={colors.placeHolderColor}
        ></TextInput>
      </View>
      <TextTranslate style={styles.errorMessage}>
        {props.errorMessage}
      </TextTranslate>
    </View>
  );
});

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: colors.whiteColor,
    height: 50,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: colors.borderColorItem,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: paddingHorizontal,
  },
  textInput: {
    flex: 1,
  },
  itemIcon: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  areaItemIcon: {
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  inputItemStyle: {
    paddingHorizontal: 10,
    height: '100%',
    color: '#000',
    fontSize: 14,
  },
  inputItemStyleDisable: {
    paddingHorizontal: 10,
    height: '100%',
    color: colors.descriptionColor,
    fontSize: 14,
  },
  inputItemContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteSmoke,
    borderRadius: 10,
  },
  areaInputItemContainer: {
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteSmoke,
    borderRadius: 10,
  },
  inputItemContainerDisable: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteSmoke,
    borderRadius: 10,
  },
  errorMessage: {
    paddingHorizontal: 5,
    color: colors.bgColor,
    fontSize: 11,
  },
});
