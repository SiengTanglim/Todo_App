import {Linking, Platform} from 'react-native';

const link = 'knowledge18://';
const url = 'https://knowledge18.page.link/';

export const deepLink = {
  link,
  url,
};

export const Type = {
  WEBSITE: 'website',
  FACEBOOK: 'facebook',
  YOUTUBE: 'youtube',
  TELEGRAM: 'telegram',
  TWITTER: 'twitter',
  HUNSEN: 'hunsen',
  API: 'api',
  WHATSAPP: 'whatsapp',
  STORE: 'store',
  INSTAGRAM: 'instagram',
};
export const FetchState = {
  LOADING: 'loading',
  DONE: 'done',
  PROBLEM: 'problem',
  ERROR: 'error',
};

export const TypeOffline = {
  AUDIO: 'WE Read Audio',
  VIDEO: 'WE Read Videos',
  BOOK: 'WE Read Book',
};

export async function checkLink(link_url: any, deep_link: any) {
  const supported = await Linking.canOpenURL(`${deep_link}`);
  if (supported) Linking.openURL(`${deep_link}`);
  else {
    Linking.openURL(`${link_url}`);
  }
}

export const GoToURL = (url: any) => {
  Linking.openURL(url);
};

export function onDeepLink(
  type: any,
  alias: any,
  alias_android: any = null,
  alias_ios: any = null,
) {
  if (type === Type.WEBSITE) {
    Linking.openURL(`${alias}`);
    return;
  }
  if (type === Type.FACEBOOK) {
    let link_url = `http://www.facebook.com/${alias}`;
    let deep_link =
      Platform.OS === 'ios' ? `fb://profile/${alias}` : `fb://page/${alias}`;
    checkLink(link_url, deep_link);
  } else if (type === Type.YOUTUBE) {
    let link_url = `http://www.youtube.com/channel/${alias}`;
    let deep_link = `vnd.youtube://channel/${alias}`;
    checkLink(link_url, deep_link);
  } else if (type === Type.TELEGRAM) {
    let link_url = `http://t.me/${alias}`;
    let deep_link = `tg://resolve?domain=${alias}`;
    checkLink(link_url, deep_link);
  } else if (type === Type.INSTAGRAM) {
    let link_url = `https://www.instagram.com/${alias}`;
    let deep_link = `instagram://user?username=${alias}`;
    checkLink(link_url, deep_link);
  } else if (type === Type.TWITTER) {
    let link_url = `http://twitter.com/${alias}`;
    let deep_link = `twitter://user?screen_name=${alias}`;
    checkLink(link_url, deep_link);
  } else if (type === Type.WHATSAPP) {
    let link_url = `http://wa.me/${alias}`;
    let deep_link = `whatsapp://send?text&phone=${alias}`;
    checkLink(link_url, deep_link);
  } else if (type === Type.STORE) {
    let link_url =
      Platform.OS === 'ios'
        ? `http://apps.apple.com/app/id${alias}`
        : `http://play.google.com/store/apps/details?id=${alias_android}`;
    let deep_link =
      Platform.OS === 'ios'
        ? `itms-apps://apps.apple.com/app/id/${alias_ios}`
        : `market://details?id=${alias_android}`;
    checkLinkApp(alias, link_url, deep_link);
  }
}

export async function checkLinkApp(alias: any, link_url: any, deep_link: any) {
  let supported = await Linking.canOpenURL(`${alias}://`);
  if (supported) Linking.openURL(`${alias}://`);
  else {
    supported = await Linking.canOpenURL(`${deep_link}`);
    if (supported) Linking.openURL(`${deep_link}`);
    else Linking.openURL(`${link_url}`);
  }
}
