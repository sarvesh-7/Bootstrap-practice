import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux';
import {authAction} from '../store/Auth';
import {memo} from 'react';
import classes from './Welcome.module.css';

const Logout = (props)=>{

    const dispatch = useDispatch();

    //clear authtoken and email from local storage and go to login page
    const logoutHandler = (e)=>{
        localStorage.removeItem('exp_token');
        localStorage.removeItem('exp_email');
        dispatch(authAction.updateAuthInfo({token:'',email:''}));
    }
    return(
        <Button variant="secondary" onClick={logoutHandler} className={classes.navLinks}>Logout</Button>
    )
};
export default memo(Logout);