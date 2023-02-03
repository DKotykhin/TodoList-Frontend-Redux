import React from 'react';
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import img from "images/webp/sorry_1.webp";

import styles from "./error.module.scss";

const Error: React.FC = () => {

    return (
        <Box className={styles.error}>
            <img src={img} alt="error" className={styles.error__image} />
            <Typography className={styles.error__title}>
                Page not found
            </Typography>
            <Link className={styles.error__link} to="/">
                Return to main page
            </Link>
        </Box>
    );
};

export default Error;
