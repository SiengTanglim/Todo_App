import React from 'react';
import { TextInput } from "react-native";

export const handleChange = (state: any, stateName: string, value: any) => {
    state[`${stateName}`] = value;
    return { ...state };
};

export const onEnter = (ref: React.RefObject<TextInput>) => {
    if (ref.current !== null) {
        ref.current.focus();
    }
};