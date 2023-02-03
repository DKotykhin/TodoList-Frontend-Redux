import React from 'react';

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import styles from './footer.module.scss';

const Footer: React.FC = () => {
    return (
        <Box className={styles.footer}>
            <AssignmentTurnedInIcon className={styles.footer__icon} />
            <Typography className={styles.footer__logo}>
                TodoList
            </Typography>
        </Box>
    )
}

export default Footer;