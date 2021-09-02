export const validatePassword = (password) => {
    return [
        {
            name: 'Password must be at least 8 characters',
            passed: password.length >= 8,
        },
        {
            name: 'Password cannot contain emoji/unicode',
            passed: /^[ -~]+$/.test(password),
        },
    ]
}
