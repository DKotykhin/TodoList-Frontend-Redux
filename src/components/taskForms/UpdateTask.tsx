import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { format } from "date-fns";
import { toast } from 'react-toastify';

import { Container, Typography, InputLabel, Checkbox } from "@mui/material";
import { Box } from "@mui/system";

import { UpdateTaskFormValidation } from "../validations/taskFormValidation";
import { TitleField, MDEField, SubtitleField, DeadlineField } from "../fields/taskFields";
import Buttons from "./buttons/Buttons";

import Task from "api/taskrequests";

import { ITask, IUpdateTask } from "types/taskTypes";

import styles from "./task.module.scss";
import Spinner from "components/spinner/Spinner";

interface IUpdateForm {
    title: string;
    subtitle?: string;
    deadline?: string;
    completed: boolean;
}

const UpdateTaskComponent: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [mdeValue, setMdeValue] = useState("");
    const [singleTask, setSingleTask] = useState<ITask>();

    const [oneTaskLoading, setOneTaskLoading] = useState(false);
    const [oneTaskError, setOneTaskError] = useState(false);

    const { taskId } = useParams();

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<IUpdateForm>(UpdateTaskFormValidation);

    useEffect(() => {
        if (taskId) {
            setOneTaskError(false);
            setOneTaskLoading(true);
            Task.GetOneTask(taskId)
                .then(response => setSingleTask(response))
                .catch((error) => {
                    console.log(error);
                    setOneTaskError(true);
                })
                .finally(() => {
                    setOneTaskLoading(false);
                });
        }
    }, [taskId]);

    const onSubmit = (data: IUpdateForm): void => {
        const { title, subtitle, deadline, completed } = data;
        const totalData: IUpdateTask = {
            _id: singleTask?._id || "",
            title,
            subtitle,
            completed,
            description: mdeValue,
            ...(deadline && { deadline: new Date(deadline).toJSON() }),
        };
        setLoading(true);
        Task.UpdateTask(totalData)
            .then(response => {
                toast.success(response.message);
                navigate("/", { replace: true });
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

    return oneTaskLoading ? <Spinner /> : (
        <Container className={styles.task} maxWidth="sm">
            <Typography className={styles.task__title}>Update Task</Typography>
            {
                oneTaskError ?
                    <Typography className={styles.task__error}>Can't load task...</Typography>
                    : singleTask &&
                    <Box onSubmit={handleSubmit(onSubmit)} component="form">

                        <TitleField register={register} error={errors} value={singleTask.title} />
                        <SubtitleField register={register} value={singleTask.subtitle} />
                        <MDEField MDEChange={MDEChange} description={singleTask.description} />
                        <DeadlineField register={register} value={format(new Date(singleTask.deadline || ""), "yyyy-LL-dd HH:mm")} />

                        <Box className={styles.task__checkbox}>
                            <Checkbox
                                {...register("completed")}
                                defaultChecked={singleTask.completed}
                            />
                            <InputLabel>Completed</InputLabel>
                        </Box>
                        <Buttons loading={loading} />
                    </Box>
            }
        </Container>
    );
};

export default UpdateTaskComponent;
