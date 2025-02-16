import {Box, Card, CardActionArea, CardContent, CardMedia, Typography, IconButton, Rating} from "@mui/material";
import { useSelector } from "react-redux";
import {ArrowBackIos, ArrowForwardIos, PlaceOutlined} from "@mui/icons-material";
import { useRef } from "react";

export default function HomeHotelsList() {
    const { hotels } = useSelector((state) => state.hotel);
    const scrollContainerRef = useRef(null);

    function topRatedHotels() {
        return [...hotels].sort((a, b) => b.hotel_rating - a.hotel_rating);
    }

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <IconButton onClick={() => scroll("left")} className="scroll-btn scroll-btn-left">
                <ArrowBackIos />
            </IconButton>
            <Box ref={scrollContainerRef} className="scroll-container">
                {topRatedHotels().slice(0,10).map((hotel) => (
                    <Card key={hotel.id} variant="outlined" className="hotel-list-card">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="180"
                                image={hotel.image_url ? `/assets/img/${hotel.image_url}` : `/assets/img/none.png`}
                                alt={hotel.name}
                                onError={(e) => e.target.src = "/assets/img/none.png"}
                            />
                            <CardContent>
                                <Typography gutterBottom className="hotel-card-name" component="div">
                                    {hotel.name}
                                </Typography>
                                <Typography variant="body2" display="flex" alignItems="center" gap={0.5}>
                                    <PlaceOutlined sx={{ fontSize: 18 }} />
                                    {hotel.city}{hotel.state && `, ${hotel.state}`}
                                </Typography>
                                <Rating name="half-rating-read" defaultValue={hotel.hotel_rating} precision={0.5} readOnly />
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
            <IconButton onClick={() => scroll("right")} className="scroll-btn scroll-btn-right">
                <ArrowForwardIos />
            </IconButton>
        </Box>
    );
}
