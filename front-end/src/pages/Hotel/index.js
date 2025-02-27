import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

import {fetchHotel} from "../../store/thunks/hotelsThunk";

import {Box} from "@mui/material";

import "./Hotel.scss"

export default function Hotel() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { hotel } = useSelector((state) => state.hotel);

    useEffect(() => {
        dispatch(fetchHotel(id));
    }, [id, dispatch]);

    return (
        <Box>
            {Object.entries(hotel).map(([key, value]) => (
                value &&
                <Box>
                    {key}: {value}
                </Box>
            ))}
        </Box>
    )
}