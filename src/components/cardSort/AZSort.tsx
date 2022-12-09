import React, { useState } from "react";
import { Stack, Chip } from "@mui/material";

interface IAZSort {
    onSelect: (arg0: string) => void
}

const sortItems = ["A-z", "Z-a"];

const AZSort: React.FC<IAZSort> = ({ onSelect }) => {
    const [chipLabel, setChipLabel] = useState("A-z");

    const handleSelect = (label: string) => {
        setChipLabel(label);
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
