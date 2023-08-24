import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { TextTranslate } from './TextTranslate';

const Loading = () => {
    return (
        <View style={styles.container}>
            <LottieView
                style={styles.loading}
                source={require('../../assets/lottie/loading.json')}
                autoPlay
                loop
            />
            <TextTranslate
                style={{
                    top: -40,
                }}>
                loading
            </TextTranslate>
        </View>
    );
};

export default React.memo(Loading);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',  
        alignItems: 'center',
    },
    loading: {
        height: 200,
        width: 200,
    },
});
