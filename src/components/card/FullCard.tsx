import React from "react";
import ReactMarkdown from "react-markdown";

import {
    Box,
    Card,
    CardActions,
    CardContent,
    Typography,
    Divider,
} from "@mui/material";
import SubjectIcon from "@mui/icons-material/Subject";
import CloseIcon from "@mui/icons-material/Close";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";

import CardTime from "./CardTime";
import CardTitle from "./CardTitle";
import FullCardButtons from "./FullCardButtons";

import "./fullCard.scss";
import { ITask } from "types/taskTypes";

interface IFullCard {
    task: ITask;
    deleteLoading: (arg0: boolean) => void;
    closeModal: () => void;
    handleCloseFullCard: () => void;
}

const FullCard: React.FC<IFullCard> = ({ task, deleteLoading, closeModal, handleCloseFullCard }) => {
    const { subtitle, description } = task;

    return (
        <Card className="full_card" variant="outlined">
            <CardContent>
                <CloseIcon className="modal_close_icon" onClick={handleCloseFullCard} />
                <CardTitle shortTitleWidth={true} task={task} />
                <Box sx={{ display: "flex" }}>
                    <SubtitlesOutlinedIcon sx={{ mr: 1 }} />
                    <Typography className="subtitle" color="text.secondary">
                        {subtitle}
                    </Typography>
                </Box>
                <Divider sx={{ mb: 1 }} />
                <Box sx={{ display: "flex" }}>
                    <SubjectIcon sx={{ mr: 1 }} />
                    <Typography
                        className="description"
                        component="div"
                        variant="body2"
                    >
                        {description && <ReactMarkdown children={description} />}
                    </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <CardTime task={task} />
            </CardContent>
            <CardActions className="buttons">
                <FullCardButtons
                    task={task}
                    closeModal={closeModal}
                    deleteLoading={deleteLoading}
                />
            </CardActions>
        </Card>
    );
};

export default FullCard;