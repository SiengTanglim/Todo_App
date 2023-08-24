import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useToast} from 'native-base';
import {handleChange, onEnter} from '../../services/utils/state';
import {FlatListScroll} from '../../components/custom/Flatlist';
import style, {borderRadius, paddingHorizontal} from '../../styles';
import colors from '../../styles/colors';
import {
  TextTranslate,
  TextTranslateBold,
} from '../../components/custom/TextTranslate';
import {InputItem} from '../../components/custom/TextInputTranslate';
import Feather from 'react-native-vector-icons/Feather';
import {useAppDispatch} from '../../hooks/redux';
import BaseComponent from '../../components/custom/BaseComponent';
import {setSpinnerLoading} from '../../redux/actions';
import {fetchAPI, MethodType} from '../../hooks/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadUser} from '../../redux/actions/User';
import {MessageType, showToast} from '../../services/utils/alert';
import {navigate} from '../../services/navigate';
import {createFCMToken} from '../../hooks/load_data';

const NewPassword = (props: any) => {
  const {id} = props.route.params;
  const newpasswordRef = React.createRef<TextInput>();
  const newconfirmRef = React.createRef<TextInput>();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [state, setState] = useState<any>({
    new_password: '',
    new_confirm: '',
  });

  const onSave = () => {
    if (state.new_password.trim().length == 0) {
      newpasswordRef.current?.focus();
      return;
    }

    if (state.new_confirm.trim().length == 0) {
      newconfirmRef.current?.focus();
      return;
    }

    if (state.new_password.trim().length < 6) {
      showToast(
        toast,
        'password_must_be_at_least_6_characters',
        MessageType.warning,
      );
      return;
    }

    if (state.new_password != state.new_confirm) {
      newconfirmRef.current?.focus();
      showToast(toast, 'confirm_password_incorrect', MessageType.warning);
      return;
    }

    dispatch(setSpinnerLoading(true));
    fetchAPI(
      MethodType.POST,
      `forget-password?id=${id}&password=${state.new_password}&`,
    ).then(async result => {
      dispatch(setSpinnerLoading(false));
      if (result.message) {
        await AsyncStorage.setItem('@id', String(result.data.id));
        await AsyncStorage.setItem('@token', result.token);
        dispatch(loadUser(result.data));
        createFCMToken();
        showToast(toast, 'update_success');
        navigate('MainHome');
        setState({
          new_password: '',
          new_confirm: '',
        });
      } else {
        showToast(toast, 'system_problem_try_again_later', MessageType.warning);
      }
    });
  };

  return (
    <BaseComponent title={'new_password'}>
      <View style={style.flexContainer}>
        <FlatListScroll>
          <View style={styles.container}>
            <TextTranslateBold>your_new_password</TextTranslateBold>
            <TextTranslate style={styles.login}>
              new_password_desc
            </TextTranslate>
          </View>
          <View style={styles.container}>
            <InputItem
              ref={newpasswordRef}
              placeholder={'new_password'}
              secureTextEntry
              onChangeText={(text: any) => {
                setState(handleChange(state, 'new_password', text));
              }}
              renderIcon={
                <Feather
                  name="lock"
                  size={18}
                  color={colors.iconColor}
                  style={{opacity: 0.5}}
                />
              }
              onSubmitEditing={() => {
                onEnter(newconfirmRef);
              }}
            />
            <InputItem
              ref={newconfirmRef}
              placeholder={'new_confirm'}
              secureTextEntry
              onChangeText={(text: any) => {
                setState(handleChange(state, 'new_confirm', text));
              }}
              renderIcon={
                <Feather
                  name="lock"
                  size={18}
                  color={colors.iconColor}
                  style={{opacity: 0.5}}
                />
              }
            />
            <TouchableOpacity onPress={onSave} style={styles.loginButton}>
              <TextTranslateBold style={{color: colors.whiteColor}}>
                save
              </TextTranslateBold>
            </TouchableOpacity>
          </View>
        </FlatListScroll>
      </View>
    </BaseComponent>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: colors.baseColor,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius,
    marginVertical: 30,
  },

  container: {
    padding: paddingHorizontal,
    marginTop: paddingHorizontal + 10,
  },
  login: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 5,
  },
});
