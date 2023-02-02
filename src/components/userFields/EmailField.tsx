import React from "react";
import { Controller } from "react-hook-form";

import {
    Box,
    Input,
    InputLabel,
    FormControl,
    FormHelperText,
} from "@mui/material";

interface IEmailField {
    disabled: boolean;
    error: any;
    control: any
}

const EmailField: React.FC<IEmailField> = ({ disabled, error, control }) => {
    return (
        <Box>
            <InputLabel>Email</InputLabel>
            <FormControl>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input sx={{ width: '320px' }}
                            {...field}
                            type="email"                            
                            disabled={disabled}
                            placeholder="type email..."
                            autoComplete="email"
                            error={error ? true : false}
                        />
                    )}
                />
                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        </Box>
    );
};

export default EmailField;
