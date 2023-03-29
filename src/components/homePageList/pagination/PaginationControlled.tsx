import React from 'react';

import { Typography, Pagination, Stack } from '@mui/material';

import styles from './pagination.module.scss';

interface IPaginationControlled {
    totalPagesQty: number;
    currentPageNumber: number;
    currentPage: (arg0: number) => void;
}
const PaginationControlled: React.FC<IPaginationControlled> =
    ({ totalPagesQty, currentPageNumber, currentPage }) => {

        const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
            currentPage(value)
        };

        return totalPagesQty > 1 ? (
            <Stack spacing={2}
                className={styles.pagination}
            >
                <Typography className={styles.pagination__title}>
                    Page: {currentPageNumber}
                </Typography>
                <Pagination
                    count={totalPagesQty}
                    page={currentPageNumber}
                    onChange={handleChange}
                    color="primary" />
            </Stack>
        ) : null;
    }

export default PaginationControlled;