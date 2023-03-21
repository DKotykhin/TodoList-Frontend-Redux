import React, { useMemo, useState } from "react";

import { format, formatDistanceToNow, getTime } from "date-fns";

import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { ITask } from "types/taskTypes";

interface ICardTime {
    task: ITask
}

const CardTime: React.FC<ICardTime> = ({ task }) => {
    const { deadline, createdAt, completed } = task;

    const [daysLeft, setDaysLeft] = useState("");
    const [overdue, setOverdue] = useState(false);

    useMemo(() => {
        if (deadline) {
            const result = formatDistanceToNow(new Date(deadline), {
                addSuffix: true,
            });
            setDaysLeft(result);
            const isOverdue: number = getTime(new Date(deadline)) - getTime(new Date());
            if (isOverdue < 0) setOverdue(true);
        }
    }, [deadline]);


    return (
        <Box sx={{ display: "flex" }}>
            <AccessTimeIcon sx={{ mr: 1 }} />
            <Box>
                <Typography variant="body2" color="text.secondary">
                    {"Created: "}
                    {format(new Date(createdAt), "dd.LL.yyyy H:mm")}
                </Typography>
                {completed ?
                    <Typography variant="body2" color="text.secondary">
                        {"Completed"}
                    </Typography>
                    :
                    deadline &&
                    <Typography variant="body2" color="text.secondary">
                        {"Deadline: "}
                        {format(new Date(deadline), "dd.LL.yyyy")}
                        {!completed && (
                            <Box
                                component="span"
                                sx={[
                                    overdue ? { color: "#ff0000" } : null,
                                    { fontWeight: 700 },
                                ]}
                            >
                                &nbsp;&rarr;&nbsp;
                                {daysLeft}
                            </Box>
                        )}
                    </Typography>
                }
            </Box>
        </Box>
    );
};

export default CardTime;
