import {Box, Button, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import "./About.scss"
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function About() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Box marginTop={12} marginBottom={7} className="about">
            <Grid container spacing={2} className="cards-container">
                <Grid size={{ md: 12 }}>
                    <Box className="card-content">
                        <Typography className="title">{t("aboutWelcome")}</Typography>
                        <Typography className="body">{t("aboutWelcomeDescription")}</Typography>
                    </Box>
                </Grid>
                <Grid size={{ md: 6, xs: 12}}>
                    <Box className="card-content">
                        <Typography className="title">{t("aboutVision")}</Typography>
                        <Typography className="body">{t("aboutVisionDescription")}</Typography>
                    </Box>
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                    <Box className="card-content grey">
                        <Typography className="title">{t("aboutGoal")}</Typography>
                        <Typography className="body">{t("aboutGoalDescription")}</Typography>
                    </Box>
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                    <Box className="card-content grey">
                        <Typography className="title">{t("aboutMission")}</Typography>
                        <Typography className="body">{t("aboutMissionDescription")}</Typography>
                    </Box>
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                    <Box className="card-content">
                        <Typography className="title">{t("aboutMadeUsSuccessful")}</Typography>
                        <Typography className="body" style={{fontWeight: "520", fontSize: "16px"}}>{t("aboutMadeUsSuccessfulDescription")}</Typography>
                        <Typography className="body" style={{fontWeight: "700", color: "#A6A6A6", fontSize: "64px", lineHeight: "70px"}}>
                            125+
                            <Typography className="body" style={{fontWeight: "700", color: "#A6A6A6", fontSize: "20px"}}>{t("vacantCareers")}</Typography>
                        </Typography>
                        <Button className="button"
                            variant="outlined"
                            onClick={() => navigate("/career")}
                        >
                            {t("findMore")}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
