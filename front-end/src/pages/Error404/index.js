import { Box, Typography } from "@mui/material";

import "./Error404.scss"

export default function Error404() {
    return (
        <Box>
            <Box marginTop={12} marginBottom={7}>
                <Typography color="#7F2203" fontSize="24px" fontWeight="700">
                    Error 404
                </Typography>
                <Typography color="#7F2203" fontSize="24px" fontWeight="700">
                    Page is not found.
                </Typography>
            </Box>
        </Box>
    )
}