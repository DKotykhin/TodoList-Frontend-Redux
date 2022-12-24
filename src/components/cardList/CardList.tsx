import React, { useEffect, useState, useMemo } from "react";
import { Navigate } from "react-router-dom";

import { Box, Container, Typography, Grid, Modal } from "@mui/material";

import ShortCard from "components/card/ShortCard";
import FullCard from "components/card/FullCard";
import SelectTaskCount from "./SelectTaskCount";
import PaginationControlled from "./PaginationControlled";
import SnackBar from "components/snackBar/SnackBar";
import Spinner from "components/spinner/Spinner";

import { fetchTasks } from "store/taskSlice";
import { useAppDispatch, useAppSelector } from "store/hook";
import { selectTask, selectQuery } from "store/selectors";
import { setQuery } from "store/querySlice";
import { IQueryData, ITask } from "types/taskTypes";

import "./cardList.scss";

interface ICardList {
    tabIndex: number;
    searchQuery: string;
    fieldData: string;
    AZData: string;
}

const CardList: React.FC<ICardList> = ({ tabIndex, searchQuery, fieldData, AZData }) => {
    const [loading, setLoading] = useState(false);

    const { query: { limit, page, sortField, sortOrder } } = useAppSelector(selectQuery);

    const [totalTasks, setTotalTasks] = useState(limit);
    const [currentPageNumber, setCurrentPageNumber] = useState(page);

    const [sortParams, setSortParams] = useState({ sortField, sortOrder });

    const [cardFullOpen, setCardFullOpen] = useState(false);
    const [cardFullId, setCardFullId] = useState("");

    const [succsessMessageHook, setSuccsessMessageHook] = useState("");
    const [errorMessageHook, setErrorMessageHook] = useState("");

    const dispatch = useAppDispatch();

    const query: IQueryData = useMemo(
        () => ({
            limit: totalTasks,
            page: currentPageNumber,
            tabKey: tabIndex,
            sortField: sortParams.sortField,
            sortOrder: sortParams.sortOrder,
            search: searchQuery
        }),
        [currentPageNumber, searchQuery, sortParams.sortField, sortParams.sortOrder, tabIndex, totalTasks]
    );

    const { taskdata, fetching } = useAppSelector(selectTask);
    const isSuccess: boolean = fetching === "loaded";
    const isError: boolean = fetching === "error";

    const fullCard = taskdata.tasks.filter((task: ITask) => task._id === cardFullId)[0];

    useEffect(() => {
        dispatch(fetchTasks(query));
    }, [dispatch, query]);

    useEffect(() => {
        dispatch(setQuery({ query }))
    }, [dispatch, query]);

    useEffect(() => {
        if (taskdata?.tasksOnPageQty === 0) {
            setCurrentPageNumber(prev => prev - 1);
        }
    }, [taskdata?.tasksOnPageQty]);

    useEffect(() => {
        setCurrentPageNumber(1);
    }, [tabIndex]);

    useEffect(() => {
        switch (fieldData) {
            case ('created'): setSortParams({ sortField: 'createdAt', sortOrder: AZData === 'A-z' ? -1 : 1 });
                break;
            case ('deadline'): setSortParams({ sortField: 'deadline', sortOrder: AZData === 'A-z' ? 1 : -1 });
                break;
            case ('title'): setSortParams({ sortField: 'title', sortOrder: AZData === 'A-z' ? 1 : -1 });
                break;
            default: setSortParams({ sortField: 'createdAt', sortOrder: -1 });
                break;
        }
    }, [fieldData, AZData]);

    const handleTotalTasks = (data: string): void => {
        setTotalTasks(data);
    };

    const handleCurrentPageNumber = (value: number): void => {
        setCurrentPageNumber(value);
    };

    const handleOpenFullCard = (data: string): void => {
        setCardFullOpen(true);
        setCardFullId(data);
    };

    const cardFullClose = (): void => {
        setCardFullOpen(false);
    };

    const deleteLoading = (data: boolean): void => {
        setLoading(data);
    };

    const successMessage = (data: string): void => {
        setSuccsessMessageHook(data);
    };

    const errorMessage = (data: string): void => {
        setErrorMessageHook(data);
    };

    return isSuccess ? (
        <Container className="cardList" maxWidth="xl">
            <Box className="cardList cardListBox">
                <Modal open={cardFullOpen} onClose={cardFullClose}>
                    <Box sx={{ boxShadow: 24 }} className='cardList fullCard'>
                        <FullCard
                            task={fullCard}
                            deleteLoading={deleteLoading}
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                            closeModal={cardFullClose}
                        />
                    </Box>
                </Modal>
                <Typography className="cardList subtitle">
                    {loading ? "Loading..." : taskdata.tasks.length
                        ? `Total amount: ${taskdata.tasks.length}`
                        : "No cards"}
                </Typography>
                <Grid container sx={{ mb: 4 }}>
                    {taskdata.tasks?.map((task) => (
                        <Grid item xs={12} md={6} xl={4} key={task._id} className="cardList shortCard">
                            <ShortCard
                                task={task}
                                handleOpenFullCard={() => handleOpenFullCard(task._id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box className="cardList taskAmountBox" >
                <Typography className="cardList taskAmount" >tasks on page:</Typography>
                <SelectTaskCount totalTasks={totalTasks} setTotalTasks={handleTotalTasks} />
            </Box>
            <Box>
                {taskdata?.totalPagesQty > 1 &&
                    <PaginationControlled
                        totalPagesQty={taskdata?.totalPagesQty}
                        currentPage={handleCurrentPageNumber}
                        currentPageNumber={currentPageNumber} />
                }
            </Box>
            <SnackBar successMessage={succsessMessageHook} errorMessage={errorMessageHook} />
        </Container>
    ) : isError ? <Navigate to='/login' /> : <Spinner />;
};

export default CardList;
