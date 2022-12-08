import React from "react";
import { Box, Input } from "@mui/material";

interface ISearchTask {
    onSearch: (arg0: string) => void
}

const SearchTask: React.FC<ISearchTask> = ({ onSearch }) => {
    const onSubmit = (data: string) => {
        onSearch(data);
    };
    return (
        <Box component="form" sx={{ textAlign: "center", m: 3 }}>
            <Input
                onChange={(e) => onSubmit(e.target.value)}
                type="text"
                placeholder="search task..."
            />
        </Box>
    );
};

export default SearchTask;