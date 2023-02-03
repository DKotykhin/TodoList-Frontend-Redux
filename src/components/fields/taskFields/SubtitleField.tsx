import React from 'react';

import { Paper, TextField, InputLabel } from "@mui/material";

interface ISubtitleField {
    register: any;
    value: string | undefined;
}

const SubtitleField: React.FC<ISubtitleField> = ({ register, value }) => {
    return (
        <Paper sx={{ my: 4 }}>
            <InputLabel>Subtitle</InputLabel>
            <TextField
                {...register("subtitle")}
                multiline
                maxRows={2}
                variant="standard"
                placeholder="Add subtitle..."
                fullWidth
                defaultValue={value}
            />
        </Paper>
    )
}

export default SubtitleField;
