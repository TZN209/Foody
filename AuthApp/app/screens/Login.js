import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { navigateToForgetPassword, navigateToSignup, updateNotification } from '../utils/helper';
import AppInput from '../components/AppInput';
import CustomFormik from '../components/CustomFormik';
import FormContainer from '../components/FormContainer';
import FormNavigator from '../components/FormNavigator';
import SubmitButton from '../components/SubmitButton';

import * as yup from 'yup';
import { signin } from '../utils/auth';
import AppNotification from '../components/AppNotification';

const initialValues = {
    email: '',
    password: '',
};

const validationSchema = yup.object({
    email: yup.string().email('Email không hợp lệ!').required('Email bị thiếu!'),
    password: yup.string().trim().min(8, 'Mật khẩu quá ngắn!').required('Mật khẩu bị thiếu!'),
});

const Login = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState({
        text: '',
        type: '',
    });

    const handleLogin = async (values, formikActions) => {
        const res = await signin(values);
        formikActions.setSubmitting(false);

        if (!res.success) return updateNotification(setMessage, res.error);
        formikActions.resetForm();
        navigation.dispatch(StackActions.replace('Home', { profile: res.user }));
    };

    return (
        <>
            {message.text ? <AppNotification type={message.type} text={message.text} /> : null}
            <FormContainer>
                <CustomFormik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
                    <AppInput name="email" placeholder="nguyenvanA@gmail.com" />
                    <AppInput secureTextEntry name="password" placeholder="********" />
                    <SubmitButton title="Đăng nhập" />
                    <FormNavigator
                        onLeftLinkPress={navigateToSignup(navigation)}
                        onRightLinkPress={navigateToForgetPassword(navigation)}
                        leftLinkText="Đăng ký"
                        rightLinkText="Quên mật khẩu"
                    />
                </CustomFormik>
            </FormContainer>
        </>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default Login;
