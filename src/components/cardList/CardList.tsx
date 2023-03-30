import React, { useState } from "react";

import { Box, Container, Typography, Modal } from "@mui/material";

import FullCard from "components/card/fullCard/FullCard";
import ShortCardList from "components/card/shortCard/ShortCardList";

import { ITask } from "types/taskTypes";
import { IGetTasksResponse } from "types/responseTypes";

import styles from "./cardList.module.scss";

interface ICardList {
    taskdata: IGetTasksResponse;
};

const CardList: React.FC<ICardList> = ({ taskdata }) => {

    const [cardFullOpen, setCardFullOpen] = useState(false);
    const [cardFullTask, setCardFullTask] = useState<ITask>();

    const handleOpenFullCard = (id: string): void => {
        const fullCardTask = taskdata.tasks.find((task: ITask) => task._id === id);
        setCardFullTask(fullCardTask);
        setCardFullOpen(true);
    };

    const cardFullClose = (): void => {
        setCardFullOpen(false);
    };

    return (
        <Container maxWidth="xl" className={styles.cardList}>
            <Modal open={cardFullOpen} onClose={cardFullClose}>
                <>
                    <FullCard
                        task={cardFullTask}
                        closeModal={cardFullClose}
                    />
                </>
            </Modal>
            <Typography className={styles.cardList__subtitle}>
                {taskdata.totalTasksQty
                    ? `On page: ${taskdata.tasksOnPageQty}, total: ${taskdata.totalTasksQty}`
                    : "No cards"
                }
            </Typography>
            <Box className={styles.cardList__box}>
                <ShortCardList taskdata={taskdata} handleOpenFullCard={handleOpenFullCard} />
            </Box>
        </Container>
    )
};

export default CardList;
