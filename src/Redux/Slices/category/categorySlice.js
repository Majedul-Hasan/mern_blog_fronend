import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import {baseUrl} from "../../../utils/baseUrl";

// action to redirect

const resetEditAction = createAction('category/update-reset')
const resetDeleteAction = createAction('category/delete-reset')
const resetCategoryAction = createAction('category/create-reset')

//action

export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.post(
        `${baseUrl}/api/category`,
        {
          title: category?.title,
        },
        config
      );
      dispatch(resetCategoryAction())
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


// fetch

export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.get(
        `${baseUrl}/api/category`,        
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// UPDATE categoty action

export const updateCategoryAction = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.put(
        `${baseUrl}/api/category/${category?.id}`,
        {title: category?.title}  ,      
        config
      );

      // dispatch action to reset updated date
      dispatch(resetEditAction())

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


// DELETE categoty action

export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.delete(
        `${baseUrl}/api/category/${id}`,        
        config
      );

       // dispatch action to reset deleted date
      dispatch(resetDeleteAction())


      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// fetch details categoty action

export const fetchDetailCategoryAction = createAsyncThunk(
  "category/fetchDetails",
  async (id, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.get(
        `${baseUrl}/api/category/${id}`,        
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);





//slices

const categorySlices = createSlice({
  name: "category",
  initialState: {},
  extraReducers: builder => {
    builder
    // create
    .addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    })
    //  dispatch action reset
    .addCase(resetCategoryAction, (state, action)=> {
      state.isCreated= true
    } )
    .addCase(createCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.isCreated= false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    .addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })

    // fetch
    .addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    .addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })

    // update
    .addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
    })
    //  dispatch action reset
    .addCase(resetEditAction, (state, action)=> {
      state.isEdited= true
    } )
    .addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.updateCategory = action?.payload;
      state.isEdited= false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    .addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })

    // delete
    .addCase(deleteCategoryAction.pending, (state, action) => {
      state.loading = true;
    })
    //  dispatch action delete-reset
    .addCase(resetDeleteAction, (state, action)=> {
      state.isDeleted= true
      }
       )
    .addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.deleteCategory = action?.payload;
      state.loading = false;
      state.isDeleted= false;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    .addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })

    // fatch details
    .addCase(fetchDetailCategoryAction.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchDetailCategoryAction.fulfilled, (state, action) => {
      state.fetchSingleCategory = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    .addCase(fetchDetailCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })



  },
});

export default categorySlices.reducer;
