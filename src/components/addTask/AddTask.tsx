import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { format } from "date-fns";

import {
    Container,
    Typography,
    Paper,
    TextField,
    InputLabel,
    Button,
} from "@mui/material";
import { Box } from "@mui/system";

import { MDEField } from "../taskFields/MDEField";
import { TaskFormValidation } from "../taskFields/taskFormValidation";

import { AddTask } from "api/taskrequests";
// import { addTask } from "store/taskSlice";
import { useAppSelector } from "store/hook";
import { selectUser } from "store/selectors";
import { IAddTask } from "types/taskTypes";

import "./addTask.scss";

const AddTaskComponent = () => {
    const [loading, setLoading] = useState(false);
    const [mdeValue, setMdeValue] = useState("");

    const { userdata } = useAppSelector(selectUser);
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userdata.token) {
            navigate("/");
        }
    }, [navigate, userdata.token]);
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
            .then(function (response) {
                console.log(response.data.message);
                // dispatch(addTask(response.data));
                setLoading(false);
                navigate("/");
            })
            .catch(function (error) {
                console.warn(error.message);
                alert("Add Task Error");
            });
    };

    const MDEChange = useCallback((data: string) => {
        setMdeValue(data);
    }, []);

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <Container className="add_page" maxWidth="sm">
            <Typography className="add_page_title">Add Task</Typography>
            <Box onSubmit={handleSubmit(onSubmit)} component="form">
                <Paper sx={{ mb: 4 }}>
                    <InputLabel>Title</InputLabel>
                    <TextField
                        {...register("title", { required: true })}
                        multiline
                        maxRows={2}
                        helperText={errors.title?.message}
                        error={errors.title ? true : false}
                        variant="standard"
                        placeholder="Add title..."
                        fullWidth
                    />
                </Paper>
                <Paper sx={{ my: 4 }}>
                    <InputLabel>Subtitle</InputLabel>
                    <TextField
                        {...register("subtitle")}
                        multiline
                        maxRows={2}
                        variant="standard"
                        placeholder="Add subtitle..."
                        fullWidth
                    />
                </Paper>
                <Paper>
                    <MDEField MDEChange={MDEChange} />
                </Paper>
                <Box className="add_page_deadline">
                    <InputLabel className="add_page_deadline_title">
                        Deadline
                    </InputLabel>
                    <TextField
                        sx={{ minWidth: "150px" }}
                        {...register("deadline")}
                        type="date"
                        inputProps={{
                            min: format(new Date(), "yyyy-LL-dd"),
                        }}
                        variant="outlined"
                        // placeholder="yyyy, MM, dd"
                    />
                </Box>
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
