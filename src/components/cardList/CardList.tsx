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
    showSearchPanel: boolean;
}

const CardList: React.FC<ICardList> = ({ taskdata, showSearchPanel }) => {
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
        <Container className="cardList" maxWidth="xl">
            <Modal open={cardFullOpen} onClose={cardFullClose}>
                <Box sx={{ boxShadow: 24 }} className='cardList fullCard'>
                    <FullCard
                        task={updatedTask}
                        deleteLoading={deleteLoading}
                        closeModal={cardFullClose}
                    />
                </Box>
            </Modal>
            <Button
                className="cardList button"
                variant="contained"
                onClick={handleAddTask}
            >
                Add Task
            </Button>
            <Typography className="cardList subtitle">
                {loading ? "Loading..." : taskList.length
                    ? `Total amount: ${taskList.length}`
                    : "No cards"}
            </Typography>
            {taskList.length > 1 && (
                <>
                    <FieldSort onSelect={FieldSelect} chipLabel={sortField} />
                    <AZSort onSelect={AZSelect} chipLabel={sortOrder} />
                </>
            )}
            {showSearchPanel &&
                <SearchTask onSearch={onSearch} />
            }
            <Grid container sx={{ mb: 4 }}>
                {taskList?.map((task) => (
                    <Grid item xs={12} md={6} xl={4} key={task._id} className="cardList shortCard">
                        <ShortCard
                            task={task}
                            handleOpenFullCard={() => handleOpenFullCard(task._id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CardList;
