import React from "react";
import { Text } from "react-native";
import { useAppSelector } from "../../hooks/redux";
import { FormatLang, FormatLangBold } from "../../services/utils/lang";

export const Label = (props: any) => {
  const lang = useAppSelector((state: any) => state.lang);
  const styleText = {
    ...FormatLang[lang.lang]
  }
  return (
    <Text {...props} style={[styleText, props.style]}>
      {props.children}
    </Text>
  );
};

export const LabelBold = (props: any) => {
  const lang = useAppSelector((state: any) => state.lang);
  const styleText = {
    ...FormatLangBold[lang.lang]
  }
  return (
    <Text {...props} style={[styleText, props.style]}>
      {props.children}
    </Text>
  );
};