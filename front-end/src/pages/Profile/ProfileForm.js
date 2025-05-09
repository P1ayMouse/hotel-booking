import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, TextField, MenuItem } from "@mui/material";
import Grid from '@mui/material/Grid2';

export default function RegisterForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { username, email, age, gender } = useSelector((state) => state.auth.user);

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        disabled
                        className="profile-field"
                        name="username"
                        label={t("username")}
                        value={username}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        disabled
                        className="profile-field"
                        name="email"
                        label={t("emailAddress")}
                        type="email"
                        value={email}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        disabled
                        className="profile-field"
                        name="age"
                        label={t("age")}
                        type="number"
                        value={age}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        select
                        disabled
                        fullWidth
                        className="profile-field"
                        name="gender"
                        label={t("gender")}
                        value={gender}
                    >
                        <MenuItem id="male" value="male">{t("male")}</MenuItem>
                        <MenuItem id="female" value="female">{t("female")}</MenuItem>
                        <MenuItem id="another" value="another">{t("another")}</MenuItem>
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        className="profile-button"
                        onClick={() => {navigate("/favorite-hotels")}}
                    >
                        {t("favouritePlaces")}
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        className="profile-button"
                        onClick={() => {navigate("/reserved-hotels")}}
                    >
                        {t("reservedHotels")}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
