// import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import colors from '../../styles/colors';
// import {LabelBold} from '../custom/Label';
// import style, {paddingHorizontal} from '../../styles';
// import {HStack} from 'native-base';

// const MainHeader = ({onPress, title, is_translate = true, rightIcon}: any) => {
//   return (
//     <View style={styles.container}>
//       <HStack style={{alignItems: 'center'}}>
//         <Image
//           source={require('../../res/logo/logo_header.png')}
//           style={{width: 50, height: 50, marginHorizontal: paddingHorizontal}}
//         />
//         <LabelBold
//           style={{
//             color: colors.baseColor,
//           }}
//         >
//           KNOWLEDGE18
//         </LabelBold>
//       </HStack>
//       <TouchableOpacity onPress={onPress} style={style.button}>
//         <Ionicons name={rightIcon} size={22} color={colors.iconColor} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default MainHeader;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     height: 55,
//     backgroundColor: colors.whiteColor,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 2,
//     marginBottom: 1,
//     paddingRight: 5,
//   },
//   title: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
// });
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import colors from '../../styles/colors'
import {HStack} from 'native-base';
import style,{ paddingHorizontal } from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MainHeader = ({onPress, title, is_translate = true, rightIcon}: any) => {
  return (
    <View style={styles.container}>
       <HStack style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/unnamed.png')}
          style={{width: 50, height: 50, marginHorizontal: paddingHorizontal}}
        />
        <Text style={styles.title}>{title}</Text>
      </HStack>
      <TouchableOpacity onPress={onPress} style={style.button}>
        <Ionicons name={rightIcon} size={22} color={colors.whiteColor} />
      </TouchableOpacity>
    </View>
  )
}

export default MainHeader

const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
    backgroundColor: colors.baseColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 1,
    paddingRight: 5,
  },
  title:{
    color:colors.whiteColor
  }
})