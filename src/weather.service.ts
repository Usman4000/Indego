import { Injectable, } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import axios from 'axios'; // Import axios


@Injectable()
export class WeatherService {
  constructor(private readonly prisma: PrismaService) { }

  getHello(): string {
    return 'weather service!';
  }

async getTemperatureByCity(cityName):Promise<any> {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API}`;

  try {
    const response = await axios.get(apiUrl);
    const temperatureInKelvin = response.data.main.temp;
    const temperatureInCelsius = temperatureInKelvin - 273.15; // Convert to Celsius
    return temperatureInCelsius;
  } catch (error) {
    throw new Error('Failed to fetch temperature data');
  }
}



}
