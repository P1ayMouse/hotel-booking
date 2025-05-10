import { store } from "../store";
import { fetchDestinations } from "../store/thunks/destinationsThunk";

export const destinationsLoader = async () => {
    const result = await store.dispatch(fetchDestinations());

    return result.payload;
};