import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {deviceHeight, deviceWidth} from '../../styles';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
import colors from '../../styles/colors';
import Feather from 'react-native-vector-icons/Feather';
const ImageModal = (props: any) => {
  const {visible, onClose, image} = props;
  const renderModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.backdrop}>
          <ImageZoom
            cropWidth={deviceWidth}
            cropHeight={deviceHeight}
            imageWidth={deviceWidth}
            imageHeight={deviceHeight}
            enableSwipeDown={true}
            onSwipeDown={onClose}
            minScale={0.9}
            useNativeDriver={true}
          >
            <FastImage
              source={{uri: image}}
              resizeMode="contain"
              style={styles.img}
            />
          </ImageZoom>
          <TouchableOpacity onPress={onClose} style={styles.xIcon}>
            <Feather name="x" color={colors.whiteColor} size={25} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  const RENDER_MODAL = useMemo(() => renderModal(), [visible]);

  return RENDER_MODAL;
};

export default React.memo(ImageModal);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: deviceWidth - 80,
    minHeight: 220,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  xIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
