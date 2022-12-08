import React, { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { format } from "date-fns";

import {
    Container,
    Typography,
    Paper,
    TextField,
    InputLabel,
    Checkbox,
    Button,
} from "@mui/material";
import { Box } from "@mui/system";

import { UpdateTask } from "api/taskrequests";
// import { updateTaskAll } from "store/taskSlice";
import { selectTask, selectUser } from "store/selectors";
import { useAppSelector } from "store/hook";
import { MDEField } from "../taskFields/MDEField";
import { IUpdateTask } from "types/taskTypes";

import "./updateTask.scss";
import { TaskFormValidation } from "components/taskFields/taskFormValidation";

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

    const params = useParams();
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm<IUpdateForm>(TaskFormValidation);

    const currentTask = taskdata.filter((task) => task._id === params.taskId);
    const { title, subtitle, description, deadline, _id, completed } =
        currentTask[0];

    const parseDeadline = deadline ? format(new Date(deadline), "yyyy-LL-dd") : '';

    const onSubmit = (data: IUpdateForm) => {
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
            .then(function (response) {
                console.log(response.data.message);
                navigate("/", { replace: true });
                // dispatch(updateTaskAll(response.data));
                setLoading(false);
            })
            .catch(function (error) {
                console.warn(error.message);
                alert("Update Task Error");
            });
    };

    const MDEChange = useCallback((data: string) => {
        setMdeValue(data);
    }, []);

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <Container className="update_page" maxWidth="sm">
            <Typography className="update_page_title">Update Task</Typography>
            <Box onSubmit={handleSubmit(onSubmit)} component="form">
                <Paper sx={{ mb: 4 }}>
                    <InputLabel>Title</InputLabel>
                    <TextField
                        {...register("title")}
                        multiline
                        fullWidth
                        maxRows={2}
                        helperText={errors.title?.message}
                        error={errors.title ? true : false}
                        variant="standard"
                        placeholder="Update title..."
                        defaultValue={title}
                    />
                </Paper>
                <Paper sx={{ my: 4 }}>
                    <InputLabel>Subtitle</InputLabel>
                    <TextField
                        {...register("subtitle")}
                        multiline
                        fullWidth
                        maxRows={2}
                        variant="standard"
                        placeholder="Update subtitle..."
                        defaultValue={subtitle}
                    />
                </Paper>
                <Paper>
                    <MDEField MDEChange={MDEChange} description={description} />
                </Paper>
                <Box className="update_page_deadline">
                    <InputLabel className="update_page_deadline_title">
                        Deadline
                    </InputLabel>
                    <TextField
                        {...register("deadline")}
                        type="date"
                        inputProps={{
                            min: format(new Date(), "yyyy-LL-dd"),
                        }}
                        variant="outlined"
                        defaultValue={parseDeadline}
                    />
                </Box>
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
