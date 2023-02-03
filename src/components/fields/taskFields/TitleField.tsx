import React from 'react';

import { Paper, TextField, InputLabel } from "@mui/material";

interface ITitleField {
    register: any;
    error: any;
    value: string;
}

const TitleField: React.FC<ITitleField> = ({ register, error, value }) => {
    return (
        <Paper sx={{ mb: 4 }}>
            <InputLabel>Title</InputLabel>
            <TextField
                {...register("title", { required: true })}
                multiline
                maxRows={2}
                helperText={error.title?.message}
                error={error.title ? true : false}
                variant="standard"
                placeholder="Add title..."
                defaultValue={value}
                fullWidth
                autoFocus
            />
        </Paper>
    )
}

export default TitleField;
