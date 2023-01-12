import React from 'react';
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import img from "images/webp/sorry_1.webp";

import "./error.scss";


const Error: React.FC = () => {
    
    return (
        <Box className="error">
            <img src={img} alt="error" className="error image" />
            <Typography className="error title">
                Page not found
            </Typography>
            <Link className="error link" to="/">
                Return to main page
            </Link>
        </Box>
    );
};

export default Error;
