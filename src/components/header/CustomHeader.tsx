// import {StyleSheet, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useSelector} from 'react-redux';
// import {goBack} from '../../services/navigate';
// import style from '../../styles';
// import {TextTranslateBold} from '../custom/TextTranslate';
// import colors from '../../styles/colors';
// import {LabelBold} from '../custom/Label';

// const CustomHeader = ({
//   title,
//   rightIcon,
//   is_translate,
//   is_shadow = true,
//   is_back,
// }: any) => {
//   const no_connection = useSelector(
//     (state: {no_connection: any}) => state.no_connection,
//   );
//   const backgroundColor = useSelector((state: any) => state.backgroundColor);

//   return backgroundColor !== colors.whiteColor ? null : (
//     <View style={[styles.container, is_shadow ? {...style.shadowHeader} : {}]}>
//       <TouchableOpacity
//         onPress={() => {
//           no_connection && !is_back ? null : goBack();
//         }}
//         style={styles.icon}
//       >
//         {no_connection && !is_back ? null : (
//           <Ionicons
//             name="return-up-back-outline"
//             size={25}
//             color={colors.iconColor}
//           />
//         )}
//       </TouchableOpacity>
//       <View style={styles.title}>
//         {is_translate ? (
//           <TextTranslateBold numberOfLines={1} style={styles.titleText}>
//             {title}
//           </TextTranslateBold>
//         ) : (
//           <LabelBold numberOfLines={1} style={styles.titleText}>
//             {title}
//           </LabelBold>
//         )}
//       </View>
//       <TouchableOpacity style={styles.icon}>{rightIcon}</TouchableOpacity>
//     </View>
//   );
// };

// export default React.memo(CustomHeader);

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 55,
//     backgroundColor: colors.whiteColor,
//     marginBottom: 1,
//   },
//   icon: {
//     width: 60,
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   titleText: {
//     color: colors.iconColor,
//     fontSize: 15,
//   },
// });
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomHeader = () => {
  return (
    <View>
      <Text>CustomHeader</Text>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({})