export async function getLocation() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;

    const key = "65ba57aa9ce51563262744obs7cd5ff";
    const url = process.env.GEOCODE_MAP_URL;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch location data. Status: ${response.status}`,
      );
    }

    const data = await response.json();

    return {
      postcode: data.address?.postcode,
    };
  } catch (error) {
    throw new Error("Failed to get location data.");
  }
}
