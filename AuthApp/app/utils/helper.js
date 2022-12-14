export const navigateToLogin = (navigation) => () => {
    navigation.navigate('Login');
};

export const navigateToForgetPassword = (navigation) => () => {
    navigation.navigate('ForgetPassword');
};

export const navigateToSignup = (navigation) => () => {
    navigation.navigate('Signup');
};

export const updateNotification = (updater, text, type = 'error') => {
    updater({ text, type });
    setTimeout(() => {
        updater({ text: '', type: '' });
    }, 2500);
};
