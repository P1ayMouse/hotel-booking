import { useTranslation } from "react-i18next";
import {Box, Typography} from "@mui/material";
import styles from "./HotelsLeftFilter.module.scss";
import HotelsPriceFilter from "./HotelsPriceFilter";
import CheckBoxesFilter from "../../components/CheckBoxesFilter";
import {features} from "../../data/features";

export default function HotelsLeftFilter() {
    const { t } = useTranslation();

    return (
        <Box className={styles.filterContainer}>
            <Box>
                <Typography className={styles.filterName}>
                    {t("filterBy")}
                </Typography>
            </Box>

            <HotelsPriceFilter/>
            <CheckBoxesFilter title="Features" elements={features} filterKey="features" />
        </Box>
    );
}
