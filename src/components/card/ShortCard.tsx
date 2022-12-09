import React from "react";

import { Card, CardContent, Divider } from "@mui/material";
import { ITask } from "types/taskTypes";

import CardTime from "./CardTime";
import CardTitle from "./CardTitle";

interface IShortCard {
    task: ITask;
    handleOpenFullCard: () => void
}

const ShortCard: React.FC<IShortCard> = ({ task, handleOpenFullCard }) => {
    
    return (
        <Card
            variant="outlined"
            sx={{
                width: 380,
                border: "2px solid #979797",
                boxShadow: 24,
                borderRadius: "20px",
            }}
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
