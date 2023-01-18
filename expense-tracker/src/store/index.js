import {configureStore } from '@reduxjs/toolkit';
import AuthReducer from './Auth';
import ExpenseReducer from './Expense';
import themeReducer from './Theme';
import PremiumReducer from './Premium';

const store = configureStore(
    {
        reducer : { auth : AuthReducer, expense : ExpenseReducer, theme : themeReducer, premium : PremiumReducer}
    }
);
export default store;


