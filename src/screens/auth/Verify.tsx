import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import BaseComponent from '../../components/custom/BaseComponent';
import style, {borderRadius, paddingHorizontal} from '../../styles';
import {MessageType, showToast} from '../../services/utils/alert';
import {useToast} from 'native-base';
import {navigate} from '../../services/navigate';
import colors from '../../styles/colors';
import {
  TextTranslate,
  TextTranslateBold,
} from '../../components/custom/TextTranslate';
import {FlatListScroll} from '../../components/custom/Flatlist';
import {useAppDispatch} from '../../hooks/redux';
import {setSpinnerLoading} from '../../redux/actions';
import {TypeAuth} from '../../services/utils';
import {fetchAPI, MethodType} from '../../hooks/api';
import {checkPhoneNumber} from '../../services/utils/condition';
import {loadUser} from '../../redux/actions/User';
import {SubmitButtonBold} from '../../components/custom/Button';

let interval: any;
const CELL_COUNT: number = 6;
const Verify = (_props: any) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const {phone_number, country, type, data} = _props.route.params;
  const [code, setCode] = React.useState('');
  const [verifiedID, setVerifiedID] = React.useState('');
  const [DurationCode, setDurationCode] = React.useState<any>(60);

  const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  React.useEffect(() => {
    if (DurationCode === 60)
      signInWithPhoneNumber(`${country.dial_code}${phone_number}`);
    return () => {
      clearInterval(interval);
      setDurationCode(60);
    };
  }, [phone_number]);

  async function signInWithPhoneNumber(phoneNumber: any, isResend = false) {
    dispatch(setSpinnerLoading(true));
    await auth()
      .verifyPhoneNumber(phoneNumber, isResend)
      .on('state_changed', async phoneAuthSnapshot => {
        dispatch(setSpinnerLoading(false));
        switch (phoneAuthSnapshot.state) {
          case auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
            const {verificationId, code} = phoneAuthSnapshot;
            if (
              verificationId !== '' ||
              verificationId !== null ||
              verificationId !== undefined
            ) {
              if (code !== null) {
                setCode(code);
                await _confirmCode(verificationId, code);
              }
            }
            break;

          case auth.PhoneAuthState.CODE_SENT: // or 'sent'
            setVerifiedID(phoneAuthSnapshot.verificationId);
            showToast(toast, 'code_sent');
            let count = 0;
            interval = setInterval(() => {
              if (count === 60) {
                clearInterval(interval);
              }
              setDurationCode((counter: number) => counter - 1);
              count = count + 1;
            }, 1000);
            break;
          case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
            break;
          case auth.PhoneAuthState.ERROR: // or 'error'
            break;
        }
      })
      .catch(async error => {
        dispatch(setSpinnerLoading(false));
        if (error.code === 'auth/too-many-requests') {
          showToast(toast, 'process_has_been_suspended', MessageType.error);
          dispatch(setSpinnerLoading(false));
        } else if (error.code === 'auth/invalid-phone-number') {
          showToast(toast, 'invalid_phone_number', MessageType.error);
          dispatch(setSpinnerLoading(false));
        } else if (error.code === 'auth/missing-phone-number') {
          showToast(toast, 'phone_can_not_send', MessageType.error);
          dispatch(setSpinnerLoading(false));
        } else if (error.code === 'auth/quota-exceeded') {
          showToast(toast, 'process_closed', MessageType.error);
          dispatch(setSpinnerLoading(false));
        } else if (error.code === 'auth/operation-not-allowed') {
          showToast(toast, 'operation_not_allowed', MessageType.error);
          dispatch(setSpinnerLoading(false));
        } else if (error.code === 'auth/user-disabled') {
          showToast(toast, 'user_disabled', MessageType.error);
          dispatch(setSpinnerLoading(false));
        } else if (error.code === 'auth/retry-phone-auth') {
          showToast(toast, 'retry', MessageType.error);
          dispatch(setSpinnerLoading(false));
        } else {
          showToast(toast, 'system_problem_try_again_later', MessageType.error);
          dispatch(setSpinnerLoading(false));
        }
        console.log(error);
        clearInterval(interval);
      });
  }
  async function _confirmCode(verificationId: any, code: any) {
    dispatch(setSpinnerLoading(true));
    const provider = await auth.PhoneAuthProvider;
    const authCredential = await provider.credential(verificationId, code);
    signInWithPhoneAuthCredential(authCredential);
  }
  async function signInWithPhoneAuthCredential(
    credential: FirebaseAuthTypes.AuthCredential,
  ) {
    await auth()
      .signInWithCredential(credential)
      .then(async () => {
        onCheckUser();
      })
      .catch(async error => {
        console.log(error);
        dispatch(setSpinnerLoading(false));
        if (error.code === 'auth/invalid-verification-code') {
          showToast(toast, 'code_is_invalid', MessageType.error);

          return;
        } else if (error.code === 'auth/user-disabled') {
          showToast(toast, 'process_has_been_suspended', MessageType.error);
        } else if (error.code === 'auth/invalid-verification-id') {
          showToast(toast, 'request_not_work', MessageType.error);
        } else {
          showToast(toast, 'system_problem_try_again_later', MessageType.error);
        }
        clearInterval(interval);
      });
  }
  function verifyCode() {
    if (code.length !== 6) {
      showToast(toast, 'please_enter_a_6_digit_code', MessageType.warning);
      return;
    } else {
      _confirmCode(verifiedID, code);
    }
  }

  const onCheckUser = async () => {
    dispatch(setSpinnerLoading(false));
    if (type === TypeAuth.CREATE) {
      navigate('Register', {
        phone_number,
        country,
      });
    } else if (type === TypeAuth.UPDATE) {
      var formdata = new FormData();
      formdata.append('phone', '0' + checkPhoneNumber(phone_number));
      fetchAPI(MethodType.POST, `update-profile?`, '', formdata)
        .then(async result => {
          if (result.message) {
            dispatch(loadUser(result.data));
            showToast(toast, 'update_success');
            navigate('MainHome');
          } else {
            showToast(
              toast,
              'system_problem_try_again_later',
              MessageType.warning,
            );
          }
        })
        .catch(error => console.log('error', error));
    } else {
      navigate('NewPassword', {
        id: data?.id,
      });
    }
    setCode('');
  };

  return (
    <BaseComponent title={'verify'}>
      <View style={style.flexContainer}>
        <FlatListScroll>
          <View style={styles.container}>
            <TextTranslateBold>input_code</TextTranslateBold>
            <TextTranslate style={styles.login}>
              please_input_code
            </TextTranslate>
          </View>
          <View style={styles.container}>
            <CodeField
              ref={ref}
              {...props}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              rootStyle={{
                paddingHorizontal: 20,
              }}
              renderCell={({index, symbol, isFocused}: any) => (
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}
                >
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            <TouchableOpacity
              onPress={() => {
                if (DurationCode < 0) {
                  setDurationCode(60);
                  signInWithPhoneNumber(
                    `${country.dial_code}${phone_number}`,
                    true,
                  );
                }
              }}
              style={styles.duration}
            >
              {DurationCode > 0 ? (
                <Text style={[style.p, {marginHorizontal: 5}]}>
                  {DurationCode >= 60 ? '1:' : '0:'}
                  {DurationCode - 60 < 10 && DurationCode >= 60 ? '0' : ''}
                  {DurationCode < 10 ? '0' : ''}
                  {DurationCode >= 60 ? DurationCode - 60 : DurationCode}
                </Text>
              ) : (
                <TextTranslate style={styles.tryagain}>get_code</TextTranslate>
              )}
            </TouchableOpacity>
            <SubmitButtonBold onPress={verifyCode}>verify</SubmitButtonBold>
          </View>
        </FlatListScroll>
      </View>
    </BaseComponent>
  );
};
export default Verify;

const styles = StyleSheet.create({
  cellRoot: {
    width: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.placeHolderColor,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  number: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  container: {
    padding: paddingHorizontal,
    marginTop: paddingHorizontal,
  },
  login: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 5,
  },
  tryagain: {
    fontSize: 12,
  },
  duration: {
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 25,
    borderWidth: 0.5,
    marginVertical: 15,
    borderColor: colors.placeHolderColor,
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  cellText: {
    color: colors.placeHolderColor,
    fontSize: 25,
    textAlign: 'center',
  },
  codesend: {
    marginVertical: 10,
  },
  focusCell: {
    borderBottomColor: colors.placeHolderColor,
    borderBottomWidth: 1,
  },
});
