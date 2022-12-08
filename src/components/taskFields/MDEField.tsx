import React, { useMemo } from "react";
import Paper from "@mui/material/Paper";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface IMDEField {
    description?: string;
    MDEChange: (arg0: string) => void;
}

export const MDEField: React.FC<IMDEField> = ({ description, MDEChange }) => {

    const options: EasyMDE.Options = useMemo(
        () => ({
            spellChecker: false,
            hideIcons: ["preview", "side-by-side", "quote"],
            maxHeight: "200px",
            autofocus: true,
            placeholder: "Введите текст...",
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
                uniqueId: "MyUniqueID",
            },
        }),
        []
    );
    return (
        <Paper>
            <SimpleMDE value={description} onChange={MDEChange} options={options} />
        </Paper>
    )
};
