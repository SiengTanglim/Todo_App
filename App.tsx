import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainHeader from './src/components/header/MainHeader'
import { extendTheme, NativeBaseProvider } from 'native-base';
import Route from './src/navigation/Route';

const App = () => {
  const theme = extendTheme({
    components: {
      Select: {
        baseStyle: {},
        defaultProps: {},
        variants: {},
        sizes: {},
      },
    },
  });
  return (
      <NativeBaseProvider theme={theme}>
        <Route/>
     </NativeBaseProvider>
  )
}

export default App

const styles = StyleSheet.create({})