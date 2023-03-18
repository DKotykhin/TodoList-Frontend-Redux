import { useState } from "react";
import { Controller, FieldError } from "react-hook-form";

import {
    Box,
    Input,
    InputLabel,
    InputAdornment,
    IconButton,
    FormControl,
    FormHelperText,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import styles from './field.module.scss';
interface IPasswordField {
    name: string;
    error: FieldError | undefined;
    control: any
}

const PasswordField: React.FC<IPasswordField> = (props) => {
    const { name, error, control } = props;
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    return (
        <Box className={styles.field}>
            <InputLabel>
                {name}
            </InputLabel>
            <FormControl>
                <Controller
                    name={name.toLowerCase().split(' ').join('')}
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="type password..."
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            error={error ? true : false}
                        />
                    )}
                />
                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        </Box>
    );
};

export default PasswordField;
