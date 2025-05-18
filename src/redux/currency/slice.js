import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCurrency,
  fetchExchangeResult,
  fetchRatesCurrency,
} from './operations';

const slice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    isError: null,
    rates: [],
  },
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrency.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(fetchExchangeResult.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchExchangeResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exchangeInfo = action.payload;
      })
      .addCase(fetchExchangeResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.exchangeInfo = null;
      })
      .addCase(fetchRatesCurrency.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchRatesCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rates = action.payload;
      })
      .addCase(fetchRatesCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});
export const { setBaseCurrency } = slice.actions;
export const currencyReducer = slice.reducer;
