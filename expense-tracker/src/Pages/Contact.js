import React,{useContext, useEffect, useState} from "react";
// import ExpenseContext from "../store/expense-context";
import {authAction} from '../store/Auth';
import Profile from "./Profile";
import SavedProfile from "./SavedProfile";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
const Contact =()=>
{
    const [contactPage,setContactPage]=useState(null)
    const token=useSelector(state=>state.auth.token);
   
    // const expctx=useContext(ExpenseContext)
    const dispatch = useDispatch();
    const tokenObj = {
        idToken: token,
      };
    
      useEffect(() => {
        async function getData() {
          try {
            const res = await axios.post(
              "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc",
              tokenObj,
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            try {
                
              console.log(res.data.users[0]);
                const details=res.data.users[0]
                // expctx.userDetails({name:details.displayName,url:details.photoUrl})
                dispatch(authAction.updateProfile({name:details.displayName, profileUrl : details.photoUrl}));
                if(details.displayName && details.photoUrl )
                {
                  setContactPage(false)
                }
                else{
                  setContactPage(true)
                }
        
            } catch (err) {
              console.log(err);
            }
          } catch (err) {
            console.log(err);
          }
        }
        getData();
      }, []);

      const editButtonhandler=()=>
      {
        setContactPage(true)
      }


    return(<React.Fragment>
      {contactPage===true && <Profile />}
      { contactPage===false && <SavedProfile editButton={editButtonhandler} />}
    </React.Fragment>)
}
export default Contact