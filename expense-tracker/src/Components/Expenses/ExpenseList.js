import ExpenseItem from './ExpenseItem';
import classes from './ExpenseList.module.css';
import Button from '../UI/Button';
import {useSelector,useDispatch} from 'react-redux';
import {Fragment} from 'react';
import PremiumFeatures from './PremiumFeatures';
import {premiumAction} from '../../store/Premium';
import {themeAction} from '../../store/Theme';
import {useEffect,useState} from 'react';

const ExpenseList = (props)=>{
     
    //get expense details
    const expenseArr = useSelector(state=>state.expense.expenseList);
    const dispatch = useDispatch();
    let totalAmount = 0;

    const[isPremiumButtonActive,setIsPremiumButtonActive] = useState(false);


    //count total amount for expenses
    expenseArr.forEach((expense)=>totalAmount += +expense.amount );

    useEffect(()=>{
      if (expenseArr.length > 0)
         {  
          if (totalAmount < 10000) 
          {
            dispatch(themeAction.offTheme());
            setIsPremiumButtonActive(false);  
          }
          else{
              setIsPremiumButtonActive(true);
          }
        }
          else{
            dispatch(themeAction.offTheme());
            setIsPremiumButtonActive(false);
          }

    },[totalAmount,dispatch,expenseArr])
        
    return(
      // <div className={classes.main}>
      // <div className={classes.amt}>
      <>
      <div className={classes.amt}>
      <span>Total Amount : {totalAmount}</span>
              {
                  totalAmount >= 10000 && 
                  <PremiumFeatures expenses = {props.expenses}/> 
              }
              </div>
      {/* // </div> */}
               {props.expenses.map((expense)=>{ 
                  return <ExpenseItem key = {expense.id}
                  expense = {expense} 
                  editExpense = {props.editExpense}/>
              }) }

        </>
          // {/* </div> */}
          // // </div>
    
      
    );
}
export default ExpenseList;