import {  configureStore} from "@reduxjs/toolkit";
import usersReducer from "../Slices/users/userSlices";

import categoryReducer from "../Slices/category/categorySlice";
import postsReducer from "../Slices/posts/postSlices"
import commentReducer from "../Slices/comments/commentSlice";
import emailSlice from "../Slices/email/emailSlice";
import accountVarificationSlice from "../Slices/accountVarification/accountVarificationSlice";





const store = configureStore({
    reducer: {
        users: usersReducer,
        category : categoryReducer,
        post: postsReducer,
        comment: commentReducer,
        email: emailSlice,
        accountVarification: accountVarificationSlice
    }
})

export default store