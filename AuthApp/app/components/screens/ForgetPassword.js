import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { navigateToLogin, navigateToSignup, updateNotification } from '../../utils/helper';
import AppInput from '../AppInput';
import FormContainer from '../FormContainer';
import FormNavigator from '../FormNavigator';
import SubmitButton from '../SubmitButton';

import * as yup from 'yup';
import CustomFormik from '../CustomFormik';
import { forgetPassword } from '../../utils/auth';
import AppNotification from '../AppNotification';

const initialValues = {
    email: '',
};

const validationSchema = yup.object({
    email: yup.string().email('Invalid email!').required('Email is missing!'),
});

const ForgetPassword = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState({
        text: '',
        type: '',
    });

    const handleResetLink = async (values, formikActions) => {
        const res = await forgetPassword(values.email);
        formikActions.setSubmitting(false);

        if (!res.success) return updateNotification(setMessage, res.error);
        formikActions.resetForm();
        updateNotification(setMessage, res.message, 'success');
    };
    return (
        <>
            {message.text ? <AppNotification type={message.type} text={message.text} /> : null}
            <FormContainer>
                <CustomFormik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleResetLink}
                >
                    <AppInput name="email" placeholder="example@gmail.com" />
                    <SubmitButton title="Send Link" />
                    <FormNavigator
                        onLeftLinkPress={navigateToLogin(navigation)}
                        onRightLinkPress={navigateToSignup(navigation)}
                        leftLinkText="Log in"
                        rightLinkText="Sign up"
                    />
                </CustomFormik>
            </FormContainer>
        </>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default ForgetPassword;
