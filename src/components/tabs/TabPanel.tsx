import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { Box, Tab, Tabs, Button, Container } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import FieldSort from 'components/cardSort/FieldSort';
import AZSort from 'components/cardSort/AZSort';
import SearchTask from 'components/searchTask/SearchTask';
import TabList from './TabList';

import { useAppSelector } from "store/reduxHooks";
import { selectQuery } from "store/selectors";

import './tabPanel.scss'


const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
};

const TabPanelComponent: React.FC = () => {

    const { query: { tabKey, sortOrder, sortField } } = useAppSelector(selectQuery);
    const [tabIndex, setTabIndex] = useState(tabKey);

    const [showSearchPanel, setShowSearchPanel] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [fieldValue, setFieldValue] = useState(sortField);
    const [AZValue, setAZValue] = useState(sortOrder);

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
        setFieldValue(data);
    };

    const AZSelect = (data: number) => {
        setAZValue(data);
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
            <FieldSort onSelect={FieldSelect} fieldValue={fieldValue} />
            <AZSort onSelect={AZSelect} AZValue={AZValue} />

            {showSearchPanel &&
                <SearchTask onSearch={onSearch} />
            }
            <TabList
                tabIndex={tabIndex}
                searchQuery={searchQuery}
                fieldValue={fieldValue}
                AZValue={AZValue}
            />
        </Container>
    )
}

export default TabPanelComponent;
