import {createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";





// action to redirect

const resetPhotoUploadAction = createAction('users/upload-reset')
const resetUpdateProfileAction = createAction('users/update-reset')
const resetPasswordAction = createAction('users/updatePassword-reset')






// register action

export const registerUserAction = createAsyncThunk('users/resister', async (user, {rejectWithValue, getState, dispatch  })=>{
    try {

        // http call
        const config = {
            Headers:{
                'Content-Type':  'application/json'
            }
        }

        const {data} = await axios.post(`${baseUrl}/api/users/register`, user, config)

        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }


})


// login action

export const loginUserAction = createAsyncThunk('users/login', async (user, {rejectWithValue, getState, dispatch  })=>{
        const config = {
            headers:{
                'Content-Type':  'application/json'
            }
        }
    try {
        // http call

        const {data} = await axios.post(`${baseUrl}/api/users/login`, user, config)
    // save user into local storage

    localStorage.setItem('userInfo', JSON.stringify(data))

        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        localStorage.removeItem('userInfo')
        return rejectWithValue(error?.response?.data)
        
    }


})

// profole 

export const userProfileAction = createAsyncThunk('user/profile', async(userId, {rejectWithValue, getState, dispatch} )=>{

 
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
       
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        
      },
    };

    
    
    try {

        const {data} = await axios.get(`${baseUrl}/api/users/profile/${userId}`,  config)

        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }

})


// fetch all users 

export const fetchAllUsersAction = createAsyncThunk('user/allUsers', async(users, {rejectWithValue, getState, dispatch} )=>{

 
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
       
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        
      },
    };

    
    
    try {

        const {data} = await axios.get(`${baseUrl}/api/users/`,  config)

        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }

})




// block a user

export const blockUserAction = createAsyncThunk('user/block', async(id, {rejectWithValue, getState, dispatch} )=>{

    
    

 
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
       
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        
      },
    };

    
    
    try {

        const {data} = await axios.put(`${baseUrl}/api/users/block-user/${id}`,{},  config)

        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }

})

// unblock a user

export const unblockUserAction = createAsyncThunk('user/unblock', async(id, {rejectWithValue, getState, dispatch} )=>{

    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
       
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        
      },
    };

    
    
    try {

        const {data} = await axios.put(`${baseUrl}/api/users/unblock-user/${id}`,{},  config)

        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }

})







// profole photo upload 

export const profilePhotoUploadAction = createAsyncThunk('user/profile-photo', async(userImg, {rejectWithValue, getState, dispatch} )=>{

    //console.log(userImg);
    

 
    //get user token
    const users = getState()?.users;
    const { userAuth } = users;
       
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        
      },
    };


    const formData = new FormData()

    formData.append("image", userImg?.image);

    
    
    try {

        const {data} = await axios.put(`${baseUrl}/api/users/profile-photo-upload`, formData,   config)


        dispatch(resetPhotoUploadAction())

        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }

})



// update profile action

export const updateUserProfileAction = createAsyncThunk('users/update', async (user, {rejectWithValue, getState, dispatch  })=>{

    //console.log(user);
    
    //get user token
    const users = getState()?.users;
    const { userAuth } = users;
    
    

           const config = {
            headers:{
                //'Content-Type':  'application/json',
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
      // http call  
    try {       

        const {data} = await axios.put(`${baseUrl}/api/users`, {
            email: user?.email,
            lastName: user?.lastName,
            firstName: user?.firstName,
            bio: user?.bio,
        }, config)

        dispatch(resetUpdateProfileAction())

        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }


})

// update profile action

export const updatePasswordAction = createAsyncThunk('users/updatePassword', async (password, {rejectWithValue, getState, dispatch  })=>{

    //console.log(password);
    
    //get user token
    const users = getState()?.users;
    const { userAuth } = users;   
    

           const config = {
            headers:{
                //'Content-Type':  'application/json',
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
      // http call  
    try {       

        const {data} = await axios.put(`${baseUrl}/api/users/password`, {
            password: password?.password,
            
        }, config)

        dispatch(resetPasswordAction())

        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }


})


// follow profile action

export const followAUserAction = createAsyncThunk('users/follow', async (user, {rejectWithValue, getState, dispatch  })=>{

    //console.log(user);
    
    //get user token
    const users = getState()?.users;
    const { userAuth } = users;
    
    

           const config = {
            headers:{
                //'Content-Type':  'application/json',
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
      // http call  
    try {       

        const {data} = await axios.put(`${baseUrl}/api/users/follow`, { followId:user 
        }, config)

       

        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }


})

// follow profile action

export const unfollowAUserAction = createAsyncThunk('users/unfollow', async (user, {rejectWithValue, getState, dispatch  })=>{

    //console.log(user);
    
    //get user token
    const users = getState()?.users;
    const { userAuth } = users;
    
    

           const config = {
            headers:{
                //'Content-Type':  'application/json',
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
      // http call  
    try {       

        const {data} = await axios.put(`${baseUrl}/api/users/unfollow`, { unfollowId:user 
        }, config)

       

        return data
        
    } catch (error) {
        if(!error?.response){
            throw  error
        }
        return rejectWithValue(error?.response?.data)
        
    }


})



// logout action 

export const logoutAction = createAsyncThunk(
    '/user/logout',
    async (payload, {rejectWithValue, getState, dispatch})=>{
        try {
            localStorage.removeItem('userInfo')
            
        } catch (error) {
            if(!error?.response){
                throw error
            }
            return rejectWithValue(error?.response?.data)
            
        }
    }
)





// get user from local storage and place into store

const userLoadingFromStorage= localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


// slice

const usersSlice = createSlice({
     name: 'users',
     initialState: {
         userAuth: userLoadingFromStorage
      },
       /*extraReducers:{ // map notation
     
        [registerUserAction.pending] : (state, action)=>{
            state.loading= true
        } ,
        [registerUserAction.fulfilled] : (state, action)=>{
            state.loading = false
            state.registered = action?.payload
        } 


    }*/
    extraReducers: (builder) => {
    builder
    // register
      .addCase(registerUserAction.pending, (state, action) => {
        // action is inferred correctly here if using TS
        state.loading= true
        state.appErr = undefined
            state.serverErr = undefined
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(registerUserAction.fulfilled, (state, action) => {
           state.loading = false
            state.registered = action?.payload
            state.appErr = undefined
            state.serverErr = undefined
      })
      .addCase(registerUserAction.rejected, (state, action) => {
           state.loading = false
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message

      })


      // login

       .addCase(loginUserAction.pending, (state, action) => {
        // action is inferred correctly here if using TS
        state.loading= true
        state.appErr = undefined
            state.serverErr = undefined
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(loginUserAction.fulfilled, (state, action) => {
           state.loading = false
            state.userAuth = action?.payload
            state.appErr = undefined
            state.serverErr = undefined
      })
      .addCase(loginUserAction.rejected, (state, action) => {
           state.loading = false
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message

      })


      // profile

       .addCase(userProfileAction.pending, (state, action) => {
        // action is inferred correctly here if using TS
        state.loading= true
        state.appErr = undefined
            state.serverErr = undefined
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(userProfileAction.fulfilled, (state, action) => {
           state.loading = false
            state.profile = action?.payload
            state.appErr = undefined
            state.serverErr = undefined
      })
      .addCase(userProfileAction.rejected, (state, action) => {
           state.loading = false
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message

      })

      // all usera

       .addCase(fetchAllUsersAction.pending, (state, action) => {
        // action is inferred correctly here if using TS
        state.loading= true
        state.appErr = undefined
            state.serverErr = undefined
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(fetchAllUsersAction.fulfilled, (state, action) => {
           state.loading = false
            state.usersList = action?.payload
            state.appErr = undefined
            state.serverErr = undefined
      })
      .addCase(fetchAllUsersAction.rejected, (state, action) => {
           state.loading = false
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message

      })

      // block user

       .addCase(blockUserAction.pending, (state, action) => {
        // action is inferred correctly here if using TS
        state.loading= true
        state.appErr = undefined
            state.serverErr = undefined
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(blockUserAction.fulfilled, (state, action) => {
           state.loading = false
            state.block = action?.payload
            state.appErr = undefined
            state.serverErr = undefined
      })
      .addCase(blockUserAction.rejected, (state, action) => {
           state.loading = false
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message

      })

      // unblock user

       .addCase(unblockUserAction.pending, (state, action) => {
        // action is inferred correctly here if using TS
        state.loading= true
        state.appErr = undefined
            state.serverErr = undefined
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(unblockUserAction.fulfilled, (state, action) => {
           state.loading = false
            state.unblock = action?.payload
            state.appErr = undefined
            state.serverErr = undefined
      })
      .addCase(unblockUserAction.rejected, (state, action) => {
           state.loading = false
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message

      })


       // upload profile photo

       .addCase(profilePhotoUploadAction.pending, (state, action) => {
        
            state.loading= true
            
      })

        // reset  
        .addCase(resetPhotoUploadAction, (state, action)=>{
          state.isUploaded= true
        }) 
      
      .addCase(profilePhotoUploadAction.fulfilled, (state, action) => {
           state.loading = false
            state.profilePhoto = action?.payload
            state.isUploaded= false
            state.appErr = undefined
            state.serverErr = undefined
      })
      .addCase(profilePhotoUploadAction.rejected, (state, action) => {
           state.loading = false
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message

      })

      // update Profile
      .addCase(updateUserProfileAction.pending, (state, action) => {
        
            state.loading= true
            state.appErr = undefined
            state.serverErr = undefined
      })
       // reset  
        .addCase(resetUpdateProfileAction, (state, action)=>{
          state.isProfileUpdated= true
        }) 
     
      .addCase(updateUserProfileAction.fulfilled, (state, action) => {
           state.loading = false
            state.updatedProfile = action?.payload
            state.isProfileUpdated= false
            state.appErr = undefined
            state.serverErr = undefined
      })
      .addCase(updateUserProfileAction.rejected, (state, action) => {
           state.loading = false
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message

      })

      // update password
      .addCase(updatePasswordAction.pending, (state, action) => {
        
            state.loading= true
            state.appErr = undefined
            state.serverErr = undefined
      })
        //reset  
        .addCase(resetPasswordAction, (state, action)=>{
          state.isPasswordUpdated= true
        }) 
     
      .addCase(updatePasswordAction.fulfilled, (state, action) => {
           state.loading = false
            state.updatedPassword = action?.payload
            state.isPasswordUpdated= false
            state.appErr = undefined
            state.serverErr = undefined
      })
      .addCase(updatePasswordAction.rejected, (state, action) => {
           state.loading = false
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message

      })

       // follow Profile
      .addCase(followAUserAction.pending, (state, action) => {
        
            state.loading= true
            state.appErr = undefined
            state.serverErr = undefined
      })
      
      .addCase(followAUserAction.fulfilled, (state, action) => {
           state.loading = false
            state.followProfile = action?.payload
            state.isFollowing = true

            state.unfollowProfile = undefined

            
            state.appErr = undefined
            state.serverErr = undefined
      })
      .addCase(followAUserAction.rejected, (state, action) => {
           state.loading = false
           state.unfollowProfile = undefined
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message

      })

       // unfollow Profile
      .addCase(unfollowAUserAction.pending, (state, action) => {
        
            state.loading= true
            state.appErr = undefined
            state.serverErr = undefined
      })
      
      .addCase(unfollowAUserAction.fulfilled, (state, action) => {
           state.loading = false
            state.unfollowProfile = action?.payload
            state.isFollowing = false
            state.followProfile = undefined
            state.appErr = undefined
            state.serverErr = undefined
      })
      .addCase(unfollowAUserAction.rejected, (state, action) => {
           state.loading = false
            state.appErr = action?.payload?.message
            state.followProfile = undefined

            state.serverErr = action?.error?.message

      })



      // logout 

      .addCase(logoutAction.pending, (state, action) => {
        // action is inferred correctly here if using TS
        state.loading= true
        state.appErr = undefined
            state.serverErr = undefined
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(logoutAction.fulfilled, (state, action) => {
           state.loading = false
            state.userAuth = undefined
            state.appErr = undefined
            state.serverErr = undefined
      })
      .addCase(logoutAction.rejected, (state, action) => {
           state.loading = false
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message

      })
      


     
  },
     
})

export default usersSlice.reducer