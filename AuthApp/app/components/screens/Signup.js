import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { navigateToForgetPassword, navigateToLogin, updateNotification } from '../../utils/helper';
import AppInput from '../AppInput';
import FormContainer from '../FormContainer';
import FormNavigator from '../FormNavigator';
import SubmitButton from '../SubmitButton';

import * as yup from 'yup';
import CustomFormik from '../CustomFormik';
import client from '../../api/client';
import { signup } from '../../utils/auth';
import AppNotification from '../AppNotification';
import { StackActions } from '@react-navigation/native';

const initialValues = {
    name: '',
    email: '',
    password: '',
};

const validationSchema = yup.object({
    name: yup.string().trim().required('Name is missing!'),
    email: yup.string().email('Invalid email!').required('Email is missing!'),
    password: yup.string().trim().min(8, 'Password is too short!').required('Password is missing!'),
});

const Signup = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState({
        text: '',
        type: '',
    });

    const handleSignup = async (values, formikActions) => {
        const res = await signup(values);
        formikActions.setSubmitting(false);

        if (!res.success) return updateNotification(setMessage, res.error);
        formikActions.resetForm();
        navigation.dispatch(StackActions.replace('Verification', { profile: res.user }));
    };

    return (
        <>
            {message.text ? <AppNotification type={message.type} text={message.text} /> : null}
            <FormContainer>
                <CustomFormik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSignup}>
                    <AppInput name="name" placeholder="John Doe" />
                    <AppInput name="email" placeholder="example@gmail.com" />
                    <AppInput secureTextEntry name="password" placeholder="********" />
                    <SubmitButton title="Sign up" />
                    <FormNavigator
                        onLeftLinkPress={navigateToLogin(navigation)}
                        onRightLinkPress={navigateToForgetPassword(navigation)}
                        leftLinkText="Log in"
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

export default Signup;
