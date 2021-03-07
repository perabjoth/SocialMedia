const isNotEmail = require('sane-email-validation').isNotEmail
module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }

    if(email.trim() === ''){
        errors.email = 'Email must not be empty';
    } else{
        if(isNotEmail(email)){
            errors.email = 'Email must be a valid email address';
        }
    }

    if(password === ''){
        errors.password = 'Password must not be empty';
    } else if (password !== confirmPassword){
        errors.confirmPassword = 'Password must match';
    }
    return {errors: errors,
            valid: Object.keys(errors).length < 1
    };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }

    if(password === ''){
        errors.password = 'Password must not be empty';
    }

    return {errors: errors,
        valid: Object.keys(errors).length < 1
    };
};