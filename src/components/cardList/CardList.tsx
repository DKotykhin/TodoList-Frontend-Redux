import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { Box, Container, Typography, Modal } from "@mui/material";

import SelectTaskCount from "./SelectTaskCount";
import PaginationControlled from "./PaginationControlled";
import FullCard from "components/card/fullCard/FullCard";
import ShortCardList from "components/card/shortCard/ShortCardList";
import SnackBar from "components/snackBar/SnackBar";
import Spinner from "components/spinner/Spinner";

import { fetchTasks } from "store/taskSlice";
import { useAppDispatch, useAppSelector } from "store/hook";
import { selectTask, selectQuery } from "store/selectors";
import { setQuery } from "store/querySlice";

import { useFormQuery } from "hooks/useFormQuery";

import { ITask } from "types/taskTypes";

import "./cardList.scss";

interface ICardList {
    tabIndex: number;
    searchQuery: string;
    fieldData: string;
    AZData: string;
}

const CardList: React.FC<ICardList> = ({ tabIndex, searchQuery, fieldData, AZData }) => {
    const [loading, setLoading] = useState(false);

    const { query: { limit, page } } = useAppSelector(selectQuery);

    const [totalTasks, setTotalTasks] = useState(limit);
    const [currentPageNumber, setCurrentPageNumber] = useState(page);

    const [cardFullOpen, setCardFullOpen] = useState(false);
    const [cardFullId, setCardFullId] = useState("");

    const [succsessMessageHook, setSuccsessMessageHook] = useState("");
    const [errorMessageHook, setErrorMessageHook] = useState("");

    const dispatch = useAppDispatch();

    const { taskdata, fetching } = useAppSelector(selectTask);
    const isSuccess: boolean = fetching === "loaded";
    const isError: boolean = fetching === "error";

    const fullCardTask = taskdata.tasks.filter((task: ITask) => task._id === cardFullId)[0];

    const query = useFormQuery({
        totalTasks,
        currentPageNumber,
        tabIndex,
        searchQuery,
        fieldData,
        AZData
    });

    useEffect(() => {
        dispatch(fetchTasks(query));
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
                            task={fullCardTask}
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
                <ShortCardList taskdata={taskdata} handleOpenFullCard={handleOpenFullCard} />
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
