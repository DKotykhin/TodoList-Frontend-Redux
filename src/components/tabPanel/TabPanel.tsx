import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { Box, Tab, Tabs, Button, Container } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import FieldSort from 'components/cardSort/FieldSort';
import AZSort from 'components/cardSort/AZSort';
import SearchTask from 'components/searchTask/SearchTask';
import CardList from 'components/cardList/CardList';

import { useAppSelector } from "store/hook";
import { selectQuery } from "store/selectors";

import PropTypes from "prop-types";

import './tabPanel.scss'

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
    const { query: { tabKey } } = useAppSelector(selectQuery);

    const [tabIndex, setTabIndex] = useState(tabKey);

    const [showSearchPanel, setShowSearchPanel] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [fieldData, setFieldData] = useState('created');
    const [AZData, setAZData] = useState('A-z');

    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchQuery(searchTerm);
        }, 300);
        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm]);

    const handleShowSearchPanel = () => {
        setShowSearchPanel(prev => !prev);
    };

    const handleAddTask = (): void => {
        navigate("/addtask");
    };

    const onSearch = (data: string): void => {
        setSearchTerm(data);
    };

    const FieldSelect = (data: string) => {
        setFieldData(data);
    };

    const AZSelect = (data: string) => {
        setAZData(data);
    };

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Container maxWidth="xl" className='tabPanel'>
            <Box className='tabPanel header' sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={tabIndex}
                    onChange={handleChangeTab}
                >
                    <Tab label="All" {...a11yProps(0)} />
                    <Tab label="Active" {...a11yProps(1)} />
                    <Tab label="Done" {...a11yProps(2)} />
                </Tabs>
                <Box className='tabPanel search' >
                    <SearchIcon onClick={handleShowSearchPanel} />
                </Box>
            </Box>
            <Button
                className='tabPanel button'
                variant="contained"
                onClick={handleAddTask}
            >
                Add Task
            </Button>
            <FieldSort onSelect={FieldSelect} value={fieldData} />
            <AZSort onSelect={AZSelect} value={AZData} />

            {showSearchPanel &&
                <SearchTask onSearch={onSearch} />
            }
            <TabPanel value={tabIndex} index={0}>
                <CardList
                    tabIndex={tabIndex}
                    searchQuery={searchQuery}
                    fieldData={fieldData}
                    AZData={AZData}
                />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <CardList
                    tabIndex={tabIndex}
                    searchQuery={searchQuery}
                    fieldData={fieldData}
                    AZData={AZData}
                />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                <CardList
                    tabIndex={tabIndex}
                    searchQuery={searchQuery}
                    fieldData={fieldData}
                    AZData={AZData}
                />
            </TabPanel>
        </Container>
    )
}

export default TabPanelComponent;
