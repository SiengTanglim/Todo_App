// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useRef, useState } from 'react'
// import { HStack, VStack } from 'native-base'
// import colors from '../../styles/colors'
// import FastImage from 'react-native-fast-image'
// import style, { deviceWidth, paddingHorizontal } from '../../styles'
// import Entypo from 'react-native-vector-icons/Entypo'
// import RBSheet from 'react-native-raw-bottom-sheet'
// import UploadImage from '../../components/custom/UploadImage'
// import { handleChange } from '../../services/utils/state'
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { navigate } from '../../services/navigate'
// import { FlatListScroll } from '../../components/custom/Flatlist'
// import MainHeader from '../header/MainHeader'

// const Account = () => {
//   // const toast = useToast();
//   const [visible, setVisible] = useState(false)
//   const bottomSheetRef = useRef<RBSheet>(null);

//   const [state, setState] = useState<any>({
//     // image: user === null ? null : (user.image ? { uri: user.image } : null)
//   });

//   const onShowBottomSheet = () => {
//     bottomSheetRef.current?.open();
//   };
//   const onClose = () => {
//     bottomSheetRef.current?.close();
//   };

//   const onSelectImage = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//         includeBase64: true,
//         maxHeight: 512,
//         maxWidth: 512,
//       },
//       (response: any) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.error) {
//           console.log('ImagePicker Error: ', response.error);
//         } else if (response.customButton) {
//           console.log('User tapped custom button: ', response.customButton);
//         } else {
//           setState(handleChange(state, 'image', response.assets[0]));
//           onSave();
//           onClose();
//         }
//       },
//     );
//   };
//   const onCamera = () => {
//     launchCamera(
//       {
//         mediaType: 'photo',
//         includeBase64: true,
//         maxHeight: 512,
//         maxWidth: 512,
//       },
//       (response: any) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.errorCode) {
//           console.log('ImagePicker Error: ', response.errorCode);
//         } else if (response.errorMessage) {
//           console.log('ImagePicker Error: ', response.errorMessage);
//         } else {
//           setState(handleChange(state, 'image', response.assets[0]));
//           onSave();
//           onClose();
//         }
//       },
//     );
//   };

//   const onSave = () => {
//     // var formdata = new FormData();
//     // if (state.image === null) {
//     //   formdata.append("image", null);
//     // }
//     // else {
//     //   let is_update = true
//     //   if (state.image.uri === user.image) {
//     //     is_update = false
//     //   }
//     //   if (is_update) {
//     //     formdata.append("image", {
//     //       uri: state.image.uri,
//     //       name: state.image.fileName,
//     //       type: state.image.type,
//     //       data: state.image.base64
//     //     });
//     //   }
//     // }
//     // fetchAPI(MethodType.POST, `user/update-profile?`, '', formdata).then((result: any) => {
//     //   dispatch(loadUser(result.user));
//     //   showToast(toast, 'saved');

//     // });
//   };

//   const onCloseModal = () => {
//     setVisible(!visible)
//   }

//   // const onLogOut = async () => {
//   //   onCloseModal()
//   //   dispatch(loadUser(null))
//   //   await AsyncStorage.setItem('@id', '')
//   //   await AsyncStorage.setItem('@token', '')
//   //   loadLessonData(dispatch)

//   // };

//   const onRemoveImage = () => {
//     // var formdata = new FormData();
//     // formdata.append("image", null);
//     // fetchAPI(MethodType.POST, `user/update-profile?`, '', formdata).then((result: any) => {
//     //   dispatch(loadUser(result.user));
//     //   showToast(toast, 'saved');
//     // });
//   }

//   return(
//     <View style={style.flexContainer}>
//       <MainHeader />
//       <FlatListScroll>
//         <UploadImage
//           ref={bottomSheetRef}
//           size={state.image == null ? 180 : 220}
//           onCamera={onCamera}
//           onSelectImage={onSelectImage}
//           image={state.image}
//           onDelete={() => {
//             setState(handleChange(state, 'image', null))
//             onRemoveImage()
//             onClose();
//           }}
//         />
//         <VStack style={styles.container}>
//           <HStack>
//             <View style={{ width: 80, height: 80 }}>
//               {state?.image == null ?
//                 <View style={styles.namecolor}>
//                   <Text style={[style.pBold, { color: colors.whiteColor, fontSize: 20 }]}>
//                    shadfh</Text>
//                 </View>
//                 :
//                 <FastImage
//                   source={{ uri: state.image.uri }}
//                   style={styles.image}
//                   resizeMode='cover'
//                 />
//               }
//               <TouchableOpacity
//                 onPress={() => onShowBottomSheet()}
//                 style={[styles.updateProfile]}>
//                 <Entypo name='camera' size={15} color={colors.whiteColor} />
//               </TouchableOpacity>
//             </View>
//             <View style={{ marginLeft: 20, flex: 1 }}>
//               <TouchableOpacity>
//                 <Text
//                   style={[
//                     style.pBold,
//                     { fontSize: 15 },
//                   ]}>
//                  lim
//                 </Text>
//               </TouchableOpacity>
//               <Text style={[style.pBold, { fontSize: 14, color: colors.iconColor }]}>
//                 (+855) 10101010
//               </Text>
//               <TouchableOpacity
//                 onPress={() => navigate('MemberVIP')}
//                 style={styles.status}
//               >
//               </TouchableOpacity>
//             </View>
//           </HStack>
          
//         </VStack>
//       </FlatListScroll>
      
//     </View>
//   )
// }

// export default Account

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.whiteColor,
//     padding: paddingHorizontal,
//     shadowColor: colors.iconColor,
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.20,
//     shadowRadius: 1.41,
//     elevation: 1,
//   },
//   linearGradient: {
//     flex: 1,
//     padding: paddingHorizontal,
//     borderRadius: 20,
//     overflow: 'hidden',
//     justifyContent: 'center',
//     margin: paddingHorizontal
//   },
//   border: {
//     height: 20,
//     width: 1,
//     backgroundColor: colors.textSecondColor
//   },
//   bordersmoke: {
//     height: 10,
//     backgroundColor: colors.whiteSmoke
//   },
//   again: {
//     color: colors.baseColor,
//     marginTop: 10,
//     textAlign: 'center',
//     fontSize: 13
//   },
//   namecolor: {
//     backgroundColor: colors.inActiveColor,
//     height: 80,
//     width: 80,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   image: {
//     height: 80,
//     width: 80,
//     borderRadius: 40,
//   },
//   updateProfile: {
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(120, 120, 120,0.5)',
//     height: 35,
//     width: 35,
//     bottom: -5,
//     right: 0,
//     borderRadius: 20,
//   },
//   category: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: colors.whiteColor,
//     borderBottomWidth: 0.3,
//     borderBottomColor: colors.borderColorItem
//   },
//   categoryText: {
//     marginLeft: 15,
//     color: colors.textColor,
//     fontSize: 12
//   },
//   status: {
//     flex: 1,
//     marginTop: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.secondColor,
//     width: 90,
//     paddingVertical: 2,
//     borderRadius: 20,
//     justifyContent: 'center',
//   }
// })


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Account = () => {
  return (
    <View>
      <Text>Account</Text>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({})