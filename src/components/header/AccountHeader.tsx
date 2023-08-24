// import {
//     StyleSheet,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useSelector } from 'react-redux';
// import style from '../../styles';
// import { TextTranslateBold } from '../custom/TextTranslate';
// import colors from '../../styles/colors';
// import { LabelBold } from '../custom/Label';

// const AccountHeader = ({ title, condition, leftIcon, rightIcon, is_translate, onPress }: any) => {
//     const no_connection = useSelector(
//         (state: { no_connection: any }) => state.no_connection,
//     );
//     return (
//         <View style={[styles.container]}>
//             <TouchableOpacity
//                 onPress={condition}
//                 style={styles.icon}>
//                 {no_connection ? null :
//                     <Ionicons name={leftIcon} size={22} color={colors.iconColor} />
//                 }
//             </TouchableOpacity>
//             <View style={styles.title}>
//                 {is_translate ? <TextTranslateBold numberOfLines={1} style={styles.titleText}>{title}</TextTranslateBold> :
//                     <LabelBold numberOfLines={1} style={styles.titleText}>{title}</LabelBold>
//                 }
//             </View>
//             <TouchableOpacity
//                 onPress={onPress}
//                 style={styles.icon}>
//                 {no_connection ? null : <Ionicons name={rightIcon} size={22} color={colors.iconColor} />}
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default React.memo(AccountHeader);

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: 55,
//         backgroundColor: colors.whiteColor,
//         ...style.shadowHeader,
//         marginBottom: 1
//     },
//     icon: {
//         width: 60,
//         height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     title: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     titleText: {
//         color: colors.iconColor,
//         fontSize: 15
//     }
// });
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AccountHeader = () => {
  return (
    <View>
      <Text>AccountHeader</Text>
    </View>
  )
}

export default AccountHeader

const styles = StyleSheet.create({})