import classes from '../UI/LoadingSpinner.module.css';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useRef,useState } from 'react';
import {useSelector} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes2 from '../UI/common_css.module.css';
import classes1 from './ForgotPassword.module.css';

const ForgotPassword = ()=>{

    //get user email id to send password reset link
    const emailRef = useRef();

    //check if request is pending or completed
    const[status,setStatus] = useState('');

    //alert message
    // const[alert,setAlert] = useState('');

    const theme = useSelector(state=>state.theme.theme);
    

    //reset password URL
    const resetPasswordUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc';

    //reset password using link sent on email ID
    const resetPasswordHandler = async(e)=>{

        e.preventDefault();
        if(emailRef.current.value==='')
        {
            alert('Email field cannot be empty');
            // setAlert('Email field cannot be empty');
            return;
        }
        setStatus('pending');
        try{
            const res = await axios.post(resetPasswordUrl,
                {
                    requestType:'PASSWORD_RESET',
                    email: emailRef.current.value
                });
                
                if(res.status===200){
                    alert('Password reset link has been sent on the entered email');
                    // setAlert('Password reset link has been sent on the entered email');
                    setStatus('completed');
                }
                else{
                    alert('Error while processing request');
                    // setAlert('Error while processing request');
                    setStatus('completed');
                }
        }
        catch(error){
            alert('Something went wrong! Please try again.');
            // setAlert('Something went wrong! Please try again.');
            setStatus('completed');
        }    
    }

        // setTimeout(()=>{
        //     setAlert('');
        // },2000)

    return(
        <>
        {
            status === 'pending' &&
            <LoadingSpinner/>
            }
        <Container fluid>
    <Row>
    <Col lg={5} xs={11} className={`mt-5`} style={{margin:'auto'}}>
    <Card border='danger' bg={theme==='dark'&& 'dark'} className={` ${classes2.shadow} p-3`}>
        <Form>
        <Form.Label forhtml='email'>Enter the email with which you have registered</Form.Label>
        <Form.Control type='email' id='email' placeholder='email' ref={emailRef}/>
        <Button variant="danger" className="mt-3" onClick={resetPasswordHandler}>Send Link</Button>
        </Form>
    </Card>
    </Col>
    </Row>
    {
        status==='pending' && <div className={classes.spinner}><LoadingSpinner/></div>
    } 
    {/* {alert && <div class={classes1.message}>{alert}</div>} */}
    </Container>
    </>
    )
};
export default ForgotPassword;