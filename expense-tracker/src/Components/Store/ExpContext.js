import {createContext} from 'react';
const ExpContext = createContext(
    {
        expenseList : [],
        total : 0,
        addExpense : (expense)=>{},
        removeExpense : (id)=>{}
    }
);

export default ExpContext;