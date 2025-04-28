import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {PlaceOutlined, StarRate} from "@mui/icons-material";

import "./HotelCard.scss"
import {NavLink} from "react-router-dom";

export default function HotelCard({hotel}) {
    return (
        <Card
            key={hotel.id}
            variant="outlined"
            className="hotel-card"
            sx={{borderRadius: "32px", backgroundColor: "var(--second-bg)"}}
        >
            <CardActionArea
                component={NavLink} to={`/hotels/hotel/${hotel.id}`}
            >
                <CardContent className="card-content">
                    <CardMedia
                        component="img"
                        className="card-img"
                        image={hotel.image_url ? `/assets/img/hotels/${hotel.image_url}` : `/assets/img/none.png`}
                        alt={hotel.name}
                        onError={(e) => e.target.src = "/assets/img/none.png"}
                    />
                    <Box className="main-info">
                        <Box width="250px">
                            <Typography className="card-name" gutterBottom>
                                {hotel.name}
                            </Typography>
                            <Typography variant="body2" display="flex" alignItems="center" color="var(--second-text)">
                                <PlaceOutlined sx={{ fontSize: "20px", color: "#FEBD22", mr: 1 }} />
                                {hotel.address}{hotel.state && `, ${hotel.state}`}
                            </Typography>
                        </Box>
                        <Typography variant="body2" display="flex" alignItems="center" color="var(--primary-text)" gap={0.5}>
                            <StarRate sx={{ fontSize: "20px", color: "#F2AC0D", marginBottom: 0.5 }} />
                            {hotel.hotel_rating || 0}
                        </Typography>
                    </Box>
                    <Box className="hotel-price">
                        {`$${hotel.price.toFixed(2)}`}
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}