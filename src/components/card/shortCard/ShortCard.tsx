import React from "react";

import { Card, CardContent, Divider } from "@mui/material";
import { ITask } from "types/taskTypes";

import CardTime from "../CardTime";
import CardTitle from "../CardTitle";

import './shortCard.scss';

interface IShortCard {
    task: ITask;
    handleOpenFullCard: () => void;
}

const ShortCard: React.FC<IShortCard> = ({ task, handleOpenFullCard }) => {

    return (
        <Card
            variant="outlined"
            className="card"
            sx={{ boxShadow: 24 }}
        >
            <CardContent onClick={handleOpenFullCard} sx={{ cursor: "pointer" }}>
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
