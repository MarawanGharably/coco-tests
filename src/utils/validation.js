/**
 * Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
 * @param password {str}
 * @returns {boolean}
 */
export const isValidPassword = (password) => {
    if (!password) return false;
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w?!@$%^&*-]{8,45}$/;
    return re.test(password) !== false;
};


export const isValidEmail = (email) => {
    if (!email) return false;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email) !== false;
};
