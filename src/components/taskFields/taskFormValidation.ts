import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const taskschema = yup.object({
    title: yup.string()
        .required('Required field!')
        .min(2, 'Minimum 2 characters to fill')
});


export const TaskFormValidation: Object = {
    // defaultValues: {
    //     title: ''
    // },
    resolver: yupResolver(taskschema),
    mode: 'onBlur'
}