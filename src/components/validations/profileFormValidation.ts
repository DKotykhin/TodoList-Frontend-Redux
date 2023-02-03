import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const profileschema = yup.object({
    name: yup.string()
        .matches(/^([^0-9]*)$/, 'Enter letters!')
        .min(2, 'Minimum 2 characters to fill')
        .required('Required field!'),    
});

export const ProfileFormValidation: Object = {
    defaultValues: {
        name: '',
        email: ''        
    },
    resolver: yupResolver(profileschema),
    mode: 'onBlur'
}