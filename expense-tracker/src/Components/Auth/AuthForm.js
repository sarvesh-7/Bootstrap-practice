import React,{useState,useRef, Fragment} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import classes from './AuthForm.module.css';
import classes2 from '../UI/common_css.module.css';
import {useDispatch,useSelector} from 'react-redux';
import {authAction} from '../../store/Auth';
import LoadingSpinner from '../UI/LoadingSpinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustModal from '../UI/Modal';

const AuthForm = (props) => {

  const dispatch = useDispatch();
  const theme = useSelector(state=>state.theme.theme);

  const navigate = useNavigate();
    //state to toggle between login/signup function
    const [isLogin,setIsLogin] = useState(false);

     //state to show sending request loader
    const[isSendingReq, setIsSendingReq] = useState(false);
    const[status,setStatus] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

      //alert message
      const[alert,setAlert] = useState('');

    //get entered email and password
    const emailRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();


    //switch between login/signeup
        const switchAuthModeHandler = () => {
            setIsLogin((prevState) => !prevState);
            emailRef.current.value = '';
            passwordRef.current.value = '';
            confPasswordRef.current.value = '';
        };


    //submit user details to create account/login
    const onSubmitHandler=async(e)=>{
        e.preventDefault();

        //get email and password entered on screen
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
       

        //if user is trying to signup
        if(!isLogin){

          const confPasword = confPasswordRef.current.value;

            //check if all fields are not empty
            if(email===''||password===''||confPasword==='')
            {
                setAlert('All fields are mandatory');
                setShow(true);
            }

            else if(password!==confPasword)
            {
                setAlert('Please enter same confirmation password');
                setShow(true);
            }

            //check if password and email has valid format and then create new user in firebase
            else
            {
                try{
                  setStatus('pending');
                    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc',
                  {
                    method:'POST',
                    body: JSON.stringify({
                      email:email,
                      password:password,
                      returnSecureToken:true
                    }),
                    header:{
                      'Content-Type':'application/json'
                    }
                  });
                  if(res.ok){
                    //when succesfully created account
                    setIsSendingReq(false);
                    setStatus('completed');
                    setAlert('User created successfully');
                    setShow(true);
                  }
                  else{
                    //when account creation failed due to same email or weak password etc
                    const data = await res.json();
                    console.log(data.error.message);
                    setAlert(data.error.message);
                    setIsSendingReq(false);
                    setStatus('completed');
                    setShow(true);
                  }
                  }
                  catch(error){
                    console.log(error);
                    setIsSendingReq(false);
                    setStatus('completed');
                  }
            }
        }
        //if user is trying to login
        else
        {
          
            //check if all fields are not empty
            if(email===''||password==='')
            {
                setAlert('All fields are mandatory');
                setShow(true);
            }
            else{
            try{
              setStatus('pending');
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc',
              {
                method:'POST',
                body: JSON.stringify({
                  email:emailRef.current.value,
                  password:passwordRef.current.value,
                  returnSecureToken:true
                }),
                header:{
                  'Content-Type':'application/json'
                }
              });
              if(res.ok){
                //if credential matches
                setStatus('completed');
                setIsSendingReq(false);
                setAlert('User authenticated successfully');
                setShow(true);
                const data = await res.json();
                const convertedEmail = emailRef.current.value.replace(/['@.']/g,'');
                localStorage.setItem('exp_token', data.idToken);
                localStorage.setItem('exp_email', convertedEmail);

                
                dispatch(authAction.updateAuthInfo({token : data.idToken, email : convertedEmail}));
              }
              else{
                //if credentials are wrong
                setStatus('completed');
                const data = await res.json();
                setAlert(data.error.message);
                setIsSendingReq(false);
                setShow(true);
            }
          }
            catch(error){
              //do something
              setStatus('completed');
              console.log(error.message);
              setIsSendingReq(false);
            }
        }
      }
    }
    return (
      <>
      {
        status === 'pending' &&
        <LoadingSpinner/>
        }
      <Container fluid className='mt-5'>
        <Row>
        <Col className={classes.authForm } lg={4} sm={8} md={5} xs={11}>
        <Card bg={theme==='dark'&& 'dark'} className={`${classes2.shadow} p-2 `}>
        { !isLogin && <Card.Title className="m-auto">Sign up</Card.Title>}
        { isLogin && <Card.Title className="m-auto">Login</Card.Title>}
        
        <Card.Body>
        <Form> 
            <Form.Group> 
                <Form.Control size="sm" className="mb-3" ref={emailRef} type="email" placeholder="Email"/>
                <Form.Control size="sm" className="mb-3" ref={passwordRef} type="password" placeholder="Password"/>
                {!isLogin &&  <Form.Control size="sm" className="mb-3" ref={confPasswordRef} type="password" placeholder="Confirm Password"/>}
                {isLogin && <Link to='/ForgotPassword'>Forgot password</Link>}
                <div className="d-grid gap-2 mt-2">
                {
                  !isLogin && 
                  <Button type="Submit" onClick={onSubmitHandler} variant="danger"  className="rounded-pill" >Sign up</Button>
                }
                {
                  isLogin && <Button type="Submit" onClick={onSubmitHandler} variant="danger" className="rounded-pill">Login</Button>
                }
               
                </div>
            </Form.Group>
        </Form>
        </Card.Body>
        </Card>
        <Card className={`${classes.card} mt-2`}>
        { !isLogin && <Button data-testid="auth-btn" onClick={switchAuthModeHandler} variant="danger" className={classes2.shadow} >Have an account?Login</Button> }
        { isLogin && <Button data-testid="auth-btn" onClick={switchAuthModeHandler} variant="danger" className={classes2.shadow} >Dont Have an account?Signup</Button> }
        </Card>
        </Col>
        </Row>
        {show && <CustModal message = {alert} handleClose = {handleClose}/>}
        </Container>
        </>
    )
}
export default AuthForm;
