import { store } from '../store';
import { fetchHotels } from "../store/thunks/hotelsThunk";

export const hotelsLoader = async () => {
    const result = await store.dispatch(fetchHotels());

    return result.payload;
}