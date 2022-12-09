import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Box } from "@mui/system";
import { Container, Typography, Button } from "@mui/material";

import { TitleField, MDEField, SubtitleField, DeadlineField } from "../taskFields";
import { TaskFormValidation } from "../taskFields/taskFormValidation";

import { AddTask } from "api/taskrequests";
import { useAppSelector } from "store/hook";
import { selectUser } from "store/selectors";
import { IAddTask } from "types/taskTypes";

import "./addTask.scss";

const AddTaskComponent: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [mdeValue, setMdeValue] = useState("");

    const { userdata } = useAppSelector(selectUser);
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
        };
        AddTask(newData, userdata.token)
            .then(response => {
                console.log(response.message);
                // dispatch(addTask(response));
                setLoading(false);
                navigate("/");
            })
            .catch(error => {
                console.warn(error.message);
                alert("Add Task Error");
                setLoading(false);
            });
    };

    const MDEChange = useCallback((data: string) => {
        setMdeValue(data);
    }, []);

    const handleCancel = (): void => {
        navigate("/");
    };

    return (
        <Container className="add_page" maxWidth="sm">
            <Typography className="add_page_title">Add Task</Typography>
            <Box onSubmit={handleSubmit(onSubmit)} component="form">

                <TitleField register={register} error={errors} value={''}/>
                <SubtitleField register={register} value={''} />
                <MDEField MDEChange={MDEChange} />
                <DeadlineField register={register} value={''} />

                <Box className="add_page_button">
                    <Button
                        className="add_page_button_cancel"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button className="add_page_button_submit" type="submit">
                        {loading ? "Loading..." : "Submit"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AddTaskComponent;
