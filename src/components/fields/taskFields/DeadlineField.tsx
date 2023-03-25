import React from 'react';

import { format } from "date-fns";

import { Box, TextField, InputLabel } from "@mui/material";

interface IDeadlineField {
    register: any;
    value: string | undefined;
}

const DeadlineField: React.FC<IDeadlineField> = ({ register, value }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', my: 3, flexWrap: 'wrap' }}>
            <InputLabel>
                Deadline
            </InputLabel>
            <TextField
                sx={{ ml: 3, minWidth: '200px' }}
                {...register("deadline")}
                type="datetime-local"
                inputProps={{
                    min: format(new Date(), "yyyy-LL-dd HH:mm"),
                }}
                variant="outlined"
                defaultValue={value}
            />
        </Box>
    )
}

export default DeadlineField;
