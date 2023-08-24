export const makeid = () => {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};
// export var moment = require('moment/min/moment-with-locales');
export const TypeAuth = {
  UPDATE: 'update',
  CREATE: 'create',
  FORGET_PASSWORD: 'forget',
};

export const TypePayment = {
  VIP_PAYMENT: 'vip payment',
  BOOK_PAYMENT: 'book payment',
};

export const Type = {
  BOOK: 'book',
  COURSE: 'course',
  VIDEO: 'video',
  CLASS: 'class',
  BOOK_PACKAGE: 'book-package',
  VIDEO_PACKAGE: 'video-package',
  BOOK_PLAN: 'book-plan',
  VIDEO_PLAN: 'video-plan',
  AUDIO: 'audio',
};

export const TypeInfo = {
  SELF: 'self',
  USER: 'user',
  TEACHER: 'teacher',
  AUTHOR: 'author',
};

export const NotificationType = {
  BOOK: 'book',
  BOOK_PACKAGE: 'book_package',
  VIDEO: 'video',
  VIDEO_PACKAGE: 'video_package',
  COURSE: 'course',
  CLASS: 'class',
  SUBSCRIBE: 'subscribe',
  CERTIFICATE: 'certificate',
};

export const dateDiffInMinute = (message_date: any) => {
  var dt1 = new Date(message_date);
  var dt2 = new Date();

  const cal = Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24),
  );
  if (cal === 0) {
    if (dt2.getHours() - dt1.getHours() == 0) {
      return dt2.getMinutes() - dt1.getMinutes();
    }
  }
  return 24;
};

export const dateDiffInNotificationEn = (publish_date: any) => {
  var dt1 = new Date(publish_date);
  var dt2 = new Date();
  const cal = Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24),
  );
  let duration = '';
  if (cal == 0) {
    if (dt2.getMinutes() - dt1.getMinutes() <= 0) {
      duration = 'Just Now';
    } else if (dt2.getMinutes() - dt1.getMinutes() < 60) {
      duration =
        dt2.getMinutes() -
        dt1.getMinutes() +
        ' minute' +
        (dt2.getMinutes() - dt1.getMinutes() === 1 ? '' : 's') +
        ' ago';
    } else {
      duration =
        dt2.getHours() -
        dt1.getHours() +
        ' hour' +
        (dt2.getHours() - dt1.getHours() === 1 ? '' : 's') +
        ' ago';
    }
  } else if (cal === 1) {
    duration = 'Yesterday at ' + ConvertDateToTime(dt1);
  } else if (cal < 7) {
    duration = ConvertToEnglishDayDate(dt1) + ' at ' + ConvertDateToTime(dt1);
  } else if (cal > 6) {
    duration =
      ConvertToEnglishDateNoDay(dt1, true) + ' at ' + ConvertDateToTime(dt1);
  } else {
    duration = '';
  }
  return duration;
};

export const ConvertDateToTime = (date: Date) => {
  let hour: any = date.getHours();
  if (Number(hour) < 10) {
    hour = '0' + hour;
  }
  let minute: any = date.getMinutes();
  if (Number(minute) < 10) {
    minute = '0' + minute;
  }
  let am_pm = Number(hour) > 12 ? 'PM' : 'AM';
  let convert = hour + ':' + minute + ' ' + am_pm;
  return convert;
};

export const ConvertToEnglishDayDate = (date: Date) => {
  let convert = '';
  var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  convert = day[date.getDay()];
  return convert;
};

export const ConvertToEnglishDateNoDay = (date: Date, is_short = false) => {
  var month = is_short
    ? [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
    : [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
  let convert = '';
  convert =
    convert +
    month[date.getMonth()] +
    ' ' +
    (date.getUTCDate() < 10 ? '0' : '') +
    date.getUTCDate() +
    ', ' +
    date.getFullYear();
  return convert;
};

export function convertText(html: String) {
  if (html != null) {
    return html.replace(/<[^>]+>/g, '');
  } else {
    return '';
  }
}

export function numberWithCommas(value: any) {
  return Number(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberToCurreny(value: Number) {
  return '$' + numberWithCommas(Number(value).toFixed(2));
}

export const convertHMS = (value: any) => {
  if (value < 1) {
    return '00:00';
  } else {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours: any = Math.floor(sec / 3600); // get hours
    let minutes: any = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds: any = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return (hours < 1 ? '' : hours + ':') + minutes + ':' + seconds; // Return is HH : MM : SS
  }
};
export const validateEmail = (email: any) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
