import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const name = yup
    .string()
    .matches(/^([^0-9]*)$/, "Enter letters!")
    .min(2, "Minimum 2 characters to fill")
    .max(20, "Maximum 20 characters to fill")
    .required("Required field!");

const email = yup
    .string()
    .email("Wrong email address")
    .required("Required field!");

const password = yup
    .string()
    .required("Required field!")
    .min(8, "Minimum 8 characters to fill");

const registerschema = yup.object({
    name,
    email,
    password,
});

const loginschema = yup.object({
    email,
    password,
});

const passwordschema = yup.object({
    currentpassword: password,
});

const newpasswordschema = yup.object({
    newpassword: password,
    confirmpassword: password,
});

const profileschema = yup.object({
    name,
});

export const RegisterFormValidation: Object = {
    defaultValues: {
        name: "",
        email: "",
        password: "",
    },
    resolver: yupResolver(registerschema),
    mode: "onChange",
};

export const LoginFormValidation: Object = {
    defaultValues: {
        password: "",
        email: "",
        rememberMe: false,
    },
    resolver: yupResolver(loginschema),
    mode: "onChange",
};

export const PasswordFormValidation: Object = {
    defaultValues: {
        currentpassword: "",
    },
    resolver: yupResolver(passwordschema),
    mode: "onChange",
};

export const NewPasswordFormValidation: Object = {
    defaultValues: {
        newpassword: "",
        confirmpassword: "",
    },
    resolver: yupResolver(newpasswordschema),
    mode: "onChange",
};

export const ProfileFormValidation: Object = {
    defaultValues: {
        name: "",
        email: "",
    },
    resolver: yupResolver(profileschema),
    mode: "onChange",
};
