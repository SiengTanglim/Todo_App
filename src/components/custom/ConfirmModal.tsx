import {
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useMemo } from 'react';
import { HStack } from 'native-base';
import { deviceWidth, paddingHorizontal } from '../../styles';
import colors from '../../styles/colors';
import { TextTranslate, TextTranslateBold } from './TextTranslate';
import { Label } from './Label';

const ConfirmModal = (props: any) => {
    const { visible, description, is_translate = true, onClose, onSubmit } = props;

    const renderModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    onClose()
                }}>
                <View style={styles.backdrop}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <HStack style={styles.header}>
                                <TextTranslateBold style={[styles.modalText]}>confirm</TextTranslateBold>
                            </HStack>
                            <View style={styles.wrapDescription}>
                                {is_translate ? <TextTranslate style={styles.desc}>{description}</TextTranslate> :
                                    <Label style={styles.desc}>{description}</Label>}
                            </View>
                            <HStack style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={onClose}
                                    style={styles.button}>
                                    <TextTranslateBold style={{ color: colors.textSecondColor }}>no</TextTranslateBold>
                                </TouchableOpacity>
                                {onSubmit && <TouchableOpacity
                                    onPress={onSubmit}
                                    style={[styles.button, {
                                        borderLeftWidth: 0.3,
                                        borderLeftColor: colors.borderColorItem
                                    }]}>
                                    <TextTranslateBold style={{ color: colors.iconColor }}>yes</TextTranslateBold>
                                </TouchableOpacity>
                                }
                            </HStack>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };
    const RENDER_MODAL = useMemo(() => renderModal(), [visible]);

    return RENDER_MODAL;
};

export default React.memo(ConfirmModal);

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
    modalText: {
        textAlign: 'center',
        fontSize: 18,
        color: colors.baseColor,
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,.3)',
        flex: 1,
    },
    header: {
        height: 50,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20
    },
    closeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    desc: {
        fontSize: 16,
        textAlign: 'center',
    },
    wrapDescription: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: paddingHorizontal
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    buttonContainer: {
        height: 55,
        borderTopWidth: 0.3,
        borderTopColor: colors.borderColorItem
    }
});
