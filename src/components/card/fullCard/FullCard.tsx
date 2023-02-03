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

import CardTime from "../CardTime";
import CardTitle from "../CardTitle";
import FullCardButtons from "./FullCardButtons";
import { ITask } from "types/taskTypes";

import styles from "./fullCard.module.scss";

interface IFullCard {
    task: ITask;
    deleteLoading: (arg0: boolean) => void;
    closeModal: () => void;
}

const FullCard: React.FC<IFullCard> = ({ task, deleteLoading, closeModal }) => {
    const { subtitle, description } = task;

    return (
        <Card variant="outlined" className={styles.fullCard}>
            <CardContent>
                <CloseIcon className={styles.fullCard__closeIcon} onClick={closeModal} />
                <CardTitle shortTitleWidth={true} task={task} />
                <Box sx={{ display: "flex" }}>
                    <SubtitlesOutlinedIcon sx={{ mr: 1 }} />
                    <Typography className={styles.fullCard__subtitle} color="text.secondary">
                        {subtitle}
                    </Typography>
                </Box>
                <Divider sx={{ mb: 1 }} />
                <Box sx={{ display: "flex" }}>
                    <SubjectIcon sx={{ mr: 1 }} />
                    <Box className={styles.fullCard__description}>
                        {description && <ReactMarkdown children={description} />}
                    </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <CardTime task={task} />
            </CardContent>
            <CardActions className={styles.fullCard__buttons}>
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
