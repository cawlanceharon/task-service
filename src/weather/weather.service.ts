import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly apiKey = '9642b26e11dfd0d8a4512bc6c9d78eed';
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  async getWeather(city: string): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error fetching weather data');
    }
  }
}
