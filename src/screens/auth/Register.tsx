import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {HStack, useToast} from 'native-base';
import {handleChange, onEnter} from '../../services/utils/state';
import {FlatListScroll} from '../../components/custom/Flatlist';
import style, {borderRadius, paddingHorizontal} from '../../styles';
import colors from '../../styles/colors';
import {TextTranslate} from '../../components/custom/TextTranslate';
import {InputItem} from '../../components/custom/TextInputTranslate';
import Feather from 'react-native-vector-icons/Feather';
import {useAppDispatch} from '../../hooks/redux';
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import UploadImage from '../../components/custom/UploadImage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BottomSheet} from '../../components/custom/BottomSheet';
import BaseComponent from '../../components/custom/BaseComponent';
import {navigate} from '../../services/navigate';
import {fetchAPI, MethodType} from '../../hooks/api';
import {loadUser} from '../../redux/actions/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setSpinnerLoading} from '../../redux/actions';
import {SubmitButtonBold} from '../../components/custom/Button';
import {checkPhoneNumber} from '../../services/utils/condition';
import {MessageType, showToast} from '../../services/utils/alert';
import {createFCMToken} from '../../hooks/load_data';
import {gender} from '../../components/dummy';

const Register = (props: any) => {
  const {phone_number, country} = props.route.params;
  const nameRef = React.createRef<TextInput>();
  const passwordRef = React.createRef<TextInput>();
  const confirmRef = React.createRef<TextInput>();
  const bottomSheetRef = useRef<RBSheet>(null);
  const showbottomSheetRef = useRef<RBSheet>(null);

  const dispatch = useAppDispatch();
  const toast = useToast();

  const [state, setState] = useState<any>({
    name: '',
    image: null,
    gender: null,
    password: '',
    confirm: '',
  });

  const onShowBottomSheetGender = () => {
    showbottomSheetRef.current?.open();
  };
  const onCloseGender = () => {
    showbottomSheetRef.current?.close();
  };
  const onShowBottomSheet = () => {
    bottomSheetRef.current?.open();
  };
  const onClose = () => {
    bottomSheetRef.current?.close();
  };

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 512,
        maxWidth: 512,
      },
      (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          setState(handleChange(state, 'image', response.assets[0]));
          onClose();
        }
      },
    );
  };
  const onCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 512,
        maxWidth: 512,
      },
      (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          setState(handleChange(state, 'image', response.assets[0]));
          onClose();
        }
      },
    );
  };

  const _renderItemGender = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setState(handleChange(state, 'gender', item));
          onCloseGender();
        }}
        style={[style.row, styles.selectgender]}
      >
        <TextTranslate>{item.name}</TextTranslate>
        {state.gender ? (
          state.gender?.name === item.name ? (
            <AntDesign name="check" color={colors.baseColor} size={20} />
          ) : null
        ) : null}
      </TouchableOpacity>
    );
  };

  const onSignUp = () => {
    onClose();
    if (state.name.trim().length == 0) {
      nameRef.current?.focus();
      return;
    }

    if (state.gender == null) {
      showToast(toast, 'please_choose_gender', MessageType.warning);
      return;
    }

    if (state.password.trim().length == 0) {
      passwordRef.current?.focus();
      return;
    }

    if (state.password.trim().length < 6) {
      showToast(
        toast,
        'password_must_be_at_least_6_characters',
        MessageType.warning,
      );
      return;
    }

    if (state.confirm.trim().length == 0) {
      confirmRef.current?.focus();
      return;
    }

    if (state.password != state.confirm) {
      confirmRef.current?.focus();
      showToast(toast, 'confirm_password_incorrect', MessageType.warning);
      return;
    }

    dispatch(setSpinnerLoading(true));
    var formdata: any = new FormData();
    formdata.append('name', state.name);
    formdata.append('phone', '0' + checkPhoneNumber(phone_number));
    formdata.append('password', state.password);
    formdata.append('gender', state.gender.id);
    formdata.append('country', country.name);

    if (state.image == null) {
      formdata.append('profile', null);
    } else {
      formdata.append('profile', {
        uri: state.image.uri,
        name: state.image.fileName,
        type: state.image.type,
        data: state.image.base64,
      });
    }

    fetchAPI(MethodType.POST, `register?`, '', formdata)
      .then(async result => {
        dispatch(setSpinnerLoading(false));
        if (result.message) {
          await AsyncStorage.setItem('@id', String(result.data.id));
          await AsyncStorage.setItem('@token', result.token);
          dispatch(loadUser(result.data));
          createFCMToken();
          showToast(toast, 'create_success');
          navigate('MainHome');
          setState({
            name: '',
            image: null,
            gender: null,
            password: '',
            confirm: '',
          });
        } else {
          showToast(
            toast,
            'system_problem_try_again_later',
            MessageType.warning,
          );
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <BaseComponent title={'create_account'}>
      <View style={style.flexContainer}>
        <FlatListScroll>
          <UploadImage
            ref={bottomSheetRef}
            onCamera={onCamera}
            onSelectImage={onSelectImage}
          />
          <View style={styles.profile}>
            {state?.image == null ? (
              <FastImage
                source={require('../../assets/avatar.png')}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <FastImage
                source={{uri: state.image.uri}}
                style={styles.image}
                resizeMode="cover"
              />
            )}
            <TouchableOpacity
              onPress={() => onShowBottomSheet()}
              style={styles.updateProfile}
            >
              <Entypo name="camera" size={15} color={colors.whiteColor} />
            </TouchableOpacity>
          </View>
          {state.image !== null && (
            <TouchableOpacity
              style={styles.removeImage}
              onPress={() => {
                setState(handleChange(state, 'image', null));
              }}
            >
              <TextTranslate style={styles.delete}>delete_image</TextTranslate>
            </TouchableOpacity>
          )}
          <View style={styles.container}>
            <InputItem
              ref={nameRef}
              placeholder={'name'}
              onChangeText={(text: any) => {
                setState(handleChange(state, 'name', text));
              }}
              renderIcon={
                <Feather
                  name="user"
                  size={18}
                  color={colors.iconColor}
                  style={{opacity: 0.5}}
                />
              }
            />
            <TouchableOpacity
              onPress={() => {
                onShowBottomSheetGender();
              }}
              style={styles.categorys}
            >
              <HStack alignItems={'center'}>
                <View
                  style={{
                    width: 40,
                    alignItems: 'center',
                    borderRightWidth: 1,
                    borderRightColor: colors.baseColor,
                  }}
                >
                  <Fontisto
                    name="transgender"
                    size={18}
                    color={colors.iconColor}
                    style={{opacity: 0.5}}
                  />
                </View>
                {state?.gender?.name == null ? (
                  <TextTranslate style={styles.categoryText}>
                    gender
                  </TextTranslate>
                ) : (
                  <TextTranslate
                    style={[styles.categoryText, {color: colors.textColor}]}
                  >
                    {state?.gender?.name}
                  </TextTranslate>
                )}
              </HStack>
              <AntDesign
                name="right"
                size={15}
                color={colors.placeHolderColor}
                style={{opacity: 0.3, marginRight: 10}}
              />
            </TouchableOpacity>

            <InputItem
              ref={passwordRef}
              placeholder={'password'}
              secureTextEntry
              onChangeText={(text: any) => {
                setState(handleChange(state, 'password', text));
              }}
              renderIcon={
                <Feather
                  name={'lock'}
                  size={18}
                  color={colors.iconColor}
                  style={{opacity: 0.5}}
                />
              }
              onSubmitEditing={() => {
                onEnter(confirmRef);
              }}
            />
            <InputItem
              ref={confirmRef}
              placeholder={'confirm_password'}
              secureTextEntry
              onChangeText={(text: any) => {
                setState(handleChange(state, 'confirm', text));
              }}
              renderIcon={
                <Feather
                  name={'lock'}
                  size={18}
                  color={colors.iconColor}
                  style={{opacity: 0.5}}
                />
              }
            />
            <SubmitButtonBold onPress={onSignUp}>create</SubmitButtonBold>
          </View>

          <BottomSheet ref={showbottomSheetRef} title={'change_gender'} h={230}>
            {gender.map((item: any, index: any) => {
              return _renderItemGender({item, index});
            })}
          </BottomSheet>
        </FlatListScroll>
      </View>
    </BaseComponent>
  );
};

export default Register;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: colors.baseColor,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius,
    marginVertical: 30,
  },
  profile: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    borderRadius: 50,
    marginVertical: paddingHorizontal,
  },
  selectgender: {
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderColor: colors.borderColorItem,
    padding: paddingHorizontal,
  },
  login: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 5,
  },
  delete: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: colors.bgColor,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  updateProfile: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(120, 120, 120,0.5)',
    height: 35,
    width: 35,
    bottom: 5,
    right: 0,
    borderRadius: 20,
  },
  removeImage: {
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  signsup: {
    fontSize: 13,
  },
  signup: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorys: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    height: 50,
    backgroundColor: colors.whiteSmoke,
    marginBottom: paddingHorizontal,
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.placeHolderColor,
  },
  logoImage: {
    height: 140,
    width: 140,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 40,
  },
  container: {
    padding: paddingHorizontal,
    marginTop: paddingHorizontal,
  },
});
