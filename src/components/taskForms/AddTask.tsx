import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";

import { TitleField, MDEField, SubtitleField, DeadlineField } from "../taskFields";
import { TaskFormValidation } from "../taskFields/taskFormValidation";

import { AddTask } from "api/taskrequests";
import { IAddTask } from "types/taskTypes";

import "./task.scss";
import SubmitCancelButtons from "./SubmitCancelButtons";

const AddTaskComponent: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [mdeValue, setMdeValue] = useState("");
    
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IAddTask>(TaskFormValidation);

    const onSubmit = (data: IAddTask): void => {
        const { title, subtitle, deadline } = data;
        setLoading(true);
        const newDeadline: string = deadline ? new Date(deadline).toJSON() : ''
        const newData: IAddTask = {
            title,
            subtitle,
            description: mdeValue,
            deadline: newDeadline,
            completed: false
        };
        AddTask(newData)
            .then(response => {
                console.log(response.message);                
                navigate("/");
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.response.data.message || error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const MDEChange = useCallback((data: string) => {
        setMdeValue(data);
    }, []);

    return (
        <Container className="task" maxWidth="sm">
            <Typography className="task title">Add Task</Typography>
            <Box onSubmit={handleSubmit(onSubmit)} component="form">

                <TitleField register={register} error={errors} value={''}/>
                <SubtitleField register={register} value={''} />
                <MDEField MDEChange={MDEChange} />
                <DeadlineField register={register} value={''} />

                <SubmitCancelButtons loading={loading} />
            </Box>
        </Container>
    );
};

export default AddTaskComponent;
