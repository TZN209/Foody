import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { navigateToForgetPassword, navigateToSignup, updateNotification } from '../../utils/helper';
import AppInput from '../AppInput';
import CustomFormik from '../CustomFormik';
import FormContainer from '../FormContainer';
import FormNavigator from '../FormNavigator';
import SubmitButton from '../SubmitButton';

import * as yup from 'yup';
import { signin } from '../../utils/auth';
import AppNotification from '../AppNotification';

const initialValues = {
    email: '',
    password: '',
};

const validationSchema = yup.object({
    email: yup.string().email('Invalid email!').required('Email is missing!'),
    password: yup.string().trim().min(8, 'Password is too short!').required('Password is missing!'),
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
                    <AppInput name="email" placeholder="example@gmail.com" />
                    <AppInput secureTextEntry name="password" placeholder="********" />
                    <SubmitButton title="Login" />
                    <FormNavigator
                        onLeftLinkPress={navigateToSignup(navigation)}
                        onRightLinkPress={navigateToForgetPassword(navigation)}
                        leftLinkText="Sign up"
                        rightLinkText="Forget password"
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