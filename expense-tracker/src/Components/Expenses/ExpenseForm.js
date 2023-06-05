import classes from './ExpenseForm.module.css';
import {useRef, Fragment, useState,memo} from 'react';
import ExpenseList from './ExpenseList';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {expenseAction} from '../../store/Expense';
import LoadingSpinner from '../UI/LoadingSpinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes2 from '../UI/common_css.module.css';
import CustModal from '../UI/Modal';

const ExpenseForm = ()=>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

      //alert message
      const[alert,setAlert] = useState('');

    //firebase database URL path
    const url = 'https://expense-tracker-d3062-default-rtdb.firebaseio.com';

    //get theme
  const theme = useSelector((state)=>state.theme.theme);

     //firebase database URL path for update
     const updateUrl = 'https://expense-tracker-d3062-default-rtdb.firebaseio.com';

    const dispatch = useDispatch();
    const expenseList = useSelector((state)=>state.expense.expenseList);

    //get user's email address
    const emailID = useSelector(state=>state.auth.email);

    //get expense details entered by user
    const amountRef = useRef();
    const descRef = useRef();
    const categoryRef = useRef();

    //check if user is editing existing expense details
    const[isEditing,setIsEditing] = useState();
    const[status,setStatus] = useState();


    const submitExpenseHandler=async(e)=>{
        e.preventDefault();

        if(expenseList.length===10)
        {
            setAlert('Maximum expenses limit reached');
            setShow(true);
            return;
        }
        const amount = amountRef.current.value;
        const description = descRef.current.value;
        const category = categoryRef.current.value;

        amountRef.current.value = "";
        descRef.current.value = "";

        if(!amount||!description){
            setAlert('All fields are mandatory');
            setShow(true);
            return;
        }

        const expObj = {
            amount, 
            description,
            category
        };
       
        //update expense details into firebase database
        setStatus('pending');
        const res = await axios.post(`${url}/${emailID}.json`, expObj);
        console.log('res', res);

        if(res.status===200){
            setAlert('Expense stored in database successfully');
            setShow(true);
            setStatus('completed');
           const expense = {
               id : res.data.name,
               ...expObj
           };
        dispatch(expenseAction.addExpense(expense));
        }
        else{
            setAlert('Error while storing expense details ');
            setShow(true);
            setStatus('completed');
        }

    }

    const editExpense=(expense)=>{
        //update expense details into form inputs using ref
        amountRef.current.value = expense.amount;
        descRef.current.value = expense.description;
        categoryRef.current.value = expense.category;
        setIsEditing(expense.id);
    };

    const editExpenseHandler=async(e)=>{
        e.preventDefault();
        //update expense details into backend and show it into frontend
        const expObj = {
            id : isEditing,
            amount : amountRef.current.value,
            description : descRef.current.value,
            category : categoryRef.current.value
        };
        setStatus('pending');
        const res = await axios.put(`${updateUrl}/${emailID}/${expObj.id}.json`, expObj);
        if(res.status===200)
        console.log('expense edited successfully');
        setStatus('completed');
        dispatch(expenseAction.addExpense(expObj));
        setIsEditing(false);
    }

    return(
        <Fragment>
        {
            status === 'pending' &&
            <LoadingSpinner/>
        }
        <Container>
        <Row>
        <Col className={`${classes.expenseForm} mt-3`} lg={5} md={6} sm={8} xs={12}>
        <Card className={`${classes2.shadow} p-3`} bg={theme==='dark'&& 'dark'}>
        <Form>
            <Form.Control aria-label = "amount" type="number" ref={amountRef} placeholder="Amount" className="mb-3"/>
            <Form.Control aria-label = "desc" type="text" ref={descRef} placeholder="Description" className="mb-3"/>
            <Form.Select aria-label="category" data-testid="cat" ref={categoryRef}>
            <option value='Bills'>Bills</option>
            <option value='Food'>Food</option>
            <option value='Loan'>Loan</option>
            <option value='healthcare'>healthcare</option>
            <option value='entertainment'>entertainment</option>
            <option value='others'>Others</option>
            </Form.Select>
            {
                !isEditing &&
                <Button type='submit' variant = "danger" onClick={submitExpenseHandler} className="mt-2">
                Add Expense
                </Button> 
            }
            {
                isEditing &&
                <Button type='submit' variant="danger" onClick={editExpenseHandler} className="mt-2">
                Edit Expense
                </Button>
            }   
        </Form>
        </Card>
        </Col>
        </Row>
        <Row>
        <Col className={`${classes.expenseForm} mt-3`} lg={5} md={6} sm={8} xs={12} >
        <ExpenseList expenses = {expenseList} editExpense={editExpense}/>
        </Col>
        </Row>
        {show && <CustModal message = {alert} handleClose = {handleClose}/>}
        </Container>
        </Fragment>
    )
};
export default memo(ExpenseForm);