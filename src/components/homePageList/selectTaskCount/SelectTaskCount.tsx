import * as React from 'react';

import { Box, Typography, MenuItem, FormControl, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import styles from './selectTaskCount.module.scss';

interface ISelectTaskCount {
    tasksOnPage: number;
    setTasksOnPage: (arg0: number) => void;
}

const SelectTaskCount: React.FC<ISelectTaskCount> = ({ tasksOnPage, setTasksOnPage }) => {

    const handleChange = (event: SelectChangeEvent) => {
        setTasksOnPage(parseInt(event.target.value));
    };

    return (
        <Box className={styles.selectTaskCount} >
            <Typography className={styles.selectTaskCount__title} >tasks on page:</Typography>
            <FormControl variant='standard' size="small" className={styles.selectTaskCount__form}>
                <Select
                    value={tasksOnPage.toString()}
                    label="tasks on page"
                    onChange={handleChange}
                >
                    <MenuItem sx={{ color: '#808080' }} value={6}>6</MenuItem>
                    <MenuItem sx={{ color: '#808080' }} value={12}>12</MenuItem>
                    <MenuItem sx={{ color: '#808080' }} value={24}>24</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default SelectTaskCount;