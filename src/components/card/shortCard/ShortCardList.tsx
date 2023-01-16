import React from 'react';

import { Grid } from "@mui/material";

import ShortCard from "components/card/shortCard/ShortCard";
import { IGetTasksResponse } from 'types/responseTypes';

interface IShortCardList {
    taskdata: IGetTasksResponse;
    handleOpenFullCard: (arg0: string) => void;
};

const ShortCardList: React.FC<IShortCardList> = ({ taskdata, handleOpenFullCard }) => {
    return (
        <Grid container sx={{ mb: 4 }} className="shortCard">
            {taskdata.tasks?.map((task) => (
                <Grid item xs={12} md={6} xl={4} key={task._id} className="shortCardGrid">
                    <ShortCard
                        task={task}
                        handleOpenFullCard={() => handleOpenFullCard(task._id)}
                    />
                </Grid>
            ))}
        </Grid>
    )
};

export default ShortCardList;