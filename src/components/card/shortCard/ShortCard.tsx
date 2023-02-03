import React from "react";

import { Card, CardContent, Divider } from "@mui/material";
import { ITask } from "types/taskTypes";

import CardTime from "../CardTime";
import CardTitle from "../CardTitle";

import styles from "./shortCard.module.scss";

interface IShortCard {
    task: ITask;
    handleOpenFullCard: () => void;
}

const ShortCard: React.FC<IShortCard> = ({ task, handleOpenFullCard }) => {

    return (
        <Card
            variant="outlined"
            className={styles.shortCard__card}
            // sx={{ boxShadow: 24 }}
        >
            <CardContent onClick={handleOpenFullCard}>
                <CardTitle
                    shortTitleWidth={false}
                    task={task}
                />
                <Divider sx={{ mb: 2 }} />
                <CardTime task={task} />
            </CardContent>
        </Card>
    );
};

export default ShortCard;
