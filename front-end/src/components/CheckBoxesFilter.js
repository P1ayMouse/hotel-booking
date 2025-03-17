import { useTranslation } from "react-i18next";
import { Checkbox, FormControlLabel, FormGroup, Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import {ReactComponent as CheckedMark} from "../assets/icons/CheckedMark.svg";
import {ReactComponent as CheckMark} from "../assets/icons/CheckMark.svg";

export default function CheckBoxesFilter({title, elements, filterKey}) {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [itemsNum, setItemsNum] = useState(3);

    let selectedFilters = searchParams.get(filterKey)?.split(",") || [];

    const handleCheckboxChange = (itemKey) => {
        if (selectedFilters.includes(itemKey)) {
            selectedFilters = selectedFilters.filter(key => key !== itemKey)
        }
        else {
            selectedFilters.push(itemKey);
        }

        const newParams = new URLSearchParams(searchParams);
        if (!selectedFilters.length) newParams.delete(filterKey);
        else newParams.set(filterKey, selectedFilters.join(","));
        newParams.delete("page");
        setSearchParams(newParams);
    }

    return (
        <Box display="flex" flexDirection="column">
            <Typography sx={{marginBottom: "8px", fontWeight: 600, fontSize: "18px"}}>
                {title}
            </Typography>

            <FormGroup>
                {elements.slice(0,itemsNum).map((item) => (
                    <FormControlLabel
                        key={item.key}
                        label={item.label}
                        control={
                        <Checkbox
                            onChange={() => handleCheckboxChange(item.key)}
                            icon={<CheckMark />}
                            checkedIcon={<CheckedMark />}
                            checked={selectedFilters.includes(item.key)}
                        />}
                    />
                ))}
            </FormGroup>
            {itemsNum <= elements.length &&
                <Typography onClick={() => setItemsNum(itemsNum + 3)} sx={{ color: "var(--accent)", cursor: "pointer", fontSize: "12px", fontWeight: 500 }}>
                    {t("showMore")}
                </Typography>
            }
        </Box>
    );
}
