
import { Controller } from "react-hook-form";

import {
    Box,
    Input,
    InputLabel,
    FormControl,
    FormHelperText,
} from "@mui/material";

import styles from './field.module.scss';
interface INameField {
    label: string;
    error: any;
    control: any;
}

const NameField: React.FC<INameField> = ({ label, error, control }) => {
    return (
        <Box className={styles.field}>
            <InputLabel>{label}</InputLabel>
            <FormControl>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input
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
