import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { Box, Tab, Tabs, Container } from "@mui/material";

import CardList from "components/cardList/CardList";
import Spinner from "components/spinner/Spinner";

import { fetchTasks } from "store/taskSlice";
import { selectTask } from "store/selectors";
import { useAppDispatch, useAppSelector } from "store/hook";

import PropTypes from "prop-types";
import PaginationControlled from "./PaginationControlled";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const TabPanelComponent: React.FC = () => {
    const [value, setValue] = useState(0);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    const { taskdata, fetching, error } = useAppSelector(selectTask);
    const dispatch = useAppDispatch();

    const activeTasks = taskdata.tasks.filter((task) => task.completed === false);
    const completedTasks = taskdata.tasks.filter((task) => task.completed === true);

    const isLoaded = fetching === "loaded";
    const isError = fetching === "error";
    error && console.log(error);

    useEffect(() => {
        dispatch(fetchTasks({ limit: 6, page: currentPageNumber }));
    }, [currentPageNumber, dispatch]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const currentPage = (value: number) => {
        setCurrentPageNumber(value)
    }

    return (
        <Container maxWidth="xl">
            {isLoaded ?
                <>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                        >
                            <Tab label="All" {...a11yProps(0)} />
                            <Tab label="Active" {...a11yProps(1)} />
                            <Tab label="Done" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <CardList taskdata={taskdata.tasks} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <CardList taskdata={activeTasks} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CardList taskdata={completedTasks} />
                    </TabPanel>
                    {taskdata.totalPagesQty > 1 &&
                        <PaginationControlled
                            totalPagesQty={taskdata.totalPagesQty}
                            currentPage={currentPage}
                            currentPageNumber={currentPageNumber} />
                    }
                </>
                : isError ? <Navigate to='/login' /> : <Spinner />}
        </Container>
    );
};

export default TabPanelComponent;
