import React from "react";
import { Text } from "react-native";
import { useAppSelector } from "../../hooks/redux";
import { FormatLang, FormatLangBold } from "../../services/utils/lang";

export const TextTranslate = (props: any) => {
  const lang = useAppSelector((state: any) => state.lang);
  const styleText = {
    ...FormatLang[lang.lang]
  }
  return (
    <Text {...props} style={[styleText, props.style]}>
      {props.value ? lang[props.children].format(props.is_translate ? lang[props.value] : props.value) : lang[props.children]}
    </Text>
  );
};

export const TextTranslateBold = (props: any) => {
  const lang = useAppSelector((state: any) => state.lang);
  const styleText = {
    ...FormatLangBold[lang.lang]
  }
  return (
    <Text {...props} style={[styleText, props.style]}>
      {props.value ? lang[props.children].format(props.is_translate ? lang[props.value] : props.value) : lang[props.children]}
    </Text>
  );
};