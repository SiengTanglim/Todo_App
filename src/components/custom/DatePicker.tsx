import 'moment/min/locales';
import DatePicker from 'react-native-date-picker';
import React from 'react';
import {useAppSelector} from '../../hooks/redux';
export const DatePickerItem = (props: any) => {
  const lang = useAppSelector(state => state.lang);
  return (
    <>
      <DatePicker
        {...props}
        modal
        title={lang['dob']}
        confirmText={lang['ok']}
        cancelText={lang['cancel']}
        open={props.open}
        date={props.value}
        mode="date"
        locale={lang.lang == 'en' ? 'en' : lang.lang == 'km' ? 'km' : 'zh-cn'}
        minimumDate={props.minDate}
        maximumDate={props.maxDate}
        onConfirm={props.onConfirm}
        onCancel={() => props.onCancel()}
      />
    </>
  );
};
