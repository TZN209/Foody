import { useFormikContext } from 'formik';
import React from 'react';
import { View, StyleSheet, TextInput, Dimensions, Text } from 'react-native';

const AppInput = ({ name, placeholder, ...rest }) => {
    const { errors, values, touched, handleSubmit, handleBlur, handleChange } = useFormikContext();

    const value = values[name];
    const error = errors[name];
    const isInputTouched = touched[name];

    return (
        <>
            {error && isInputTouched ? <Text style={{ color: 'red', paddingVertical: 3 }}>{error}</Text> : null}
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={handleChange(name)}
                onBlur={handleBlur(name)}
                style={styles.input}
                {...rest}
            />
        </>
    );
};
//19
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    input: {
        width: width - 40,
        height: 50,
        backgroundColor: '#eae9e7',
        fontSize: 20,
        paddingHorizontal: 15,
        borderRadius: 8,
        color: '#8469cf',
        marginBottom: 20,
    },
});

export default AppInput;
