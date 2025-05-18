import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../service/opencagedataApi';
import { exchangeCurrency, latestRates } from '../../service/exchangeAPI';

export const fetchCurrency = createAsyncThunk(
  'currency/fetchCurrency',
  async (body, thunkAPI) => {
    const { latitude, longitude } = body;
    try {
      const state = thunkAPI.getState();
      const { baseCurrency } = state.currency;

      if (baseCurrency) {
        return thunkAPI.rejectWithValue('We already have base currency!');
      }
      const getCurrency = await getUserInfo({ latitude, longitude });
      return getCurrency;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchExchangeResult = createAsyncThunk(
  'currency/fetchExchangeResult',
  async (body, thunkAPI) => {
    const { amount, from, to } = body;
    try {
      const data = await exchangeCurrency({ amount, from, to });
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchRatesCurrency = createAsyncThunk(
  'currency/fetchRatesCurrency',
  async (body, thunkAPI) => {
    const { baseCurrency } = body;
    try {
      const rates = await latestRates(baseCurrency);
      console.log(rates);
      return rates;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
