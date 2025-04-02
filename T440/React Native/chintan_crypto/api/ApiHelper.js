import axios from 'axios';

export const getExchanges = async () => {
  try {
    const response = await axios.get("https://api.coinlore.net/api/tickers/?start=0&limit=50");
    return response.data.data;
  } catch (error) {
    console.error('Error fetching exchanges:', error);
    throw error;
  }
};

export const getCryptoDetails = async (id) => {
  try {
    console.log(`https://api.coinlore.net/api/ticker/?id=${id}`);
    const response = await axios.get(`https://api.coinlore.net/api/ticker/?id=${id}`);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching crypto details:', error);
    throw error;
  }
};