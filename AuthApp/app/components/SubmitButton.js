import { useFormikContext } from 'formik';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';

const SubmitButton = ({ title }) => {
    const { handleSubmit, isSubmitting } = useFormikContext();
    return (
        <Pressable
            onPress={isSubmitting ? null : handleSubmit}
            style={[
                styles.submit,
                {
                    backgroundColor: isSubmitting ? 'gray' : '#8469cf',
                },
            ]}
        >
            <Text style={styles.btnText}>{title}</Text>
        </Pressable>
    );
};
//19
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    submit: {
        height: 50,
        width: width - 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default SubmitButton;
