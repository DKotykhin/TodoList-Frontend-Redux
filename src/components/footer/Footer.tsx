import React from 'react';

import { Box } from '@mui/system';
import { Container, Typography } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import styles from './footer.module.scss';

const Footer: React.FC = () => {
    return (
        <Box className={styles.footer}>
            <Container maxWidth='xl' className={styles.footer__container}>
                <AssignmentTurnedInIcon />
                <Typography className={styles.footer__logo}>
                    TodoList
                </Typography>
            </Container>
        </Box>
    )
}

export default Footer;