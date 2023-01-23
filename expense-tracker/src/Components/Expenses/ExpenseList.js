import ExpenseItem from './ExpenseItem';
import classes from './ExpenseList.module.css';
import {useSelector,useDispatch} from 'react-redux';
import PremiumFeatures from './PremiumFeatures';
import {themeAction} from '../../store/Theme';
import {useEffect} from 'react';

const ExpenseList = (props)=>{
     
    //get expense details
    const expenseArr = useSelector(state=>state.expense.expenseList);
    const dispatch = useDispatch();
    let totalAmount = 0;


    //count total amount for expenses
    expenseArr.forEach((expense)=>totalAmount += +expense.amount );

    useEffect(()=>{
      if (expenseArr.length > 0)
         {  
          if (totalAmount < 10000) 
          {
            dispatch(themeAction.offTheme()); 
          }
        }
          else{
            dispatch(themeAction.offTheme());
          }

    },[totalAmount,dispatch,expenseArr])
        
    return(
      
      <>
      <div className={classes.amt}>
      <span>Total Amount : {totalAmount}</span>
              {
                  totalAmount >= 10000 && 
                  <PremiumFeatures expenses = {props.expenses}/> 
              }
              </div>
               {props.expenses.map((expense)=>{ 
                  return <ExpenseItem key = {expense.id}
                  expense = {expense} 
                  editExpense = {props.editExpense}/>
              }) }

        </>
      
    );
}
export default ExpenseList;