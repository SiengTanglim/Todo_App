import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextTranslate, TextTranslateBold } from '../../components/custom/TextTranslate'
import Entypo from 'react-native-vector-icons/Entypo';
import style, { borderRadius, deviceWidth, paddingHorizontal } from '../../styles'
import { Actionsheet, Box, useDisclose, useToast } from 'native-base';
import colors from '../../styles/colors';
import { FlatListScroll } from '../../components/custom/Flatlist';
import { fetchAPI, fetchBasicApi, MethodType } from '../../hooks/api';
import { LanguageInterface, LanguageItem } from '../../services/interface/Language';
import { MessageType, showToast } from '../../services/utils/alert';
import { navigate } from '../../services/navigate';
import { TypeAuth } from '../../services/utils';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import BaseComponent from '../../components/custom/BaseComponent';
import { setSpinnerLoading } from '../../redux/actions';
import { Label } from '../../components/custom/Label';
import { checkPhoneNumber } from '../../services/utils/condition';
import { SubmitButtonBold } from '../../components/custom/Button';

const PhoneNumber = (props: any) => {
    const { type } = props.route.params;
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclose();
    const dispatch = useAppDispatch();
    const phoneRef = React.createRef<TextInput>();
    const lang = useAppSelector((state) => state.lang);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [countries, setCountries] = useState<any | LanguageInterface>()
    const [countryItem, setCountryItem] = useState<LanguageItem>()

    useEffect(() => {
        getCode()
    }, [])

    const getCode = () => {
        fetchBasicApi(`list-country?`).then((result: any) => {
            if (result.message) {
                setCountryItem(result.data[0])
                setCountries(result.data)
            }
        });
    }

    const onRequestOTP = () => {
        if (phoneNumber.trim().length == 0 || phoneNumber.trim().length < 8) {
            phoneRef.current?.focus();
            return;
        }

        dispatch(setSpinnerLoading(true));
        fetchAPI(MethodType.POST, `check-phone?phone=${'0' + checkPhoneNumber(phoneNumber)}&`)
            .then((value: any) => {
                dispatch(setSpinnerLoading(false));
                if (type == TypeAuth.CREATE || type == TypeAuth.UPDATE) {
                    if (!value.message) {
                        navigate('Verify', {
                            phone_number: checkPhoneNumber(phoneNumber),
                            country: countryItem,
                            type,
                            data: null
                        })
                        setPhoneNumber('')
                    } else {
                        showToast(toast, 'this_phone_number_is_already_in_use', MessageType.error);
                    }
                }
                else {
                    if (value.message) {
                        navigate('Verify', {
                            phone_number: checkPhoneNumber(phoneNumber),
                            country: countryItem,
                            type,
                            data: {
                                id: value.id
                            }
                        })
                        setPhoneNumber('')
                    }
                    else {
                        showToast(toast, 'phone_not_exist', MessageType.warning);
                    }
                }
            })
    }

    return (
        <BaseComponent
            title={type == TypeAuth.CREATE ? 'register' :
                type == TypeAuth.FORGET_PASSWORD ? 'forgot_password' : 'change_phone_number'}>
            <FlatListScroll>
                <View style={[styles.container]}>
                    <TextTranslateBold>your_phone_number</TextTranslateBold>
                    <TextTranslate style={styles.login} is_translate value={type == TypeAuth.CREATE ? 'new_account' :
                        type == TypeAuth.FORGET_PASSWORD ? 'new_password_forgot' : 'new_phone_number'}>to_login_or_create_an_account</TextTranslate>
                </View>
                <View style={styles.container}>
                    <View style={styles.digit}>
                        <TouchableOpacity
                            onPress={onOpen}
                            style={[style.row, { borderRightWidth: 0.5, paddingRight: 15 }]}>
                            <Text style={[style.pBold, { fontSize: 14, marginHorizontal: 10 }]}>
                                {countryItem?.dial_code}
                            </Text>
                            <Entypo name="chevron-thin-down" size={15} color={colors.iconColor} />
                        </TouchableOpacity>
                        <TextInput
                            ref={phoneRef}
                            value={phoneNumber}
                            style={styles.textInput}
                            placeholder={`${lang.phone}`}
                            placeholderTextColor={colors.placeHolderColor}
                            onChangeText={setPhoneNumber}
                            keyboardType="numeric"
                        />
                    </View>

                    <SubmitButtonBold
                        onPress={onRequestOTP}
                        style={styles.button}
                    >
                        send_code
                    </SubmitButtonBold>
                </View>
            </FlatListScroll>
            {countries && <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                        <TextTranslateBold>choose</TextTranslateBold>
                    </Box>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {countries.map((item: LanguageItem, index: any) => {
                            return (
                                <Actionsheet.Item
                                    onPress={() => {
                                        setCountryItem(item)
                                        onClose();
                                    }}
                                    key={index}>
                                    <View style={style.row}>
                                        <Label style={{ fontSize: 14, width: deviceWidth }}>
                                            ({item.dial_code})  {item.name}
                                        </Label>
                                    </View>
                                </Actionsheet.Item>
                            );
                        })}
                    </ScrollView>
                </Actionsheet.Content>
            </Actionsheet>}
        </BaseComponent>
    )
}

export default PhoneNumber

const styles = StyleSheet.create({
    container: {
        padding: paddingHorizontal,
        marginTop: paddingHorizontal
    },
    login: {
        fontSize: 13,
        opacity: 0.7,
        marginTop: 5
    },
    digit: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius,
        backgroundColor: colors.whiteSmoke
    },
    textInput: {
        ...style.p,
        fontSize: 14,
        color: colors.iconColor,
        width: deviceWidth / 1.6,
        marginLeft: 10,
    },
    button: {
        marginTop: 50,
    },
    buttonText: {
        color: colors.whiteColor
    }
})