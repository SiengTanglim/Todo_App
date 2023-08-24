import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useToast} from 'native-base';
import {handleChange, onEnter} from '../../services/utils/state';
import {FlatListScroll} from '../../components/custom/Flatlist';
import style, {paddingHorizontal} from '../../styles';
import colors from '../../styles/colors';
import {
  TextTranslate,
  TextTranslateBold,
} from '../../components/custom/TextTranslate';
import {InputItem} from '../../components/custom/TextInputTranslate';
import Feather from 'react-native-vector-icons/Feather';
import {useAppDispatch} from '../../hooks/redux';
import {navigate} from '../../services/navigate';
import BaseComponent from '../../components/custom/BaseComponent';
import {TypeAuth} from '../../services/utils';
import {setSpinnerLoading} from '../../redux/actions';
import {fetchAPI, MethodType} from '../../hooks/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MessageType, showToast} from '../../services/utils/alert';
import {loadUser} from '../../redux/actions/User';
import {SubmitButtonBold} from '../../components/custom/Button';
import {createFCMToken} from '../../hooks/load_data';
import ConfirmModal from '../../components/custom/ConfirmModal';
export function addStr(str: any, index: any, stringToAdd: any) {
  return (
    str.substring(0, index) + stringToAdd + str.substring(index, str.length)
  );
}
const Login = () => {
  const phoneRef = React.createRef<TextInput>();
  const passwordRef = React.createRef<TextInput>();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [visible, setVisible] = React.useState(false);
  const [state, setState] = useState<any>({
    phone: '',
    password: '',
  });
  const onCloseModal = () => {
    setVisible(!visible);
  };
  const onLogin = () => {
    if (state.phone.trim().length == 0) {
      phoneRef.current?.focus();
      return;
    }
    if (state.password.trim().length == 0) {
      passwordRef.current?.focus();
      return;
    }
    let check_phone = state.phone;
    if (state.phone.charAt(0) === '0') {
      state.phone = state.phone.substring(1, state.phone.length);
    } else {
      check_phone = addStr(check_phone, 0, '0');
    }
    dispatch(setSpinnerLoading(true));
    fetchAPI(
      MethodType.POST,
      `login?phone=${check_phone}&password=${state.password}&`,
    ).then(async result => {
      dispatch(setSpinnerLoading(false));
      if (result.message) {
        if (result.data.is_login) {
          setVisible(true);
          return;
        }
        await AsyncStorage.setItem('@id', String(result.data.id));
        await AsyncStorage.setItem('@token', result.token);
        dispatch(loadUser(result.data));
        createFCMToken();
        showToast(toast, 'login_success');
        navigate('MainHome');
        setState({
          phone: '',
          password: '',
        });
      } else {
        dispatch(setSpinnerLoading(false));
        showToast(toast, 'incorrect_phone_or_password', MessageType.warning);
      }
    });
  };

  return (
    <BaseComponent title={'login'}>
      <View style={style.flexContainer}>
        <FlatListScroll>
          <View style={styles.container}>
            <TextTranslateBold>your_account</TextTranslateBold>
            <TextTranslate style={styles.login}>
              please_sigin_to_continue
            </TextTranslate>
          </View>
          <View style={styles.container}>
            <InputItem
              ref={phoneRef}
              placeholder={'phone'}
              keyboardType="phone-pad"
              onChangeText={(text: any) => {
                setState(handleChange(state, 'phone', text));
              }}
              errorMessage={state.errorPhone}
              renderIcon={
                <Feather
                  name="phone"
                  size={18}
                  color={colors.iconColor}
                  style={{opacity: 0.5}}
                />
              }
              onSubmitEditing={() => {
                onEnter(passwordRef);
              }}
            />
            <InputItem
              ref={passwordRef}
              placeholder={'password'}
              secureTextEntry={true}
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
            />
            <TouchableOpacity
              onPress={() =>
                navigate('PhoneNumber', {type: TypeAuth.FORGET_PASSWORD})
              }
              style={styles.forgotPassword}
            >
              <TextTranslate style={styles.forgot}>
                forgot_password
              </TextTranslate>
            </TouchableOpacity>

            <SubmitButtonBold onPress={onLogin}>login</SubmitButtonBold>
          </View>
          <View style={styles.signup}>
            <TextTranslate style={styles.signsup}>
              don't_have_an_account
            </TextTranslate>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => navigate('PhoneNumber', {type: TypeAuth.CREATE})}
            >
              <TextTranslate style={styles.forgot}>sign_up</TextTranslate>
            </TouchableOpacity>
          </View>
        </FlatListScroll>
        <ConfirmModal
          description={'this_account_already_exists'}
          visible={visible}
          onClose={onCloseModal}
          onSubmit={onCloseModal}
        />
      </View>
    </BaseComponent>
  );
};

export default Login;

const styles = StyleSheet.create({
  login: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 5,
  },
  forgotPassword: {
    marginTop: 20,
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgot: {
    color: colors.baseColor,
    textDecorationLine: 'underline',
    fontSize: 13,
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
