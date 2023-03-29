import React from "react";
import { Box, Input } from "@mui/material";

import styles from './searchTask.module.scss';

interface ISearchTask {
    onSearch: (arg0: string) => void
}

const SearchTask: React.FC<ISearchTask> = ({ onSearch }) => {
    const onSubmit = (data: string) => {
        onSearch(data);
    };
    return (
        <Box className={styles.searchTask} component="form">
            <Input
                onChange={(e) => onSubmit(e.target.value)}
                type="search"
                placeholder="search task by title..."
            />
        </Box>
    );
};

export default SearchTask;
