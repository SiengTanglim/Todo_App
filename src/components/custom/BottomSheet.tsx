import React from "react";
import { StyleSheet, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../../styles/colors";
import { TextTranslateBold } from "./TextTranslate";

export const BottomSheet = React.forwardRef((props: any, ref: any) => {
    const insets = useSafeAreaInsets();
    return (
      <RBSheet
        ref={ref}
        height={(props.h ? props.h : 180) + insets.bottom}
        openDuration={250}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: styles.bottomSheet,
          wrapper: {
            backgroundColor: 'rgba(0,0,0,.1)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.contentContainer}>
       
            <TextTranslateBold style={styles.bottomSheetTitle}>
             {props.title}
            </TextTranslateBold>
          {props.children}
        </View>
      </RBSheet>
    );
  });


  const styles = StyleSheet.create({
    bottomSheet: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4.65,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      elevation: 0.8,
      backgroundColor: colors.whiteColor,
    },
    contentContainer: {
      flex: 1,
    },
    bottomSheetTitle: {
      color: colors.baseColor,
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 5,
    }
  });