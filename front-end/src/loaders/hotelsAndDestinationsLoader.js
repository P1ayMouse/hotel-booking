import { destinationsLoader } from "./destinationsLoader";
import { hotelsLoader } from "./hotelsLoader";

export async function hotelsAndDestinationsLoader() {
    const destinations = await destinationsLoader();
    const hotels = await hotelsLoader();

    return { destinations, hotels };
}
