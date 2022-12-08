import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const profileschema = yup.object({
    name: yup.string()
        .matches(/^([^0-9]*)$/, 'Enter letters!')
        .min(2, 'Minimum 2 characters to fill')
        .required('Required field!'),
    // age: yup
    //     .number()
    //     .typeError('Enter numbers!')
    //     .integer('Enter integer numbers!')
    //     .min(12, 'Too young!')
    //     .max(99, 'Too old!')
    //     // .positive('Введите положительные числа!')
});

export const ProfileFormValidation: Object = {
    defaultValues: {
        name: '',
        // age: '',
    },
    resolver: yupResolver(profileschema),
    mode: 'onBlur'
}