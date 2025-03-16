import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, IconButton } from "@mui/material";
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, NavigateBefore, NavigateNext } from "@mui/icons-material";

import { features } from "../../data/features";
import HotelCard from "./HotelCard";

export default function HotelsList() {
    const hotels = useSelector((state) => state.hotel.hotels);
    const destinations = useSelector((state) => state.destination.destinations);

    const [searchParams, setSearchParams] = useSearchParams();

    const destinationParam = searchParams.get("destination");
    const filterPrice = searchParams.get("price")?.split("-").map(Number);
    const sortBy = searchParams.get("sortBy") || "";
    const filterFeatures = searchParams.get("features")?.split(",") || [];

    const currentPage = Number(searchParams.get("page")) || 1;

    // Destination sort
    let filteredHotels = hotels;
    if (destinationParam) {
        const destValue = Number(destinationParam);
        const selectedDestination = destinations.find(dest => dest.value === destValue);
        if (selectedDestination) {
            filteredHotels = hotels.filter(hotel =>
                hotel.city.toLowerCase() === selectedDestination.label.toLowerCase()
            );
        } else {
            filteredHotels = hotels.filter(hotel =>
                hotel.city.toLowerCase().includes(destinationParam.toLowerCase())
            );
        }
    }

    // Sort price
    if (filterPrice && filterPrice.length === 2) {
        filteredHotels = filteredHotels.filter(
            hotel => hotel.price >= filterPrice[0] && hotel.price <= filterPrice[1]
        );
    }

    // Converting key into label
    const keyToLabel = (arr, key) => {
        return arr.find(item => item.key === key)?.label;
    };

    // Features filter
    if (filterFeatures.length > 0) {
        filteredHotels = filteredHotels.filter(hotel =>
            filterFeatures.every(featureKey => hotel.features?.includes(keyToLabel(features, featureKey)))
        );
    }

    // Sort by
    const sortedHotels = [...filteredHotels];
    switch (sortBy) {
        case "highRated":
            sortedHotels.sort((a, b) => b.hotel_rating - a.hotel_rating);
            break;
        case "lowRated":
            sortedHotels.sort((a, b) => a.hotel_rating - b.hotel_rating);
            break;
        case "highPrice":
            sortedHotels.sort((a, b) => b.price - a.price);
            break;
        case "lowPrice":
            sortedHotels.sort((a, b) => a.price - b.price);
            break;
        default:
            break;
    }

    // Pagination navigation
    const itemsPerPage = 5;
    const totalPages = Math.ceil(sortedHotels.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentHotels = sortedHotels.slice(startIndex, startIndex + itemsPerPage);

    const handlePrev = () => {
        const prevPage = Math.max(currentPage - 1, 1);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", prevPage);
        setSearchParams(newParams);
    };

    const handleNext = () => {
        const nextPage = Math.min(currentPage + 1, totalPages);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", nextPage);
        setSearchParams(newParams);
    };

    const goToFirstPage = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", 1);
        setSearchParams(newParams);
    };

    const goToLastPage = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", totalPages);
        setSearchParams(newParams);
    };


    return (
        <Box className="hotels-list-pagination">
            <Box className="hotels-list-container">
                {currentHotels.length > 0 ? (
                    currentHotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                    ))
                ) : (
                    <Typography marginTop="200px" color="#7F2203" width="100%" textAlign="center" fontSize="24px" fontWeight="700">
                        Hotels not found.
                    </Typography>
                )}
            </Box>
            { totalPages > 0 &&
                <Box display="flex" justifyContent="center" alignItems="center" marginTop={4}>
                    <IconButton onClick={goToFirstPage} disabled={currentPage === 1}>
                        <KeyboardDoubleArrowLeft />
                    </IconButton>
                    <IconButton onClick={handlePrev} disabled={currentPage === 1}>
                        <NavigateBefore />
                    </IconButton>
                    <Typography marginX={2}>
                        {currentPage} / {totalPages}
                    </Typography>
                    <IconButton onClick={handleNext} disabled={currentPage === totalPages}>
                        <NavigateNext />
                    </IconButton>
                    <IconButton onClick={goToLastPage} disabled={currentPage === totalPages}>
                        <KeyboardDoubleArrowRight />
                    </IconButton>
                </Box>
            }
        </Box>
    );
}
