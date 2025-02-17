import "./Home.scss"

import HomeSearchForm from "./HomeSearchForm";
import HomeHotelsList from "./HomeHotelsList";
import {Box} from "@mui/material";
import {useSelector} from "react-redux";

export default function Home() {
    const hotels = useSelector((state) => state.hotel.hotels);

    return (
        <Box className="home-page">
            <HomeSearchForm />
            {hotels.length > 5 && <HomeHotelsList />}
        </Box>
    )
}