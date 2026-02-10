import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
export const FAVORITES_STORAGE_KEY = '@onfilmes';

export default api;
