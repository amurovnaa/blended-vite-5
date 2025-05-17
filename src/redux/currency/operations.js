import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../service/opencagedataApi';
import { exchangeCurrency } from '../../service/exchangeAPI';

export const fetchCurrency = createAsyncThunk(
  'currency/fetchCurrency',
  async ({ latitude, longitude }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { baseCurrency } = state.currency;

      if (baseCurrency) {
        return thunkAPI.rejectWithValue('We already have base currency!');
      }
      const currency = await getUserInfo({ latitude, longitude });
      return currency;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchExchangeResult = createAsyncThunk(
  'currency/fetchExchangeResult',
  async ({ amount, from, to }, thunkAPI) => {
    try {
      const data = await exchangeCurrency({ amount, from, to });
      console.log(data); // { amount, from, to, rate, result }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
