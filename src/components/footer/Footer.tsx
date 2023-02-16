import React from 'react';

import { Box } from '@mui/system';
import { Container, Typography } from "@mui/material";

import styles from './footer.module.scss';

const Footer: React.FC = () => {
    return (
        <Box className={styles.footer}>
            <Container maxWidth='xl' className={styles.footer__container}>
                <Typography className={styles.footer__right}>
                    &copy; All rights reserved
                </Typography>
                <Typography className={styles.footer__logo}>
                    TodoList
                </Typography>
            </Container>
        </Box>
    )
}

export default Footer;