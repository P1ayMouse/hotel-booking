import "./Home.scss"

import HomeSearchForm from "./HomeSearchForm";
import HomeHotelsList from "./HomeHotelsList";
import {Box} from "@mui/material";

export default function Home() {
    return (
        <Box className="home-page">
            <HomeSearchForm />
            <HomeHotelsList />
        </Box>
    )
}