import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
    // Get Input
    // Fetch Data
    const options = {
        method: 'GET',
        url: process.env.WEATHER_API_URL,
        params: { q: '53.1,-0.13' },
        headers: {
            'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const { location, current } = response.data;

        console.log(`\n\n\tLocalTime: ${location.localtime}`)
        console.log(`\tPlace: ${location.name}, ${location.country}`)
        console.log(`\tTemp: ${current.temp_c}*C (${current.temp_f}*F)`)
        console.log(`\tContidion: ${current.condition.text}`)
        console.log(`\tWind_Presure: ${current.wind_kph} kmph`)
        console.log(`\tHumidity: ${current.humidity}\n\n`)
    } catch (error) {
        console.error(error);
    }
    // Output
})()