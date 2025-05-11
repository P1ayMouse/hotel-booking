import { features } from "../../data/features";
import {Typography} from "@mui/material";
import styles from "./HotelFeature.module.scss";
import PropTypes from "prop-types";

export default function HotelFeature (feature) {
    const featureDetails = features.find(item => item.key === feature);
    if (!featureDetails) {return null;}

    return (
        <Typography key={featureDetails.key} className={styles.hotelFeature}>
            {featureDetails.icon}
            {featureDetails.label}
        </Typography>
    );
};

HotelFeature.propTypes = {
    feature: PropTypes.string.isRequired,
};
