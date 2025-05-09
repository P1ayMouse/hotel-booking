import { store } from '../store';
import { fetchUserProfile } from "../store/thunks/authThunk";

export const userLoader = async () => {
    const result = await store.dispatch(fetchUserProfile());

    return result.payload;
}