import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Navigate } from "react-router-dom";

import { Box, Tab, Tabs, Button, Container } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import Spinner from "components/spinner/Spinner";
import FieldSort from './cardSort/FieldSort';
import AZSort from './cardSort/AZSort';
import SearchTask from './searchTask/SearchTask';
import SelectTaskCount from "./selectTaskCount/SelectTaskCount";
import PaginationControlled from "./pagination/PaginationControlled";
import TabList from './tabList/TabList';

import { useAppDispatch, useAppSelector } from "store/reduxHooks";
import { selectTask, selectQuery } from "store/selectors";
import { fetchTasks } from "store/taskSlice";
import { setQuery } from "store/querySlice";

import { IQueryData } from "types/taskTypes";

import styles from './homePageList.module.scss';

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
};

const HomePageList: React.FC = () => {

    const { query: { tabKey, sortOrder, sortField, limit, page } } = useAppSelector(selectQuery);

    const [showSearchPanel, setShowSearchPanel] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [tabIndex, setTabIndex] = useState(tabKey);
    const [tasksOnPage, setTasksOnPage] = useState(limit);
    const [currentPageNumber, setCurrentPageNumber] = useState(page);
    const [fieldValue, setFieldValue] = useState(sortField);
    const [AZValue, setAZValue] = useState(sortOrder);

    const navigate = useNavigate();
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
        [AZValue, fieldValue, tasksOnPage, currentPageNumber, searchQuery, tabIndex]
    );

    useEffect(() => {
        dispatch(fetchTasks(query));
        dispatch(setQuery({ query }));
    }, [dispatch, query]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchQuery(searchTerm);
        }, 300);
        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm]);

    useEffect(() => {
        if (Boolean(taskdata.totalTasksQty && (taskdata.tasksOnPageQty === 0))) {
            setCurrentPageNumber(prev => prev - 1);
        }
    }, [taskdata.tasksOnPageQty, taskdata.totalTasksQty]);

    useEffect(() => {
        setCurrentPageNumber(1);
    }, [tabIndex]);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number): void => {
        setTabIndex(newValue);
    };

    const onSearch = (data: string): void => {
        setSearchTerm(data);
    };
    const handleShowSearchPanel = (): void => {
        setShowSearchPanel(prev => !prev);
        setSearchTerm('');
    };

    const handleAddTask = (): void => {
        navigate("/addtask");
    };

    const FieldSelect = (data: string): void => {
        setFieldValue(data);
    };

    const AZSelect = (data: number): void => {
        setAZValue(data);
    };

    const handleTasksOnPage = (data: number): void => {
        setTasksOnPage(data);
    };

    const handleCurrentPageNumber = (value: number): void => {
        setCurrentPageNumber(value);
    };

    return isSuccess ? (
        <Container maxWidth="xl">
            <Box className={styles.homePageList}>
                <Box>
                    <Box className={styles.homePageList__header} >
                        <Tabs
                            value={tabIndex}
                            onChange={handleChangeTab}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                        >
                            <Tab label="Active" {...a11yProps(0)} />
                            <Tab label="Overdue" {...a11yProps(1)} />
                            <Tab label="Done" {...a11yProps(2)} />
                        </Tabs>
                        <SearchIcon
                            onClick={handleShowSearchPanel}
                            className={styles.homePageList__search}
                        />
                    </Box>
                    <Button
                        className={styles.homePageList__button}
                        variant="contained"
                        onClick={handleAddTask}
                    >
                        Add Task
                    </Button>
                    {taskdata.tasksOnPageQty > 1 &&
                        <>
                            <FieldSort onSelect={FieldSelect} fieldValue={fieldValue} />
                            <AZSort onSelect={AZSelect} AZValue={AZValue} />
                        </>
                    }
                    {showSearchPanel &&
                        <SearchTask onSearch={onSearch} />
                    }
                    <TabList
                        taskdata={taskdata}
                        tabIndex={tabIndex}
                    />
                </Box>
                <Box>
                    <SelectTaskCount tasksOnPage={tasksOnPage} setTasksOnPage={handleTasksOnPage} />
                    <PaginationControlled
                        totalPagesQty={taskdata?.totalPagesQty}
                        currentPage={handleCurrentPageNumber}
                        currentPageNumber={currentPageNumber}
                    />
                </Box>
            </Box>
        </Container>
    ) : isError ? <Navigate to='/login' /> : <Spinner />;
};

export default HomePageList;
