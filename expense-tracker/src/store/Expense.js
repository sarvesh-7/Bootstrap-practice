import {createSlice} from '@reduxjs/toolkit';

const initialExpSlice = {
    expenseList : [],
    total : 0
};

const expenseSlice = createSlice({
    name : 'expense',
    initialState : initialExpSlice,
    reducers : {
        addExpense(state,action){
            state.expenseList = [...state.expenseList, action.payload];
            state.total = state.total + +action.payload.amount;
        },

    //delete expense selected by user
       removeExpense(state,action){
        const expToBeDeleted = action.payload;
        const expList = state.expenseList;
        const index = expList.findIndex(exp=>exp.id===expToBeDeleted.id);
        expList.splice(index,1);
        state.expenseList = expList;
        state.total = state.total - +expToBeDeleted.amount;
    },

    getExpenses(state,action){
        state.total = action.payload.totalAmt;
        state.expenseList = action.payload.expList;       
    }
    }
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;