/**
 * @format
 */
import React from 'react';
import { AppRegistry, LogBox, Text, TextInput, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import store from './src/redux/store';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';


LogBox.ignoreLogs(["Require cycle", "Warning"]);
LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
])
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
])
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection'])
LogBox.ignoreLogs(["Sending", "Warning"]);
LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreLogs(['SyntaxError: JSON Parse error: Unexpected token:', "Warning"])
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;

String.prototype.format = function () {
  a = this;
  for (k in arguments) {
    a = a.replace("{" + k + "}", arguments[k])
  }
  return a
}

if (TouchableOpacity.defaultProps == null) TouchableOpacity.defaultProps = {};
TouchableOpacity.defaultProps.activeOpacity = 0.8;

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    return null;
  }
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(HeadlessCheck));


