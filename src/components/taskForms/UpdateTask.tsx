import React, { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { format } from "date-fns";

import { Container, Typography, InputLabel, Checkbox } from "@mui/material";
import { Box } from "@mui/system";

import { UpdateTaskFormValidation } from "../taskFields/taskFormValidation";
import SubmitCancelButtons from "./SubmitCancelButtons";
import { TitleField, MDEField, SubtitleField, DeadlineField } from "../taskFields";

import { UpdateTask } from "api/taskrequests";
import { selectTask } from "store/selectors";
import { useAppSelector } from "store/hook";

import { IUpdateTask } from "types/taskTypes";

import "./task.scss";

interface IUpdateForm {
    title: string;
    subtitle?: string;
    deadline?: string;
    completed: boolean;
}

const UpdateTaskComponent: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [mdeValue, setMdeValue] = useState("");

    const { taskdata } = useAppSelector(selectTask);
    const params = useParams();;
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<IUpdateForm>(UpdateTaskFormValidation);

    const currentTask = taskdata.tasks.filter((task) => task._id === params.taskId);
    const { title, subtitle, description, deadline, _id, completed } =
        currentTask[0];

    const parseDeadline = deadline ? format(new Date(deadline), "yyyy-LL-dd HH:mm") : '';

    const onSubmit = (data: IUpdateForm): void => {
        const { title, subtitle, deadline, completed } = data;
        const newDeadline = deadline ? new Date(deadline).toJSON() : '';
        const totalData: IUpdateTask = {
            _id,
            title,
            subtitle,
            completed,
            description: mdeValue,
            deadline: newDeadline,
        };
        setLoading(true);
        UpdateTask(totalData)
            .then(response => {
                console.log(response.message);
                navigate("/", { replace: true });
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
            <Typography className="task title">Update Task</Typography>
            <Box onSubmit={handleSubmit(onSubmit)} component="form">

                <TitleField register={register} error={errors} value={title} />
                <SubtitleField register={register} value={subtitle} />
                <MDEField MDEChange={MDEChange} description={description} />
                <DeadlineField register={register} value={parseDeadline} />

                <Box className="task checkbox">
                    <Checkbox
                        {...register("completed")}
                        defaultChecked={completed}
                    />
                    <InputLabel sx={{ mt: 1 }}>Completed</InputLabel>
                </Box>
                <SubmitCancelButtons loading={loading} />
            </Box>
        </Container>
    );
};

export default UpdateTaskComponent;
