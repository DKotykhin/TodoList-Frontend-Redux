import React, { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { format } from "date-fns";

import {
    Container,
    Typography,
    InputLabel,
    Checkbox,
    Button,
} from "@mui/material";
import { Box } from "@mui/system";

import { TaskFormValidation } from "components/taskFields/taskFormValidation";
import { TitleField, MDEField, SubtitleField, DeadlineField } from "../taskFields";

import { UpdateTask } from "api/taskrequests";
// import { updateTaskAll } from "store/taskSlice";
import { selectTask, selectUser } from "store/selectors";
import { useAppSelector } from "store/hook";
import { IUpdateTask } from "types/taskTypes";

import "./updateTask.scss";



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
    const { userdata } = useAppSelector(selectUser);

    const params = useParams();;
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm<IUpdateForm>(TaskFormValidation);

    const currentTask = taskdata.filter((task) => task._id === params.taskId);
    const { title, subtitle, description, deadline, _id, completed } =
        currentTask[0];

    const parseDeadline = deadline ? format(new Date(deadline), "yyyy-LL-dd") : '';

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
        UpdateTask(totalData, userdata.token)
            .then(response => {
                console.log(response.message);
                navigate("/", { replace: true });
                setLoading(false);
            })
            .catch(error => {
                console.warn(error.message);
                alert("Update Task Error");
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
        <Container className="update_page" maxWidth="sm">
            <Typography className="update_page_title">Update Task</Typography>
            <Box onSubmit={handleSubmit(onSubmit)} component="form">

                <TitleField register={register} error={errors} value={title} />
                <SubtitleField register={register} value={subtitle} />
                <MDEField MDEChange={MDEChange} description={description} />
                <DeadlineField register={register} value={parseDeadline} />

                <Box className="update_page_checkbox">
                    <Checkbox
                        {...register("completed")}
                        defaultChecked={completed}
                    />
                    <InputLabel sx={{ mt: 1 }}>Completed</InputLabel>
                </Box>
                <Box className="update_page_button">
                    <Button
                        className="update_page_button_cancel"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button className="update_page_button_submit" type="submit">
                        {loading ? "Loading..." : "Submit"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default UpdateTaskComponent;
