import React, { useMemo, useState } from "react";

import { format, formatDistanceToNow, getTime } from "date-fns";

import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { ITask } from "types/taskTypes";

interface ICardTime {
    task: ITask,
    isFullCard: boolean,
}

const CardTime: React.FC<ICardTime> = ({ task, isFullCard }) => {
    const { deadline, createdAt, completed, updatedAt, completedAt } = task;

    const [daysLeft, setDaysLeft] = useState("");
    const [overdue, setOverdue] = useState(false);

    const isUpdated = getTime(new Date(createdAt)) !== getTime(new Date(updatedAt));

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
                {isUpdated && isFullCard &&
                    <Typography variant="body2" color="text.secondary">
                        {"Last update: "}
                        {format(new Date(updatedAt), "dd.LL.yyyy H:mm")}
                    </Typography>
                }
                {completed ?
                    <Typography variant="body2" color="primary">
                        {"Completed: "}
                        {completedAt ? format(new Date(completedAt), "dd.LL.yyyy H:mm") : null}
                    </Typography>
                    :
                    deadline &&
                    <Typography variant="body2" color="text.secondary">
                        {"Deadline: "}
                        {format(new Date(deadline), "dd.LL.yyyy")}
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
                    </Typography>
                }
            </Box>
        </Box>
    );
};

export default CardTime;
