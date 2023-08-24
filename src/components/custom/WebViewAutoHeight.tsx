import React, {useState} from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import colors from '../../styles/colors';

const {width} = Dimensions.get('window');
const OsVer: any = Platform.constants;
const WebViewAutoHeight = ({description, onReady}: any) => {
  const [loading, setLoading] = useState(true);

  const generateAssetFontCss = ({fontFileName, extension = 'ttf'}: any) => {
    const fileUri = Platform.select({
      ios: `${fontFileName}.${extension}`,
      android: `file:///android_asset/fonts/${fontFileName}.${extension}`,
    });

    return `@font-face {
          font-family: '${fontFileName}';
          src: local('${fontFileName}'), url('${fileUri}') ;
      }`;
  };
  return (
    <>
      {loading && null}
      <AutoHeightWebView
        androidLayerType={
          Number(OsVer['Release']) > 11
            ? loading
              ? 'software'
              : 'hardware'
            : 'none'
        }
        dataDetectorTypes="none"
        scrollEnabled={false}
        style={{width: width}}
        customStyle={`
                ${generateAssetFontCss({
                  fontFileName: 'Battambang-Regular',
                  extension: 'ttf',
                })}
                * {
                    font-family: 'Battambang-Regular' !important;
                    line-height:${2} !important;
                    letter-spacing:${0.5}px !important;
                    margin-left: 5px;
                    margin-right: 5px;
                    color:${colors.iconColor}
                }
                li{
                    color:#515154;
                }
               
            img{
            width:calc(98%) !important;
            margin-left: 0px !important;
            margin-right: 0px !important;
            margin-top:6px !important;
            }

            h1{
                line-height: 35px;

            }
            iframe{
                color:#79fa12;
                font-size:30px;
                width:calc(100%) !important;
                margin-left: 0px !important;
                margin-right: 0px !important;
                }
                `}
            files={[
                {
                    href: "cssfileaddress",
                    type: "text/css",
                    rel: "stylesheet"
                }
            ]}
            source={{
                html:
                    '<html><head><link href="http://fonts.googleapis.com/css?family=Hanuman&display=swap" rel="stylesheet"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>' +
                    description +
                    "</html>"
            }}
            scalesPageToFit={true}
            viewportContent={"width=device-width, initial-scale=1.0, user-scalable=no"}
            onLoadEnd={() => {
                setLoading(false)
                if (onReady)
                    onReady()
            }}
        />
    </>
  );
};

export default WebViewAutoHeight;

const styles = StyleSheet.create({});
