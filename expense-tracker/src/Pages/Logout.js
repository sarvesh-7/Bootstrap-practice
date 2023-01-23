import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {authAction} from '../store/Auth';
import {themeAction} from '../store/Theme';

const Logout = ()=>{

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //clear authtoken and email from local storage and go to login page
    const logoutHandler = (e)=>{
        localStorage.removeItem('exp_token');
        localStorage.removeItem('exp_email');
        dispatch(authAction.updateAuthInfo({token:'',email:''}));
        dispatch(themeAction.offTheme());
    }
    return(
        <Button variant="secondary" onClick={logoutHandler} >Logout</Button>
    )
};
export default Logout;