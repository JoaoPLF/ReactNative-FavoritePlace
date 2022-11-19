// Get your API key at https://positionstack.com/
const API_KEY = "INSERT YOUR KEY HERE";

export const getAddress = async (lat, lng) => {
  const reverseGeoUrl = `http://api.positionstack.com/v1/reverse?access_key=${API_KEY}&query=${lat},${lng}&limit=1&output=json`;

  const response = await fetch(reverseGeoUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch address.");
  }

  const data = await response.json();
  return data.data[0].label;
};