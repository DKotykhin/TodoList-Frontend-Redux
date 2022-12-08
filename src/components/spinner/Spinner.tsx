import React from "react";
import { ReactComponent as Icon } from "images/svg/spinner.svg";

import { Box } from "@mui/material"

const Spinner: React.FC = () => {

    return (
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Icon />
        </Box>
    )
}

export default Spinner;