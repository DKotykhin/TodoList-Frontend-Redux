import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";

import { TitleField, MDEField, SubtitleField, DeadlineField } from "../taskFields";
import { AddTaskFormValidation } from "../taskFields/taskFormValidation";
import SubmitCancelButtons from "./SubmitCancelButtons";

import { AddTask } from "api/taskrequests";
import { IAddTask } from "types/taskTypes";

import "./task.scss";

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
        AddTask(newData)
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
        <Container className="task" maxWidth="sm">
            <Typography className="task title">Add Task</Typography>
            <Box onSubmit={handleSubmit(onSubmit)} component="form">

                <TitleField register={register} error={errors} value={''} />
                <SubtitleField register={register} value={''} />
                <MDEField MDEChange={MDEChange} />
                <DeadlineField register={register} value={''} />

                <SubmitCancelButtons loading={loading} />
            </Box>
        </Container>
    );
};

export default AddTaskComponent;
