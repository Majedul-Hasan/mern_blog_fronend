import {createAsyncThunk, createSlice, createAction} from "@reduxjs/toolkit";
import axios from "axios";

import {baseUrl} from "../../../utils/baseUrl";





// action to redirect

const resetPostAction = createAction('post/update-reset')

const resetDeleteAction = createAction('category/delete-reset')
//const resetCategoryAction = createAction('category/create-reset')


// create post action 

export const createPostAction = createAsyncThunk('post/created', async (post, { rejectWithValue, getState, dispatch } )=>{
  
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
 //http call

 const formData = new FormData();
 formData.append("title", post?.title);
 formData.append("description", post?.description);
  formData.append("category", post?.category?.label);
   formData.append("image", post?.image);


 try {
     const {data } = await axios.post(`${baseUrl}/api/posts`, formData, config)


     // dispatch action update to redirect

     dispatch(resetPostAction())



     return data
     
 } catch (error) {
     if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
 }


} )


// 
// fetch all post action 

export const fetchPostAction = createAsyncThunk('post/list', async (category, { rejectWithValue, getState, dispatch } )=>{
  //console.log(post)

  

 //http call

 try {
     const {data } = await axios.get(`${baseUrl}/api/posts?category=${category}`)
    // const {data } = await axios.get(`${baseUrl}/api/posts`)



     // dispatch action update to redirect


     return data
     
 } catch (error) {
     if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
 }


} )

// add likes


export const addLikePostAction = createAsyncThunk('post/likes', async (postId, { rejectWithValue, getState, dispatch } )=>{
  
     //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
 //http call

 try {
     const {data } = await axios.put(`${baseUrl}/api/posts/likes`, {postId}, config)

     // dispatch action update to redirect

     return data
     
 } catch (error) {
     if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
 }


} )


// add likes


export const addDislikePostAction = createAsyncThunk('post/dislikes', async (postId, { rejectWithValue, getState, dispatch } )=>{
  
     //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
 //http call

 try {
     const {data } = await axios.put(`${baseUrl}/api/posts/dislikes`, {postId}, config)

     // dispatch action update to redirect

     return data
     
 } catch (error) {
     if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
 }


} )


// 
// fetch a post detail action 

export const fetchPostDetailsAction = createAsyncThunk('post/details', async (postId, { rejectWithValue, getState, dispatch } )=>{
  //console.log(post)

  

 //http call

 try {
     const {data } = await axios.get(`${baseUrl}/api/posts/${postId}`)
   

     return data
     
 } catch (error) {
     if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
 }


} )


// update post action 

export const updatePostAction = createAsyncThunk('post/updated', async (post, { rejectWithValue, getState, dispatch } )=>{
  
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };



const updatedPost = {
title: post?.title,
description: post?.description,
category: post?.category?.label



}

 try {
     const {data } = await axios.put(`${baseUrl}/api/posts/${post?.id}`, updatedPost,   config)

      // dispatch action update to redirect

     dispatch(resetPostAction())


     return data
     
 } catch (error) {
     if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
 }


} )



// delete post action 

export const deletePostAction = createAsyncThunk('post/delete', async (postId, { rejectWithValue, getState, dispatch } )=>{
  
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };


 try {
     const {data } = await axios.delete(`${baseUrl}/api/posts/${postId}`,   config)

      // dispatch action update to redirect

     dispatch(resetDeleteAction())


     return data
     
 } catch (error) {
     if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
 }


} )






//slices 

const postSlices = createSlice({
    name: 'Post', 
    initialState: {},
    extraReducers: builder=>{
        builder
        // create post
        .addCase(createPostAction.pending, (state, action)=>{
            state.loading = true;

        } )

        // reset post 
        .addCase(resetPostAction, (state, action)=>{
          state.isCreated= true
        })



        .addCase(createPostAction.fulfilled, (state, action)=>{
            state.postCreated= action?.payload;
            state.isCreated= false;

            state.loading = false;
            state.appErr = undefined;
      state.serverErr = undefined;

        })
        .addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })

    // fetch posts

    
        .addCase(fetchPostAction.pending, (state, action)=>{
            state.loading = true;

        } )

        .addCase(fetchPostAction.fulfilled, (state, action)=>{
            state.postLists= action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;

        })
        .addCase(fetchPostAction.rejected, (state, action) => {
          state.loading = false;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
    })

     // add like posts
    
        .addCase(addLikePostAction.pending, (state, action)=>{
            state.loading = true;

        })

        .addCase(addLikePostAction.fulfilled, (state, action)=>{
            state.postLikes= action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;

        })
        .addCase(addLikePostAction.rejected, (state, action) => {
          state.loading = false;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
    })

    // add dislike posts
    
        .addCase(addDislikePostAction.pending, (state, action)=>{
            state.loading = true;

        })

        .addCase(addDislikePostAction.fulfilled, (state, action)=>{
            state.postDislikes= action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;

        })
        .addCase(addDislikePostAction.rejected, (state, action) => {
          state.loading = false;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
    })
  

    // fetch post details

    
        .addCase(fetchPostDetailsAction.pending, (state, action)=>{
            state.loading = true;

        } )

        .addCase(fetchPostDetailsAction.fulfilled, (state, action)=>{
            state.postDetails= action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;

        })
        .addCase(fetchPostDetailsAction.rejected, (state, action) => {
          state.loading = false;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
    })

 // update post
        .addCase(updatePostAction.pending, (state, action)=>{
            state.loading = true;

        } )
         // reset post 
        .addCase(updatePostAction, (state, action)=>{
          state.isUpdated= true
        })      


        .addCase(updatePostAction.fulfilled, (state, action)=>{
            
            state.isUpdated= false;
            state.loading = false;
            state.appErr = undefined;
      state.serverErr = undefined;

        })
        .addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })

    // delete post
        .addCase(deletePostAction.pending, (state, action)=>{
            state.loading = true;

        } )  
         // reset post 
        .addCase(resetDeleteAction, (state, action)=>{
          state.isDeleted= true
        })   
        .addCase(deletePostAction.fulfilled, (state, action)=>{
            state.postUpdated= action?.payload;
            state.isDeleted= false;
            state.loading = false;
            state.appErr = undefined;
      state.serverErr = undefined;

        })
        .addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })





    }
})


export default postSlices.reducer;