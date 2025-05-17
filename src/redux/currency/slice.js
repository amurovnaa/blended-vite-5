import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrency, fetchExchangeResult } from './operations';

const slice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    isError: null,
  },
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
      state.isError = null;
      console.log('set currency');
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
        console.log('fulfilled');
      })
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload !== 'We already have base currency!') {
          state.isError = action.payload;
        }
      })
      .addCase(fetchExchangeResult.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchExchangeResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exchangeInfo = action.payload; // Тут записуємо { amount, from, to, rate, result }
      })
      .addCase(fetchExchangeResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
        state.exchangeInfo = null;
      });
  },
});
export const { setBaseCurrency } = slice.actions;
export const currencyReducer = slice.reducer;
