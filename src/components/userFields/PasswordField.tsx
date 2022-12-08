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
        <Box>
            <InputLabel>
                {name === "confirmpassword" ? "confirm password" : name}
            </InputLabel>
            <FormControl sx={{ width: "300px" }}>
                <Controller
                    name={name.toLowerCase()}
                    control={control}
                    render={({ field }) => (
                        <Input sx={{ width: '320px' }}
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
