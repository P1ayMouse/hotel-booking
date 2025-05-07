import { features } from "../../data/features";
import {Typography} from "@mui/material";
import styles from "./HotelFeature.module.scss";

export default function HotelFeature (feature) {
    const featureDetails = features.find(item => item.key === feature);
    if (!featureDetails) return null;

    return (
        <Typography key={featureDetails.key} className={styles.hotelFeature}>
            {featureDetails.icon}
            {featureDetails.label}
        </Typography>
    );
};
