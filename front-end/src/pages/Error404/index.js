import { Box, Typography } from "@mui/material";

import "./Error404.scss";

export default function Error404() {
    return (
        <Box className="error404">
            <Box marginTop={12} marginBottom={7}>
                <Typography className="text-header">
                    Error 404
                </Typography>
                <Typography className="text-body">
                    Page is not found.
                </Typography>
            </Box>
        </Box>
    );
}