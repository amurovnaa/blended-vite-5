import axios from 'axios';

export const getUserInfo = async ({ latitude, longitude }) => {
  const apiKey = 'd4683b09d0c94ec0aebf0b2e043decbf';
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;
  const { data } = await axios.get(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });
  const currencyCode = data.results[0].annotations.currency.iso_code;
  console.log('getUserInfo received:', latitude, longitude);

  return currencyCode;
};
