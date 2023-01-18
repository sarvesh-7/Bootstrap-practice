import AuthContext from './AuthContext';
import React,{useState,useEffect} from 'react';
import axios from 'axios';

const AuthContextProvider = (props)=>{

    //state to check user authentication
    const[isLoggedin,setIsLoggedIn] = useState();

    //states for user profile
    const[fullName,setFullName] = useState('');
    const[profilePhoto,setProfilePhoto] = useState('');

    const token = localStorage.getItem('expense_token');
    const email = localStorage.getItem('expense_email');

    //check if user has loggedin or not i.e to make login persistant after refresh
    useEffect(()=>{
        if(token){
            setIsLoggedIn(true);
        }
    },[token]);

    //get user profile details from firebase
    const getProfileUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc';
    useEffect(()=>{
        async function fetchProfile()
        {
            if(token){
                try{
                    const res = await axios.post(getProfileUrl, {idToken : token} );
                        if(res){
                            setFullName(res.data.users[0].displayName);
                            setProfilePhoto(res.data.users[0].photoUrl);
                        }
                        else{
                            console.log(res);
                        } 
                }
                catch(error){
                    console.log(error);
                }
            }   
        }
        fetchProfile();    
    },[token]);

    //update user token
    const updateAuthInfo = (token,email)=>{

        //update token in local storage and update state
        localStorage.setItem('expense_token', token);
        localStorage.setItem('expense_email', email);
        if(token==='' && email==='')
        setIsLoggedIn(false);
        else
        setIsLoggedIn(true);
    }

    //update user profile
    const updateProfile=(name,profileUrl)=>{
        setFullName(name);
        setProfilePhoto(profileUrl);
    }

    const authCtx = {
        token:token,
        email:email,
        isLoggedin : isLoggedin,
        updateAuthInfo:updateAuthInfo,
        fullName : fullName,
        profilePhoto : profilePhoto,
        updateProfile : updateProfile
    };

    return(
        <AuthContext.Provider value={authCtx}>
            {props.children}
        </AuthContext.Provider>
    )
};
export default AuthContextProvider;