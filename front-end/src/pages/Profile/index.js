import { Box } from "@mui/material";

import ProfileForm from "./ProfileForm";
import "./Profile.scss"

export default function Profile() {
    return (
        <Box className="profile-container">
            <ProfileForm />
        </Box>
    )
}