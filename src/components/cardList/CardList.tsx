import React, { useEffect, useState, useMemo } from "react";
import { Navigate } from "react-router-dom";

import { Box, Container, Typography, Modal } from "@mui/material";

import SelectTaskCount from "./SelectTaskCount";
import PaginationControlled from "./PaginationControlled";
import FullCard from "components/card/fullCard/FullCard";
import ShortCardList from "components/card/shortCard/ShortCardList";
import Spinner from "components/spinner/Spinner";

import { fetchTasks } from "store/taskSlice";
import { useAppDispatch, useAppSelector } from "store/reduxHooks";
import { selectTask, selectQuery } from "store/selectors";
import { setQuery } from "store/querySlice";

import { IQueryData, ITask } from "types/taskTypes";

import styles from "./cardList.module.scss";

interface ICardList {
    tabIndex: number;
    searchQuery: string;
    fieldValue: string;
    AZValue: number;
}

const CardList: React.FC<ICardList> = ({ tabIndex, searchQuery, fieldValue, AZValue }) => {

    const { query: { limit, page } } = useAppSelector(selectQuery);

    const [loading, setLoading] = useState(false);
    const [tasksOnPage, setTasksOnPage] = useState(limit);
    const [currentPageNumber, setCurrentPageNumber] = useState(page);

    const [cardFullOpen, setCardFullOpen] = useState(false);
    const [cardFullTask, setCardFullTask] = useState<ITask>();

    const dispatch = useAppDispatch();

    const { taskdata, fetching } = useAppSelector(selectTask);
    const isSuccess: boolean = fetching === "loaded";
    const isError: boolean = fetching === "error";

    const query: IQueryData = useMemo(
        () => ({
            limit: tasksOnPage,
            page: currentPageNumber,
            tabKey: tabIndex,
            sortField: fieldValue,
            sortOrder: AZValue,
            search: searchQuery,
        }),
        [
            currentPageNumber,
            searchQuery,
            fieldValue,
            AZValue,
            tabIndex,
            tasksOnPage,
        ]
    );

    useEffect(() => {
        dispatch(fetchTasks(query));
        dispatch(setQuery({ query }));
    }, [dispatch, query]);

    useEffect(() => {
        if (Boolean(taskdata.totalTasksQty && (taskdata.tasksOnPageQty === 0))) {
            setCurrentPageNumber(prev => prev - 1);
        }
    }, [taskdata.tasksOnPageQty, taskdata.totalTasksQty]);

    useEffect(() => {
        setCurrentPageNumber(1);
    }, [tabIndex]);

    const handleTasksOnPage = (data: number): void => {
        setTasksOnPage(data);
    };

    const handleCurrentPageNumber = (value: number): void => {
        setCurrentPageNumber(value);
    };

    const handleOpenFullCard = (id: string): void => {
        const fullCardTask = taskdata.tasks.find((task: ITask) => task._id === id);
        setCardFullTask(fullCardTask);
        setCardFullOpen(true);
    };

    const cardFullClose = (): void => {
        setCardFullOpen(false);
    };

    const deleteLoading = (data: boolean): void => {
        setLoading(data);
    };

    return isSuccess ? (
        <Container maxWidth="xl" className={styles.cardList}>
            <Modal open={cardFullOpen} onClose={cardFullClose}>
                <>
                    <FullCard
                        task={cardFullTask}
                        deleteLoading={deleteLoading}
                        closeModal={cardFullClose}
                    />
                </>
            </Modal>
            <Typography className={styles.cardList__subtitle}>
                {loading ? "Loading..." : taskdata.totalTasksQty
                    ? `On page: ${taskdata.tasksOnPageQty}, total: ${taskdata.totalTasksQty}`
                    : "No cards"}
            </Typography>
            <Box className={styles.cardList__box}>
                <ShortCardList taskdata={taskdata} handleOpenFullCard={handleOpenFullCard} />
            </Box>
            <Box className={styles.cardList__taskAmountBox} >
                <Typography className={styles.cardList__taskAmount} >tasks on page:</Typography>
                <SelectTaskCount tasksOnPage={tasksOnPage} setTasksOnPage={handleTasksOnPage} />
            </Box>
            {taskdata?.totalPagesQty > 1 &&
                <PaginationControlled
                    totalPagesQty={taskdata?.totalPagesQty}
                    currentPage={handleCurrentPageNumber}
                    currentPageNumber={currentPageNumber} />
            }
        </Container>
    ) : isError ? <Navigate to='/login' /> : <Spinner />;
};

export default CardList;
