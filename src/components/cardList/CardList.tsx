import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Container, Typography, Grid, Button, Modal } from "@mui/material";

import ShortCard from "components/card/ShortCard";
import FullCard from "components/card/FullCard";
import FieldSort from "components/cardSort/FieldSort";
import AZSort from "components/cardSort/AZSort";
import SortAction from "./SortAction";
import SearchTask from "components/searchTask/SearchTask";

import { ITask } from "types/taskTypes";

import "./cardList.scss";

interface ICardList {
    taskdata: ITask[];
}

const CardList: React.FC<ICardList> = ({ taskdata }) => {
    const [loading, setLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState("A-z");
    const [sortField, setSortField] = useState("created");
    const [cardFullOpen, setCardFullOpen] = useState(false);
    const [cardFullId, setCardFullId] = useState("");
    const [taskList, setTaskList] = useState(taskdata);

    const navigate = useNavigate();

    const updatedTask = taskdata.filter((task) => task._id === cardFullId)[0];

    useEffect(() => {
        setTaskList(SortAction(taskdata, sortField, sortOrder));
    }, [sortField, sortOrder, taskdata]);

    const FieldSelect = (data: string): void => {
        setSortField(data);
    };
    const AZSelect = (data: string): void => {
        setSortOrder(data);
    };

    const handleOpenFullCard = (data: string): void => {
        setCardFullOpen(true);
        setCardFullId(data);
    };

    const cardFullClose = (): void => {
        setCardFullOpen(false);
    };

    const handleAddTask = (): void => {
        navigate("/addtask");
    };

    const deleteLoading = (data: boolean): void => {
        setLoading(data);
    };

    const onSearch = (data: string): void => {
        const newTaskdata = SortAction(taskdata, sortField, sortOrder);
        const filterData = newTaskdata.filter((task) =>
            task.title.toLowerCase().includes(data)
        );
        setTaskList(filterData);
    };

    return (
        <Container className="cardlist" maxWidth="xl">
            <Modal open={cardFullOpen} onClose={cardFullClose}>
                <Box sx={{ boxShadow: 24 }} className='cardlist fullcard'>
                    <FullCard
                        task={updatedTask}
                        handleCloseFullCard={cardFullClose}
                        deleteLoading={deleteLoading}
                        closeModal={cardFullClose}
                    />
                </Box>
            </Modal>
            <Box className="cardlist addtask">
                <Button
                    className="cardlist addtask button"
                    variant="contained"
                    onClick={handleAddTask}
                >
                    Add Task
                </Button>
            </Box>
            {loading ? (
                <Typography className="cardlist message">
                    {"Loading..."}
                </Typography>
            ) : (
                <Typography color="text.secondary" className="cardlist message">
                    {taskList.length
                        ? `Total amount: ${taskList.length}`
                        : "No cards"}
                </Typography>
            )}
            {taskList.length > 1 && (
                <>
                    <FieldSort onSelect={FieldSelect} />
                    <AZSort onSelect={AZSelect} />
                </>
            )}
            <SearchTask onSearch={onSearch} />
            <Grid container>
                {taskList?.map((task) => (
                    <Grid item xs={12} md={6} xl={4} key={task._id}>
                        <Box className="cardlist short_card">
                            <ShortCard
                                task={task}
                                handleOpenFullCard={() => handleOpenFullCard(task._id)}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CardList;
