import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const taskschema = yup.object({
    title: yup
        .string()
        .required("Required field!")
        .min(2, "Minimum 2 characters to fill"),
});

export const AddTaskFormValidation: Object = {
    defaultValues: {
        title: "",
        subtitle: "",
        description: "",
        deadline: "",
        completed: false,
    },
    resolver: yupResolver(taskschema),
    mode: "onChange",
};

export const UpdateTaskFormValidation: Object = {    
    resolver: yupResolver(taskschema),
    mode: "onChange",
};
