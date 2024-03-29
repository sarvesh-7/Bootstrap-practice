import Button from 'react-bootstrap/Button';
import {themeAction} from '../../store/Theme';
import { useDispatch,useSelector } from 'react-redux';
import {useState, Fragment, useEffect} from 'react';
import {premiumAction} from '../../store/Premium';
import CustModal from '../UI/Modal';


const PremiumFeatures = (props)=>{

    const[show,setShow] = useState();
    const[alert,setAlert] = useState();

    const closeModal = ()=>setShow(false);

    const dispatch = useDispatch();
    // const [isPremium,setIsPremium] = useState(false);
    const isPremium = useSelector((state)=>state.premium.isPremiumAc);

    useEffect(()=>{
        if(localStorage.getItem('premium_ac')==='true')
        {
            dispatch(premiumAction.activatePremiumAc());
        }  
    },[dispatch]);
    

const onClickHandler = ()=>{ 
    if(isPremium){
        
        localStorage.setItem('premium_ac', false);
        dispatch(premiumAction.deactivatePremiumAc());
        dispatch(themeAction.offTheme());  
    }
    else{
        localStorage.setItem('premium_ac', true);
        dispatch(premiumAction.activatePremiumAc()); 
        setAlert('Premium features activated! Check the features from Menubar');
        setShow(true);
    }
    console.log(isPremium);
}


    return(
        <Fragment>
        {!isPremium && <Button variant="danger" size="sm" type ='click' onClick={onClickHandler}>
            Activate Premium 
            </Button>
        }
        {
        isPremium && 
        <Button variant="danger" type ='click' onClick={onClickHandler}>
            Deactivate Premium 
        </Button>
        }
        {show && <CustModal message = {alert} handleClose={closeModal}/>}
        </Fragment>
    );
};
export default PremiumFeatures;