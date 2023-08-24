import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import style from '../../styles'

const Main = ({ children }: any) => {
  return (
    <View style={style.flexContainer}>
      {children}
    </View>
  )
}

export default React.memo(Main)

const styles = StyleSheet.create({})