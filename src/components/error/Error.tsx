import React from 'react';
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import img from "./sorry_1.jpg";

import "./error.scss";

const Error: React.FC = () => {
    return (
        <Box className="error">
            <img src={img} alt="error" className="error image" />
            <Typography className="error title">
                Сторінка не знайдена
            </Typography>
            <Link className="error link" to="/">
                Повернутися на головну
            </Link>
        </Box>
    );
};

export default Error;
