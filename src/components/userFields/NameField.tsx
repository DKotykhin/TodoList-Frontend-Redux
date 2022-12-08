
import { Controller } from "react-hook-form";

import {
    Box,
    Input,
    InputLabel,
    FormControl,
    FormHelperText,
} from "@mui/material";

interface INameField {
    label: string;
    error: any;
    control: any;
}

const NameField: React.FC<INameField> = ({ label, error, control }) => {
    return (
        <Box>
            <InputLabel>{label}</InputLabel>
            <FormControl>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input sx={{ width: '320px' }}
                            {...field}
                            type="text"
                            placeholder="type name..."
                            autoComplete="name"
                            error={error ? true : false}
                        />
                    )}
                />
            <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        </Box>
    );
};

export default NameField;
