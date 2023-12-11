import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Get Input
const location = process.argv[2];

if (!location) {
    console.log('Sorry, Invalid Input =>', location)
    process.exit(1);
}

(async (location) => {
    // Fetch Data
    const options = {
        method: 'GET',
        url: process.env.WEATHER_API_URL,
        params: { q: location },
        headers: {
            'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const { location, current } = response.data;

        // Formated Output
        console.log(`\n\n\tLocalTime: ${location.localtime}\n
            \tPlace: ${location.name}, ${location.country}
            \tTemp: ${current.temp_c}*C (${current.temp_f}*F)
            \tContidion: ${current.condition.text}
            \tWind_Presure: ${current.wind_kph} kmph
            \tHumidity: ${current.humidity}\n\n`)
    } catch (error) {
        console.error(error);
    }
})()