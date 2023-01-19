import React from "react";
import { Box, Typography } from "@mui/material";
import { ITask } from "types/taskTypes";

const bull = (
    <Box component="span" sx={{ display: "inline", mx: "3px" }}>
        &bull;
    </Box>
);

interface ICardTitle {
    shortTitleWidth: boolean; 
    task: ITask
}

const CardTitle: React.FC<ICardTitle> = ({ shortTitleWidth, task }) => {
    const { title, deadline, completed } = task;

    const newDate: string = new Date().toISOString();
    const msLeft = deadline ? Date.parse(deadline) - Date.parse(newDate) : Date.parse(newDate);
    const daysLeft = Math.floor(msLeft / (1000 * 60 * 60 * 24)) + 1;
        
    return (
        <Typography
            variant="h5"
            width={shortTitleWidth ? "85%" : "100%"}
            gutterBottom
            sx={[
                completed
                    ? { backgroundColor: "rgb(0, 161, 182, 0.5)" }
                    : daysLeft < 2 && daysLeft > 0
                    ? { backgroundColor: "rgb(255, 165, 0, 0.5)" }
                    : daysLeft <= 0
                    ? { backgroundColor: "rgb(255, 0, 0, 0.5)" }
                    : null,
                { borderRadius: "15px", wordWrap: "break-word", mb:2 },
            ]}
        >
            {bull}
            {title}
            {bull}
        </Typography>
    );
};

export default CardTitle;
