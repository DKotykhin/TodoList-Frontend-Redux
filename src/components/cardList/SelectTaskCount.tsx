import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISelectTaskCount {
    totalTasks: string;
    setTotalTasks: (arg0: string) => void;
}

const SelectTaskCount: React.FC<ISelectTaskCount> = ({ totalTasks, setTotalTasks }) => {

    const handleChange = (event: SelectChangeEvent) => {
        setTotalTasks(event.target.value);
    };

    return (
        <FormControl variant='standard' sx={{ m: 1, minWidth: 50 }} size="small">
            <Select
                sx={{ color: '#808080' }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={totalTasks}
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