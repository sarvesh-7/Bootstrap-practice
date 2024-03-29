import classes from './Welcome.module.css';
import {Link} from 'react-router-dom';
import React,{Fragment,memo} from 'react';
import Logout from './Logout';
import ExpenseForm from '../Components/Expenses/ExpenseForm';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {themeAction} from '../store/Theme';
import Button from 'react-bootstrap/Button';
import classes2 from '../Components/UI/common_css.module.css';


const Welcome = (props) => {
  
    const token = useSelector((state)=>state.auth.token);
    const fullName = useSelector((state)=>state.auth.fullName);
    const profilePhoto = useSelector((state)=>state.auth.profilePhoto);
    const isPremiumAc = useSelector((state)=>state.premium.isPremiumAc);
    const expenses = useSelector((state)=>state.expense.expenseList);

    const dispatch = useDispatch();

    const verifyEmailUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc';

    //verify user's email address
    const verifyEmailHandler=async(e)=>{
        try
        {
            const res = await axios.post(verifyEmailUrl, 
                {
                    requestType : 'VERIFY_EMAIL',
                    idToken : token
                });
                if(res.status===200){
                    alert('Email verification link has been sent to your email address');
                    console.log(res);
                }
                else{
                    alert('Email verification failed');
                    console.log(res);
                }  
        }
        catch(error){
            console.log(error);
        }
      
    }

    const changeThemeHandler = ()=>{
        dispatch(themeAction.toggleTheme()); 
     };

     const makeCSV = (rows)=>{
        return rows.map(r=>r.join(',')).join('\n');
    }

    let expenseData;
    let data;
    let blob;

    if(expenses && expenses.length>0)
    {
        expenseData = expenses.map((expense)=>{
            return [expense.amount, expense.description, expense.category];
        });
        data = [['Amount', 'Description' , 'Category'],...expenseData];

       blob = new Blob([makeCSV(data)]);
       console.log(blob);
       console.log(expenseData);
    }
    

    

    return (
        <Fragment>
            <Navbar collapseOnSelect bg="secondary" variant="dark" expand='lg' className={classes2.shadow}>
            <Container fluid>
             <Navbar.Brand href="/">Welcome to Expense Tracker!!
             </Navbar.Brand>
             <Navbar.Text>
             {
            fullName && profilePhoto ?
            <span>
                Your profile is completed &nbsp;
                <Link to={`/profile`}>Edit profile</Link> 
            </span>
            :
            <span>
            Your profile is incomplete  
            <Link to={`/profile`}>Complete now</Link> 
            </span>
             
        }
        </Navbar.Text>
             <Navbar.Toggle aria-controls="navLinks" />
                 <Navbar.Collapse id="navLinks" className={classes['right-aligned']}>
                     <Nav>
                         <Nav.Link href="#">
                         <Button variant="secondary" onClick={verifyEmailHandler} className={classes.navLinks}>Verify Email</Button>
                         </Nav.Link>

                         <Nav.Link href="#">
                             <Logout/>
                         </Nav.Link>
                         {
                             isPremiumAc && 
                             <>
                             <Nav.Link download = "expense.csv" href = {URL.createObjectURL(blob)} type='click'>
                                <Button variant="secondary" type ='click' className={classes.navLinks}> 
                                <i class="fa fa-download"></i> {}
                                Expense report
                                </Button>
                            </Nav.Link>
                        
                            <Nav.Link href="#">
                                <Button variant="secondary" type='click' onClick={changeThemeHandler} className={classes.navLinks}>
                                <i class="fa fa-toggle-on"></i>{}Change theme
                                </Button>
                            </Nav.Link>
                            </>
                         }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <ExpenseForm/>
        </Fragment>
    )
}
export default memo(Welcome);
