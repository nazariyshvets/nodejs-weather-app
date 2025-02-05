import { WEATHER_STACK_BASE_URL } from "../constants.js";

const forecast = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${WEATHER_STACK_BASE_URL}/current?access_key=${process.env.WEATHER_STACK_API_KEY}&query=${latitude},${longitude}`,
    );
    const { error, location, current } = await response.json();

    if (error) {
      await Promise.reject(
        "Unable to find location. Please try with a different query",
      );
    } else {
      const { temperature, feelslike } = current;
      return {
        temperature,
        feelslike,
        location: `${location.name}, ${location.country}`,
      };
    }
  } catch (err) {
    await Promise.reject(
      typeof err === "string" ? err : "Unable to connect to a weather service",
    );
  }
};

export default forecast;
