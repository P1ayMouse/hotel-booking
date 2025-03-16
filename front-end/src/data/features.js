import { AllInclusive, CurrencyExchange, FitnessCenterRounded, FreeBreakfast, LocalParking, Pets, Pool, Wifi} from "@mui/icons-material";

export const features = [
    {
        label: "Breakfast included",
        key: "breakfast",
        icon: <FreeBreakfast />
    },
    {
        label: "All-inclusive",
        key: "all-inclusive",
        icon: <AllInclusive />
    },
    {
        label: "Free Cancellation",
        key: "free-cancellation",
        icon: <CurrencyExchange />
    },
    {
        label: "Pool",
        key: "pool",
        icon: <Pool />
    },
    {
        label: "Pet friendly",
        key: "pet",
        icon: <Pets />
    },
    {
        label: "Wi-Fi",
        key: "wifi",
        icon: <Wifi />
    },
    {
        label: "Parking",
        key: "parking",
        icon: <LocalParking />
    },
    {
        label: "Gym",
        key: "gym",
        icon: <FitnessCenterRounded />
    }
]