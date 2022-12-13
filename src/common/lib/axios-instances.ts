import axios from 'axios';

export const openWeatherMapsAxios = axios.create({
  baseURL: 'https://api.flutterwave.com/v3',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
  },
});
