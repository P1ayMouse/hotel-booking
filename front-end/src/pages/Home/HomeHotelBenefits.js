import { Box, Typography } from "@mui/material";

import {ReactComponent as Benefit} from "../../assets/img/Benefit.svg";
import {ReactComponent as SmartCar} from "../../assets/icons/smart-car.svg";
import {ReactComponent as Weight} from "../../assets/icons/weight.svg";
import {ReactComponent as Reserve} from "../../assets/icons/reserve.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

export default function HomeHotelBenefits() {
    const { t } = useTranslation();

    const benefits = [
        {
            icon: <SmartCar />,
            title: "Free Accommodation",
            body: "Accommodation for you to enjoy exploring around the hotels."
        },
        {
            icon: <Weight />,
            title: "Fitness Center",
            body: "For those of you who like to do fitness thing, fitness is free."
        },
        {
            icon: <Reserve />,
            title: "Free Breakfast",
            body: "Whose does not like meal in the morning, breakfast is free."
        }
    ];
    return (
        <Box className="home-hotel-benefits">
            <Benefit className="benefit-img" />
            <Box width="100%" className="benefit-content">
                <Typography style={{fontSize: "16px", fontWeight: 450, lineHeight: "32px", textTransform: "uppercase", color: "var(--accent)"}}>
                    {t("benefit")}
                </Typography>
                <Typography style={{fontSize: "48px", fontWeight: 500, lineHeight: "57px", color: "var(--primary-text)"}} mb={2}>
                    {t("benefitTitle")}
                </Typography>
                <Typography style={{fontSize: "18px", fontWeight: 280, lineHeight: "32px", color: "#959493"}}>
                    {t("benefitBody")}
                </Typography>
                <Box className="benefits-list" mt={6}>
                    {benefits.map((benefit) => (
                        <Box className="benefit-element" key={benefit.title}>
                            <Box className="benefit-icon-container">
                                <Box className="benefit-icon">
                                    {benefit.icon}
                                </Box>
                            </Box>

                            <Box>
                                <Typography className="benefit-title">
                                    {benefit.title}
                                </Typography>
                                <Typography className="benefit-body">
                                    {benefit.body}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
