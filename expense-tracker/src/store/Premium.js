import {createSlice} from '@reduxjs/toolkit'; 

const initialPremiumState = {
    isPremiumAc : false
};

const premiumSlice = createSlice({
    name : 'premium',
    initialState : initialPremiumState,
    reducers : {
        activatePremiumAc(state){
          state.isPremiumAc = true;  
        },
        deactivatePremiumAc(state){
            state.isPremiumAc = false;
        }
    }
});

export default premiumSlice.reducer;
export const premiumAction = premiumSlice.actions;