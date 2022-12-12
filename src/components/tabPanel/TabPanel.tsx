import React, { useEffect, useState } from "react";

import { Box, Tab, Tabs, Container } from "@mui/material";

import CardList from "components/cardList/CardList";
import Spinner from "components/spinner/Spinner";

import { fetchTasks } from "store/taskSlice";
import { selectTask } from "store/selectors";
import { useAppDispatch, useAppSelector } from "store/hook";

import PropTypes from "prop-types";

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

    const { taskdata, fetching } = useAppSelector(selectTask);
    const dispatch = useAppDispatch();

    const activeTasks = taskdata.filter((task) => task.completed === false);
    const completedTasks = taskdata.filter((task) => task.completed === true);

    const isLoading = fetching === "loading";

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="xl">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab label="All" {...a11yProps(0)} />
                            <Tab label="Active" {...a11yProps(1)} />
                            <Tab label="Done" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <CardList taskdata={taskdata} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <CardList taskdata={activeTasks} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CardList taskdata={completedTasks} />
                    </TabPanel>
                </>
            )}
        </Container>
    );
};

export default TabPanelComponent;
