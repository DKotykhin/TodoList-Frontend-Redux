import React from 'react';
import { Typography, Pagination, Stack } from '@mui/material';

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

        return (
            <Stack spacing={2} sx={{
                textAlign: 'center',
                marginBottom: '30px',
                '& > *': {
                    display: 'flex',
                    justifyContent: "center",
                }
            }}>
                <Typography sx={{color: '#808080'}}>Page: {currentPageNumber}</Typography>
                <Pagination
                    count={totalPagesQty}
                    page={currentPageNumber}
                    onChange={handleChange}
                    color="primary" />
            </Stack>
        );
    }

export default PaginationControlled;