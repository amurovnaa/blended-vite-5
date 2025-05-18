import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'filter',
  initialState: {
    filterValue: '',
  },
  reducers: {
    changeFilter: (state, action) => {
      state.filterValue = action.payload;
    },
  },
});
export const { changeFilter } = slice.actions;
export const filterReducer = slice.reducer;
