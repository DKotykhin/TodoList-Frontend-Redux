import React, { useEffect, useState } from "react";

import { Typography, Paper, Box } from "@mui/material";

import User from "api/userrequests";

import { ITaskStatisticResponse } from "types/responseTypes";

import styles from "./userStatistic.module.scss";


const UserStatistic: React.FC = () => {

    const [taskStatistic, setTaskStatistic] = useState<ITaskStatisticResponse>();

    useEffect(() => {
        User.GetTasksStatistic().then(response => setTaskStatistic(response))
    }, []);

    return (
        <Paper elevation={10} className={styles.statistic}>
            {taskStatistic ?
                <>
                    <Typography className={styles.title}>
                        {"Your statistic:"}
                    </Typography>
                    {taskStatistic.totalTasks ?
                        <Box className={styles.subtitle}>
                            <Box className={styles.box}>
                                <Typography>
                                    {"Total tasks:"}
                                </Typography>
                                <Typography>
                                    {taskStatistic.totalTasks}
                                </Typography>
                            </Box>
                            <Box className={styles.box}>
                                <Typography>
                                    {"Active tasks:"}
                                </Typography>
                                <Typography>
                                    {taskStatistic.activeTasks}
                                </Typography>
                            </Box>
                            <Box
                                className={styles.box}
                                sx={taskStatistic.overdueTasks ? { color: '#ff0000' } : null}
                            >
                                <Typography>
                                    {"Overdue tasks:"}
                                </Typography>
                                <Typography>
                                    {taskStatistic.overdueTasks}
                                </Typography>
                            </Box>
                            <Box
                                className={styles.box}
                                sx={taskStatistic.completedTasks ? { color: '#00a1b6' } : null}
                            >
                                <Typography>
                                    {"Completed tasks:"}
                                </Typography>
                                <Typography>
                                    {taskStatistic.completedTasks}
                                </Typography>
                            </Box>
                        </Box>
                        :
                        <Typography className={styles.text}>
                            {"You don't have any task..."}
                        </Typography>
                    }
                </>
                :
                <Typography className={styles.title}>
                    {"Loading..."}
                </Typography>
            }
        </Paper>
    )
}

export default UserStatistic;