import React,{Fragment,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
// import Button from '../Components/UI/Button';
import classes from './Profile.module.css';
import {useSelector,useDispatch} from 'react-redux';
import {authAction} from '../store/Auth';
import LoadingSpinner from '../Components/UI/LoadingSpinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';

const Profile = (props)=>{

    const dispatch = useDispatch();
    const fullName = useSelector((state)=>state.auth.fullName);
    const profilePhoto = useSelector((state)=>state.auth.profilePhoto);
    const token = useSelector((state)=>state.auth.token);
    const fullNameRef = useRef();
    const profileUrlRef = useRef();

    const[status,setStatus] = useState();

    //path to update user profile in firebase
    const updateProfileUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc';

    //update user profile in firebase
    const updateProfileHandler = (e)=>{
        e.preventDefault();
        setStatus('pending');
        const fullName = fullNameRef.current.value;
        const profileUrl = profileUrlRef.current.value;

            axios.post(updateProfileUrl,
            {
                idToken : token,
                displayName : fullName,
                photoUrl : profileUrl,
                returnSecureToken : true
            })
            .then((res)=>
            {
                setStatus('completed');
                alert('Profile updated successfully');
                dispatch(authAction.updateProfile({name : fullName, profileUrl : profileUrl}));
            })
            .catch((error)=>{
                alert('Error while updating profile details');
                setStatus('completed');
                console.log(error);
            })
    }

    return(
        <Container fluid>
            <Row className="mt-2">
                <Col>Winners never quite,quitters never win</Col>
                {
                !fullName && !profilePhoto &&
                <Col sm={6} xs={12}>
                <p className={classes.profile}>Your profile is 64% complete.</p>
                <Link to='/profile'>Complete now</Link> 
                </Col>
                }
                {
                fullName && profilePhoto &&
                <Col sm={6} xs={12}>
               <p className={classes.profile}>Your profile is now completed.</p>
                </Col>
                }
            </Row>
            <hr/>
        <Row className="mt-2">
            <Col lg={6} md={7} sm={8} xs={10} className={classes.contactForm}>
                <Card className="p-2">
            <Form>
                <Form.Label className="mt-2"><i className="fa fa-github"></i> {}Full Name</Form.Label>
                <Form.Control className="mt-2" type="text" ref={fullNameRef} defaultValue={fullName} required/>
                <Form.Label className="mt-2"><i className="	fa fa-upload"></i> {}Profile Photo URL</Form.Label>
                <Form.Control className="mt-2" type='url' id='profile_url' ref={profileUrlRef} defaultValue={profilePhoto} required/>
                <Button type='submit' size="sm" className="mt-2" variant="danger" onClick={updateProfileHandler}>Update</Button> 
            </Form>
            </Card>
            </Col>
        </Row>
        </Container>


    /* <label forhtml='full_html'> */
        //     <i className="fa fa-github"></i> {}Full Name</label>
        //     <input type='text' id='full_html' ref={fullNameRef} defaultValue={fullName} required/>
        //     <label forhtml='profile_url'>
        //     <i className="	fa fa-upload"></i> {}Profile Photo URL</label>
        //     <input type='url' id='profile_url' ref={profileUrlRef} defaultValue={profilePhoto} required/>
        //     <Button type='submit' onClick={updateProfileHandler} className={classes.update}>Update</Button>  

        // {/* // <Fragment>
        // <div className={`${classes.welcome} font-italic`}>
        // <p>Winners never quite,quitters never win.</p> */}
        // {
        //     !fullName && !profilePhoto &&
        //     <Fragment>
        //     <p className={classes.profile}>Your profile is 64% complete.
        //     <Link to='/profile'>Complete now</Link> 
        //     </p>
        //     </Fragment>
        // }
        // {
        //     fullName && profilePhoto &&
        //     <p className={classes.profile}>
        //     Your profile is now completed.
        //     </p>
        // }
        // </div>
        // <hr/>
        // {
        //     status==='pending' &&
        //     <div className={classes.spinner}><LoadingSpinner/></div>
        // }
        // {
        //     status!=='pending' &&
        //     <div className={classes.main}>
        // <div className={classes.formHeader}>
        //     <span>Contact Details</span>
        //     <Button className={classes.cancel}>Cancel</Button>
        // </div>
        // <form className={classes.contactForm}> 
        //     <label forhtml='full_html'>
        //     <i className="fa fa-github"></i> {}Full Name</label>
        //     <input type='text' id='full_html' ref={fullNameRef} defaultValue={fullName} required/>
        //     <label forhtml='profile_url'>
        //     <i className="	fa fa-upload"></i> {}Profile Photo URL</label>
        //     <input type='url' id='profile_url' ref={profileUrlRef} defaultValue={profilePhoto} required/>
        //     <Button type='submit' onClick={updateProfileHandler} className={classes.update}>Update</Button>  
        // </form>
        // </div>
        // }
        // </Fragment>
    );
}
export default Profile;