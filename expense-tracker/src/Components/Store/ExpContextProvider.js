import ExpContext from './ExpContext';
import {useState,useEffect} from 'react';
import axios from 'axios';

const ExpContextProvider = (props)=>{

    const[expList, setExpList] = useState([]);
    const[totalAmt,setTotalAmt] = useState(0);

    //firebase database URL path
    const url = 'https://expense-tracker-d3062-default-rtdb.firebaseio.com';

    //get expense details from database after every page refresh
    useEffect(()=>{
        const getExpenses = async()=>{
            const res = await axios.get(`${url}/expense.json`);
            if(res.status===200)
            {
                const data = res.data;
                let exp_list = [];
                let exp_total_amt = 0;
                for(const key in data)
                {
                   const expObj = {
                        id : key,
                        amount : data[key].amount,
                        description : data[key].description,
                        category : data[key].category 
                     }
                 exp_list.push(expObj);
                }
                exp_list.forEach((expense)=>exp_total_amt += +expense.amount ) ;
                console.log(exp_total_amt);
                setTotalAmt(exp_total_amt);
                setExpList(exp_list);       
            }
            else
            {
                alert('could not fetch data from database due to some technical error');
            }
        }
        getExpenses();
    }, []);

    //add expenses
    const addExpense=async(expense)=>{

         //update expense details into firebase database
         const res = await axios.post(`${url}/expense.json`, expense);
         console.log('res', res);
         if(res.status===200){
             alert('Expense stored in database successfully');
            const expObj = {
                id : res.data.name,
                ...expense
            }
             
             setExpList((expList)=>[...expList,  expObj]);
             setTotalAmt((total)=>(total + +expense.amount));
         }
         else{
             alert('Error while storing expense details ');
         }
    }

    //delete expense selected by user
    const removeExpense=async(expToBeDeleted,screen_only)=>{

        //if need to remove from screen as well as backend
        if(!screen_only){
            const res = await axios.delete(`${url}/expense/${expToBeDeleted.id}.json`);
            if(res.status===200)
            console.log('expense deleted successfully');
        }
        //for expense which needs to remove from screen only then only this code will execute
        expList.splice(expList.indexOf(expToBeDeleted),1);
        setExpList([...expList]);
        setTotalAmt((total)=>(total - +expToBeDeleted.amount)); 
        
    };

    //edit expense selected by user
    const editExpense = async(expToBeEdited)=>{
        const res = await axios.put(`${url}/expense/${expToBeEdited.id}.json`, expToBeEdited);
        if(res.status===200)
        console.log('expense edited successfully');
        //update total amount of all expenses
        setExpList([...expList,expToBeEdited]);
        setTotalAmt((total)=>(total + +expToBeEdited.amount)); 
    }

    const expCtx = {
        expenseList : expList,
        total : totalAmt,
        addExpense : addExpense,
        removeExpense : removeExpense,
        editExpense:editExpense
    }

    return(
        <ExpContext.Provider value={expCtx}>{props.children}</ExpContext.Provider>
    )

}
export default ExpContextProvider;