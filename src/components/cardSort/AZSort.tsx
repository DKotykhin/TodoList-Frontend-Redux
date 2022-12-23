import React from "react";
import { Stack, Chip } from "@mui/material";

interface IAZSort {
    chipLabel: string;
    onSelect: (arg0: string) => void;
}

const sortItems = ["A-z", "Z-a"];

const AZSort: React.FC<IAZSort> = ({ onSelect, chipLabel }) => {

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
                    color={item === chipLabel ? "primary" : "default"}
                    label={item}
                    onClick={() => handleSelect(item)}
                />
            ))}
        </Stack>
    );
};

export default AZSort;
