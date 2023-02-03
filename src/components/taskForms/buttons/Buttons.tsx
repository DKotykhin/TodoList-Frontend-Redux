import React from 'react';
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { Box } from "@mui/system";

import styled from './buttons.module.scss';

interface IButtons {
    loading: boolean;
}

const Buttons: React.FC<IButtons> = ({ loading }) => {

    const navigate = useNavigate();
    const handleCancel = (): void => {
        navigate("/");
    };

    return (
        <Box className={styled.button}>
            <Button
                className={styled.button__cancel}
                onClick={handleCancel}
            >
                Cancel
            </Button>
            <Button className={styled.button__submit} type="submit">
                {loading ? "Loading..." : "Submit"}
            </Button>
        </Box>
    )
}

export default Buttons;