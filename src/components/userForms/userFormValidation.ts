import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const registerschema = yup.object({
    name: yup.string()
        .matches(/^([^0-9]*)$/, 'Enter letters!')
        .min(2, 'Minimum 2 characters to fill')
        .required('Required field!'),
    email: yup
        .string()
        .email('Wrong email address')
        .required('Required field!'),
    password: yup
        .string()
        .required('Required field!')
        .min(8, 'Minimum 8 characters to fill')
});

const loginschema = yup.object({
    email: yup
        .string()
        .email('Wrong email address')
        .required('Required field!'),
    password: yup
        .string()
        .required('Required field!')
        .min(8, 'Minimum 8 characters to fill')
});

const passwordschema = yup.object({
    password: yup
        .string()
        .required('Required field!')
        .min(8, 'Minimum 8 characters to fill'),
    confirmpassword: yup
        .string()
        .required('Required field!')
        .min(8, 'Minimum 8 characters to fill')
});

export const RegisterFormValidation: Object = {
    defaultValues: {
        name: '',
        email: '',
        password: '',
    },
    resolver: yupResolver(registerschema),
    mode: 'onChange'
}

export const LoginFormValidation: Object = {
    defaultValues: {
        password: '',
        email: '',
        rememberMe: false
    },
    resolver: yupResolver(loginschema),
    mode: 'onChange'
}

export const PasswordFormValidation: Object = {
    defaultValues: {
        password: '',
        confirmpassword: ''
    },
    resolver: yupResolver(passwordschema),
    mode: 'onChange'
}
