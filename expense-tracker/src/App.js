import './App.css';
import AuthForm from './Components/Auth/AuthForm';
import Header from './Components/Auth/Header';
import {Route,Routes,Navigate} from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Contact from './Pages/Contact';
import AuthContext from './Components/Store/AuthContext';
import {useContext,Fragment,useEffect} from 'react';
import ForgotPassword from './Components/Auth/ForgotPassword';
import {useDispatch,useSelector} from 'react-redux';
import {authAction} from './store/Auth';
import axios from 'axios';
import { expenseAction } from './store/Expense';


function App() {

  //get theme
  const theme = useSelector((state)=>state.theme.theme);

  //firebase database URL path
const url = 'https://expense-tracker-d3062-default-rtdb.firebaseio.com';

  const dispatch = useDispatch();
  const isLoggedin = useSelector((state)=>state.auth.isLoggedin);

    const token = localStorage.getItem('exp_token');
    const email = localStorage.getItem('exp_email');

    //get user's email address
    const convertedEmail= useSelector(state=>state.auth.email);

    //check if user has loggedin or not i.e to make login persistant after refresh
    useEffect(()=>{
        if(token){
            dispatch(authAction.updateAuthInfo({token,email}));

        }
    },[token,email,dispatch]);

        //get all expenses from database
        useEffect(()=>{
          async function getData(){
            if(convertedEmail)
            {
            try
            {
              const res = await axios.get(`${url}/${convertedEmail}.json`);
    
              if(res.status===200)
              {
                  // console.log(res);
                  const data = res.data;
                  let exp_list = [];
                  let exp_total_amt = 0;
                  for(const key in data)
                  {
                    const expObj = {
                          id : key,
                          amount : data[key].amount,
                          description : data[key].description,
                          category : data[key].category 
                      }
                  exp_list.push(expObj);
                  }
                  exp_list.forEach((expense)=>exp_total_amt += +expense.amount ) ;
                  dispatch(expenseAction.getExpenses({expList : exp_list, totalAmt : exp_total_amt}));
                }       
            }
           catch(e){
            alert('could not fetch data from database due to some technical error');
           }
            }  
              };
          getData();
        },[dispatch,convertedEmail,url]);

    //get user profile details from firebase
    const getProfileUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc';
    useEffect(()=>{
        async function fetchProfile()
        {
            if(token){
                try{
                  console.log(token);
                 
                    const res = await axios.post(getProfileUrl, {idToken : token} );
                        if(res){
                          const fullName = res.data.users[0].displayName;
                          const profilePhoto = res.data.users[0].photoUrl;
                            dispatch(authAction.updateProfile({name : fullName, profileUrl : profilePhoto}));
                        }
                        else{
                          alert('Something went wrong..');
                        } 
                }
                catch(error){
                    alert('Something went wrong..');
                }
            }   
        }
        fetchProfile();    
    },[token,getProfileUrl,dispatch]);


  const authCtx = useContext(AuthContext);

  //if theme is dark then assign dark theme css class to app div
  let themeClass;
  if(theme==='dark')
    document.body.className='dark-theme';
    else
    document.body.className='light-theme';


  return (
    <div className='app'>
      <Routes>
      {
        isLoggedin &&
        <Fragment> 
        <Route path='/' element={<Navigate to = '/welcome' replace={true}/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/profile' element={<Contact/>}/>
        </Fragment>
      }
      {
        !isLoggedin && <Route path = '/' element={<Fragment><Header/><AuthForm/></Fragment>}/>
      }
      {
        !isLoggedin && <Route path='*' element={<Navigate to = '/' replace={true}/>}/>
      }
      {
        !isLoggedin && <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
      }  
      {
        isLoggedin && <Route path='*' element={<p>404 not found</p>}/>
      } 
      </Routes>
    </div>
  );
}

export default App;
