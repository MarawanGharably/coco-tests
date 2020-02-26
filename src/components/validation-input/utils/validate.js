const PASSWORD_REGEX_LOWERCASE = RegExp('^(?=.*[a-z])');
const PASSWORD_REGEX_UPPERCASE = RegExp('^(?=.*[A-Z])');
const PASSWORD_REGEX_NUMERIC = RegExp('^(?=.*[0-9])');
const PASSWORD_LENGTH = 8;

const EMAIL_REGEX = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

const validatePassword = (password) => {
    const errors = [];
    if (!PASSWORD_REGEX_LOWERCASE.test(password)) {
        errors.push(['lowercase', 'Passwords must contain at least 1 lowercase alphabetical character']);
    }
    if (!PASSWORD_REGEX_UPPERCASE.test(password)) {
        errors.push(['uppercase', 'Passwords must contain at least 1 uppercase alphabetical character']);
    }
    if (!PASSWORD_REGEX_NUMERIC.test(password)) {
        errors.push(['numeric', 'Passwords must contain at least 1 numeric character']);
    }
    if (password.length < PASSWORD_LENGTH) {
        errors.push(['length', `Passwords must contain at least ${PASSWORD_LENGTH} characters`]);
    }
    return errors;
};

const validateEmail = (email) => {
    const errors = [];
    if (!EMAIL_REGEX.test(email)) {
        errors.push(['email', 'Email is not valid']);
    }
    return errors;
};

export { validatePassword, validateEmail };
