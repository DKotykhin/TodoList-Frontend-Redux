import React from 'react';

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import './footer.scss';

const Footer: React.FC = () => {
    return (
        <Box className="footer">
            <AssignmentTurnedInIcon className="footer icon" />
            <Typography className="footer logo_text">
                TodoList
            </Typography>
        </Box>
    )
}

export default Footer;