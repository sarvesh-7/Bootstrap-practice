import classes from './ExpenseItem.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useDispatch,useSelector} from 'react-redux';
import {expenseAction} from '../../store/Expense';
import axios from 'axios';
import React,{Fragment,useState} from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

const ExpenseItem = (props)=>{;
    const dispatch = useDispatch();

    const[status,setStatus] = useState();

    //firebase database URL path
    const url = 'https://expense-tracker-d3062-default-rtdb.firebaseio.com';

      //get user's email address
      const emailID = useSelector(state=>state.auth.email);

    const removeExpense=async()=>{

        //need to remove from screen as well as backend
        setStatus('pending');
            const res = await axios.delete(`${url}/${emailID}/${props.expense.id}.json`);
            if(res.status===200)
            {
              setStatus('completed');
              console.log('expense deleted successfully');
              dispatch(expenseAction.removeExpense(props.expense));
            }
    }

    //edit expenses
    const editExpense=()=>{
        //remove expense from screen only
        dispatch(expenseAction.removeExpense(props.expense));

          //show expense inputs on to expense form so user can edit it
          props.editExpense(props.expense);
       
    }

    return(
      <Fragment>
         {
            status === 'pending' &&
            <div className={classes.spinner}>
            <LoadingSpinner/>
            </div>
            }
            {/* <div className={classes.main}>
            <div className={classes.expenseItem}> */}
            <Card className="mt-3">
              
            <Card.Header> {props.expense.description}</Card.Header>
            <Card.Body>
             {props.expense.category} - {props.expense.amount}/-
            </Card.Body>
            {/* </div> */}
            
            {/* <div className={classes.expActions}> */}
            <Card.Footer>
            <Button variant="danger" className="me-2" onClick={removeExpense}>
              <i className='fa fa-trash-o'></i> 
            </Button>
            <Button variant="danger" className="me-2" onClick={editExpense}>
              <i className='fa fa-edit'></i>
            </Button>
            </Card.Footer>
            </Card>
            {/* </div> */}
            {/* </div> */}
        </Fragment>
    ) 
};
export default ExpenseItem;