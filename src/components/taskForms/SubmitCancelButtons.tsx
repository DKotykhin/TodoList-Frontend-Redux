import React from 'react';
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { Box } from "@mui/system";

import './submitCancelButtons.scss';

interface IButtons {    
    loading: boolean;
}

const SubmitCancelButtons: React.FC<IButtons> = ({ loading }) => {

    const navigate = useNavigate();
    const handleCancel = (): void => {
        navigate("/");
    };

    return (
        <Box className="button">
            <Button
                className="button_cancel"
                onClick={handleCancel}
            >
                Cancel
            </Button>
            <Button className="button_submit" type="submit">
                {loading ? "Loading..." : "Submit"}
            </Button>
        </Box>
    )
}

export default SubmitCancelButtons;
