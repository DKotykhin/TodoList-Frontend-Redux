import React from 'react';

import { Box, Typography } from "@mui/material";

import './userMessage.scss'

interface IUserMessage {
    loading: boolean;
    loaded: string;
    error: string;
}

const UserMessage: React.FC<IUserMessage> = ({ loading, loaded, error }) => {
    return (
        <Box className="message">
            <Typography className="message success">
                {loading ? "Loading..." : loaded ? loaded : ""}
            </Typography>
            <Typography className="message error">
                {error ? error || 'Unexpectable error!' : ""}
            </Typography>
        </Box>
    )
}

export default UserMessage;