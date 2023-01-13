import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISelectTaskCount {
    tasksOnPage: number;
    setTasksOnPage: (arg0: number) => void;
}

const SelectTaskCount: React.FC<ISelectTaskCount> = ({ tasksOnPage, setTasksOnPage }) => {

    const handleChange = (event: SelectChangeEvent) => {
        setTasksOnPage(parseInt(event.target.value));
    };

    return (
        <FormControl variant='standard' sx={{ m: 1, minWidth: 50 }} size="small">
            <Select
                sx={{ color: '#808080' }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={tasksOnPage.toString()}
                label="tasks on page"
                onChange={handleChange}
            >
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={24}>24</MenuItem>
            </Select>
        </FormControl>
    );
}

export default SelectTaskCount;