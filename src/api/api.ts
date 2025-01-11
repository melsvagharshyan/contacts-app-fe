import axios from 'axios';

export const API = axios.create({ baseURL: 'https://contacts-be-production.up.railway.app' });
