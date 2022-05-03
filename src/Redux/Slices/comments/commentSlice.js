import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { baseUrl } from "../../../utils/baseUrl";




// action to redirect

const resetEditAction = createAction('comment/update-reset')
//const resetEditAction = createAction('category/delete-reset')
//const resetDeleteAction = createAction('category/delete-reset')
//const resetCategoryAction = createAction('category/create-reset')


export const createCommentAction = createAsyncThunk('comment/create', async( comment, { rejectWithValue, getState, dispatch } )=>{

    const user = getState()?.users;
    const {userAuth} = user;

    const config = {
        headers :{
            Authorization : `Bearer ${userAuth?.token}`

        }
    }
    // http call

    
    try {
        const {data} = await axios.post(`${baseUrl}/api/comments`, {
            description: comment?.description,
            post: comment?.postId

        } , config )
        //console.log(data)


        return data
        
    } catch (error) {
         if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
        
    }

})


// fetch A comment
export const fatchACommentAction = createAsyncThunk("comment/fetch", async(commentId, { rejectWithValue, getState, dispatch } )=>{
  //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {

      const {data}=  await axios.get(`${baseUrl}/api/comments/${commentId}`,   config)
     return data
      
    } catch (error) {
       if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
})


// delete comment action 

export const deleteCommentAction = createAsyncThunk('comment/delete', async (commentId, { rejectWithValue, getState, dispatch } )=>{
  
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };


 try {
     const {data}=  await axios.delete(`${baseUrl}/api/comments/${commentId}`,   config)
     return data
    } catch (error) {
     if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
 }


} )


// edit comment action 

export const updateCommentAction = createAsyncThunk('comment/update', async (comment, { rejectWithValue, getState, dispatch } )=>{
  


    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };


 try {
     const {data}=  await axios.put(`${baseUrl}/api/comments/${comment?.id}`, {
       description:comment?.description,
       post: comment?.postId,
       

       }, config)

      dispatch(resetEditAction())
     return data
    } catch (error) {
     if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
 }


} )

// slices

const commentSlice  = createSlice({
  name: 'comments',
  initialState: {},
  extraReducers: (builder) => {
    builder
    //create comment
        .addCase(createCommentAction.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(createCommentAction.fulfilled, (state, action)=>{
            state.loading = false
            state.commentCreated = action?.payload
            state.appErr = undefined;
            state.serverErr = undefined;

        })
         .addCase(createCommentAction.rejected, (state, action)=>{
            state.loading = false
            
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;

        })

         //fatch comment
        .addCase(fatchACommentAction.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(fatchACommentAction.fulfilled, (state, action)=>{
            state.loading = false
            state.commentDetails = action?.payload
            state.appErr = undefined;
            state.serverErr = undefined;

        })
         .addCase(fatchACommentAction.rejected, (state, action)=>{
            state.loading = false
            
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;

        })


    // Delete comment
        .addCase(deleteCommentAction.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(deleteCommentAction.fulfilled, (state, action)=>{
            state.loading = false
            state.commentDeleted = action?.payload
            state.appErr = undefined;
            state.serverErr = undefined;

        })
         .addCase(deleteCommentAction.rejected, (state, action)=>{
            state.loading = false
            
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;

        })

        // Update comment
        .addCase(updateCommentAction.pending, (state, action)=>{
            state.loading = true
        })
        // reset
        .addCase(resetEditAction, (state, action)=>{
            state.isUpdated= true

        })
        .addCase(updateCommentAction.fulfilled, (state, action)=>{
            state.loading = false
            state.commentUpdated = action?.payload
            state.isUpdated= false

            state.appErr = undefined;
            state.serverErr = undefined;

        })
         .addCase(updateCommentAction.rejected, (state, action)=>{
            state.loading = false
            
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;

        })


  }
})


export default commentSlice.reducer