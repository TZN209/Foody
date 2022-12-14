import { StackActions } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { verifyEmail } from '../../utils/auth';

const inputs = Array(4).fill('');
let newInputIndex = 0;

const isObjValid = (obj) => {
    return Object.values(obj).every((val) => val.trim());
};

const Verification = ({ route, navigation }) => {
    const { profile } = route.params;
    const input = useRef();
    const [OTP, setOTP] = useState({ 0: '', 1: '', 2: '', 3: '' });
    const [nextInputIndex, setNextInputIndex] = useState(0);
    const handleChangeText = (text, index) => {
        const newOTP = { ...OTP };
        newOTP[index] = text;
        setOTP(newOTP);

        const lastInputIndex = inputs.length - 1;
        if (!text) newInputIndex = index === 0 ? 0 : index - 1;
        else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
        setNextInputIndex(newInputIndex);
    };

    useEffect(() => {
        input.current.focus();
    }, [nextInputIndex]);

    const submitOTP = async () => {
        Keyboard.dismiss();

        if (isObjValid(OTP)) {
            let val = '';

            Object.values(OTP).forEach((v) => {
                val += v;
            });

            const res = await verifyEmail(val, profile.id);
            if (!res.success) return console.log(res.error);
            navigation.dispatch(StackActions.replace('Login', { profile: res.user }));
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.heading}> Please verify your, PIN has been sent to your email.</Text>
            <View style={styles.otpContainer}>
                {inputs.map((inp, index) => {
                    return (
                        <View key={index.toString()} style={styles.inputContainer}>
                            <TextInput
                                value={OTP[index]}
                                onChangeText={(text) => handleChangeText(text, index)}
                                placeholder="0"
                                keyboardType="numeric"
                                maxLength={1}
                                style={styles.input}
                                ref={nextInputIndex === index ? input : null}
                            />
                        </View>
                    );
                })}
            </View>
            <TouchableOpacity style={styles.submitIcon} onPress={submitOTP}>
                <Icon name="checkmark-outline" size={24} color="#fff" />
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const { width } = Dimensions.get('window');
const inputWidth = Math.round(width / 6);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    heading: {
        color: '8469cf',
        textAlign: 'center',
        marginBottom: 15,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: inputWidth / 2,
    },
    inputContainer: {
        width: inputWidth,
        height: inputWidth,
        borderWidth: 2,
        borderColor: '#8469cf',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: 25,
        paddingHorizontal: 15,
    },
    submitIcon: {
        alignSelf: 'center',
        padding: 15,
        backgroundColor: '#8469cf',
        borderRadius: 50,
        marginTop: 15,
    },
});

export default Verification;
