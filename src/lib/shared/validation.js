export const validatePassword = (password) => {
    return [
        {
            name: 'Password must be at least 8 characters',
            passed: password.length >= 8,
        },
        {
            name: 'Password must contain at least one number',
            passed: /[0-9]/.test(password),
        },
        {
            name:
                'Password must contain at least one special character (#?!@$%^&*-)',
            passed: /[#?!@$%^&*-]/.test(password),
        },
    ]
}
