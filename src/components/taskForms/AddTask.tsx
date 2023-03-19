import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";

import { TitleField, MDEField, SubtitleField, DeadlineField } from "../fields/taskFields";
import { AddTaskFormValidation } from "../validations/taskFormValidation";
import Buttons from "./buttons/Buttons";

import Task from "api/taskrequests";
import { IAddTask } from "types/taskTypes";

import styles from "./task.module.scss";

const AddTaskComponent: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [mdeValue, setMdeValue] = useState("");

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IAddTask>(AddTaskFormValidation);

    const onSubmit = (data: IAddTask): void => {
        const { title, subtitle, deadline } = data;
        setLoading(true);        
        const newData: IAddTask = {
            title,
            subtitle,
            description: mdeValue,
            ...(deadline && { deadline: new Date(deadline).toJSON() }),
            completed: false
        };
        Task.AddTask(newData)
            .then(response => {
                toast.success(response.message);
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.response.data.message || error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const MDEChange = useCallback((data: string) => {
        setMdeValue(data);
    }, []);

    return (
        <Container className={styles.task} maxWidth="sm">
            <Typography className={styles.task__title}>Add Task</Typography>
            <Box onSubmit={handleSubmit(onSubmit)} component="form">

                <TitleField register={register} error={errors} value={''} />
                <SubtitleField register={register} value={''} />
                <MDEField MDEChange={MDEChange} />
                <DeadlineField register={register} value={''} />

                <Buttons loading={loading} />
            </Box>
        </Container>
    );
};

export default AddTaskComponent;
