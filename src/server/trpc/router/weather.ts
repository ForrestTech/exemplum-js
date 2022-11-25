import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
//import { env } from "env/server.mjs";

export type WeatherForecast = {
  name: string;
  weather: Weather[];
  main: Temperature;
};

export type Weather = {
  main: string;
  description: string;
};

export type Temperature = {
  temp: number;
};

export const weatherRouter = router({
  forecast: protectedProcedure
    .input(z.object({ lat: z.number(), lon: z.number() }))
    .query(async ({ input }) => {
      const appid = ""; //env.OPEN_WEATHER_APP_ID;
      const weatherforecast = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${input.lat}&lon=${input.lon}&appid=${appid}`
      ).then((res) => res.json() as Promise<WeatherForecast>);

      return weatherforecast;
    }),
});
