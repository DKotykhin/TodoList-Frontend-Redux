import React from "react";
import { Stack, Chip } from "@mui/material";

interface IAZSort {
    onSelect: (arg0: string) => void;
    value: string;
}

const sortItems = ["A-z", "Z-a"];

const AZSort: React.FC<IAZSort> = ({ onSelect, value }) => {

    const handleSelect = (label: string) => {
        onSelect(label);
    };

    return (
        <Stack
            direction="row"
            spacing={3}
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                mb: 2
            }}
        >
            {sortItems.map((item) => (
                <Chip
                    key={item}
                    sx={{ mb: 2 }}
                    variant="filled"
                    color={item === value ? "primary" : "default"}
                    label={item}
                    onClick={() => handleSelect(item)}
                />
            ))}
        </Stack>
    );
};

export default AZSort;
