import {createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";




// reset

const resetVarificationAction = createAction("account/varify-reset")
const passwordResetAction = createAction("account/pass-reset")




// send email action


export const accountVarificationSendTokenAction = createAsyncThunk('account/token', async (email, {rejectWithValue, getState, dispatch  })=>{

    //console.log(email);
    
    try {

        // auth token
      const user = getState()?.users;
            
    const {userAuth} = user;

    const config = {
        headers :{
            Authorization : `Bearer ${userAuth?.token}`

        }
    }

        const {data} = await axios.post(`${baseUrl}/api/users/generate-verify-email-token`,{},  config)
        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }


})



// send email action


export const verifyAccountAction = createAsyncThunk('account/varify', async (varificationToken, {rejectWithValue, getState, dispatch  })=>{

   
    
    try {

        // auth token
      const user = getState()?.users;
            
    const {userAuth} = user;

    const config = {
        headers :{
            Authorization : `Bearer ${userAuth?.token}`

        }
    }

        const {data} = await axios.put(`${baseUrl}/api/users/verify-account`,{
            token: varificationToken 
            },  config)


            dispatch(resetVarificationAction())
        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)       
        }
    })


// send email password reset action


export const emailPasswordTokenAction = createAsyncThunk('account/password-token', async (email, {rejectWithValue, getState, dispatch  })=>{

    //console.log(email);
    
    try {
       

        const {data} = await axios.post(`${baseUrl}/api/users/forget-password-token`,{email: email?.email })
        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }


})


// send email action


export const resetPasswordAction = createAsyncThunk('account/reset-password', async (userData, {rejectWithValue, getState, dispatch  })=>{

    //console.log(userData);   
    
    try {     

        const {data} = await axios.put(`${baseUrl}/api/users/reset-password`,{
            token:  userData?.token,
            password: userData?.values?.password, })


            dispatch(passwordResetAction())
        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }
})

const accountVarificationSlice = createSlice({
    name: 'emails',
    initialState: {},
    extraReducers: (builder) => {
    builder

        .addCase(accountVarificationSendTokenAction.pending, (state, action)=>{
            state.loading= true
            state.appErr = undefined
            state.serverErr = undefined
        })
        //.addCase(resetSendEmailAction, (state, action)=>{
        //    state.isEmailSent = true
        //})
        .addCase(accountVarificationSendTokenAction.fulfilled, (state, action)=>{
            state.loading= false
            state.token = action?.payload
            
            state.appErr = undefined
            state.serverErr = undefined
        })

        .addCase(accountVarificationSendTokenAction.rejected, (state, action)=>{
            state.loading = false
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message
        })

        // varify

        .addCase(verifyAccountAction.pending, (state, action)=>{
            state.loading= true
            
            state.appErr = undefined
            state.serverErr = undefined
        })
        .addCase(resetVarificationAction, (state, action)=>{
            state.isVarified = true
        })
        .addCase(verifyAccountAction.fulfilled, (state, action)=>{
            state.loading= false
            state.verifiedProfile = action?.payload
            state.isVarified = false
            
            state.appErr = undefined
            state.serverErr = undefined
        })

        .addCase(verifyAccountAction.rejected, (state, action)=>{
            state.loading = false
            
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message
        })

        //emailPasswordToken

        .addCase(emailPasswordTokenAction.pending, (state, action)=>{
            state.loading= true
            state.appErr = undefined
            state.serverErr = undefined
        })
       
        .addCase(emailPasswordTokenAction.fulfilled, (state, action)=>{
            state.loading= false
            state.passwordResetToken = action?.payload
            
            state.appErr = undefined
            state.serverErr = undefined
        })

        .addCase(emailPasswordTokenAction.rejected, (state, action)=>{
            state.loading = false
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message
        })

        // password reset

        .addCase(resetPasswordAction.pending, (state, action)=>{
            state.loading= true
            
            state.appErr = undefined
            state.serverErr = undefined
        })
        .addCase(passwordResetAction, (state, action)=>{
            state.isPasswordReseted = true
        })
        .addCase(resetPasswordAction.fulfilled, (state, action)=>{
            state.loading= false
            state.passwordReset = action?.payload
            state.isPasswordReseted = false
            
            state.appErr = undefined
            state.serverErr = undefined
        })

        .addCase(resetPasswordAction.rejected, (state, action)=>{
            state.loading = false
            
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message
        })



    
    
    }

})


export default accountVarificationSlice.reducer