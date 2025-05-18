import { createSelector } from '@reduxjs/toolkit';
import { selectFilterValue } from '../filter/selectors';

export const selectBaseCurrency = state => state.currency.baseCurrency;
export const selectIsLoading = state => state.currency.isLoading;
export const selectIsError = state => state.currency.isError;
export const selectExchangeInfo = state => state.currency.exchangeInfo;
export const selectRates = state => state.currency.rates;

export const selectFilteredRates = createSelector(
  [selectRates, selectBaseCurrency, selectFilterValue],
  (rates, baseCurrency, filterValue) => {
    const normalizedFilterValue = filterValue.toLowerCase();

    if (filterValue === '') {
      return rates
        .filter(([key]) => key !== baseCurrency)
        .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
    }

    return rates
      .filter(
        ([key]) =>
          key !== baseCurrency &&
          key.toLowerCase().includes(normalizedFilterValue),
      )
      .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
  },
);
