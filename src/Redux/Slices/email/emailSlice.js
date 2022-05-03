import {createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";




// reset

const resetSendEmailAction = createAction("email/reset")



// send email action


export const sendEmailToUserAction = createAsyncThunk('email/sendEmail', async (email, {rejectWithValue, getState, dispatch  })=>{

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

        const {data} = await axios.post(`${baseUrl}/api/email`, {
            to: email?.recipientEmail,
            message: email?.message,
            subject: email?.subject
        }, config)

       dispatch(resetSendEmailAction())
        

        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }


})


const emailSlice = createSlice({
    name: 'emails',
    initialState: {},
    extraReducers: (builder) => {
    builder

        .addCase(sendEmailToUserAction.pending, (state, action)=>{
            state.loading= true
            state.appErr = undefined
            state.serverErr = undefined
        })
        .addCase(resetSendEmailAction, (state, action)=>{
            state.isEmailSent = true
        })
        .addCase(sendEmailToUserAction.fulfilled, (state, action)=>{
            state.loading= false
            state.emailSent = action?.payload
            state.isEmailSent = false
            state.appErr = undefined
            state.serverErr = undefined
        })

        .addCase(sendEmailToUserAction.rejected, (state, action)=>{
            state.loading = false
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message
        })
    
    
    }

})


export default emailSlice.reducer