import React from 'react';

import { Box, Typography } from "@mui/material";

interface IUserMessage {
    loading: boolean;
    loaded: string;
    error: string;
}

const UserMessage: React.FC<IUserMessage> = ({ loading, loaded, error }) => {
    return (
        <Box sx={{ minHeight: 25, textAlign: 'center' }}>
            <Typography color='primary'>
                {loading ? "Loading..." : loaded ? loaded : ""}
            </Typography>
            <Typography color='error'>
                {error ? error || 'Unexpectable error!' : ""}
            </Typography>
        </Box>
    )
}

export default UserMessage;