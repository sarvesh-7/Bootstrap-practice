import {createSlice} from '@reduxjs/toolkit';

const initialAuthState = {
   isLoggedin : false,
   token: '',
   email:'',
   fullName:'',
   profilePhoto:''
}

const authSlice = createSlice({
    name : 'auth',
    initialState : initialAuthState,
    reducers : {
        updateAuthInfo(state,action)
        {
             //update token & email in local storage and update state
             const token = action.payload.token;
             const email = action.payload.email;
                

                if(!token && !email)
                state.isLoggedin = false;
                else
                state.isLoggedin = true;

                state.token = token;
                state.email = email;
        },
        updateProfile(state,action){
            state.fullName = action.payload.name;
            state.profilePhoto = action.payload.profileUrl;
        }
    }
});

export const authAction = authSlice.actions;
export default authSlice.reducer;