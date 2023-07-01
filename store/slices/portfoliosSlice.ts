import { createSlice } from '@reduxjs/toolkit';

export interface Holding {
  _id: string;
  stock: string;
  purchaseDate: Date;
  purchasePrice: number;
  quantity: number;
}

export interface Portfolio {
  _id: string;
  uid: string;
  name: string;
  holdings: Holding[];
}

interface PortfoliosState {
  portfolios: Portfolio[];
}

const initialState: PortfoliosState = {
  portfolios: [],
};

const portfoliosSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    setPortfolios(state, action) {
      state.portfolios = action.payload;
    },
    addPortfolio(state, action) {
      state.portfolios.push(action.payload);
    },
    updatePortfolio(state, action) {
      const { _id } = action.payload;
      const portfolioIndex = state.portfolios.findIndex(
        (portfolio) => portfolio._id === _id
      );
      state.portfolios[portfolioIndex] = action.payload;
    },
    removePortfolio(state, action) {
      const { _id } = action.payload;
      const portfolioIndex = state.portfolios.findIndex(
        (portfolio) => portfolio._id === _id
      );
      state.portfolios.splice(portfolioIndex, 1);
    },
    logOutPortfolios(state) {
      state.portfolios = [];
    },
  },
});

export const {
  setPortfolios,
  addPortfolio,
  updatePortfolio,
  removePortfolio,
  logOutPortfolios,
} = portfoliosSlice.actions;
export default portfoliosSlice.reducer;
