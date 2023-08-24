import React, { useState } from 'react';
import {
  InteractionManager,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import colors from '../../styles/colors';
import CustomHeader from '../header/CustomHeader';
import MainHeader from '../header/MainHeader';
import Loading from './Loading';

const BaseComponent = ({
  children,
  title,
  data,
  loading,
  is_main,
  rightIcon,
  is_back = true,
  is_translate = true,
  is_mini_player = true,
  is_interaction = false
}: any) => {
  const [isReady, setIsReady] = useState(false);
  React.useEffect(() => {
    if (is_interaction) {
      InteractionManager.runAfterInteractions(() => {
        setIsReady(true);
      });
    }
    else {
      setTimeout(() => {
        setIsReady(true)
      }, 250);
    }

  }, []);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 15 : 25}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: colors.whiteColor,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        {/* {title && <>
          {is_main ?
            <MainHeader title={title} is_translate={is_translate} />
            :
            <CustomHeader title={title} is_translate={is_translate} rightIcon={rightIcon} is_back={is_back}/>
          }
        </>} */}
        {!isReady || data === null ? (
          loading ? (
            <Loading />
          ) : null
        ) : (
          children
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default React.memo(BaseComponent);
