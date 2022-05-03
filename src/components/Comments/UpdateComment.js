import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {fatchACommentAction, updateCommentAction} from "../../Redux/Slices/comments/commentSlice"
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

//Form validation Schema
const formSchema = Yup.object({
  description: Yup.string().required("update the Description"),
});



const UpdateComment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  

  const params = useParams()
    const {id} = params
   
    
    
  const comment = useSelector(state =>state?.comment)

  const {commentDetails, isUpdated , serverErr, loading, appErr} = comment
  
const postId = commentDetails?.post

//console.log(isUpdated);




  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: commentDetails?.description,
    },
    onSubmit: values => {
      const data = {
        id,
        postId,
        description: values?.description,
      };
      //console.log(data)
      dispatch(updateCommentAction(data))
      
    },
    validationSchema: formSchema,
  });

 
  

   useEffect(() => {
    dispatch(fatchACommentAction(id))

    if(isUpdated) return navigate(`/posts/${postId}`)


  }, [dispatch, id, isUpdated, navigate, postId]);




  return (
    <div className="flex  flex-col bg-black h-screen">
    <div className=" flex flex-col my-12  justify-center align-middle  ">
                    
            <p className="text-lg text-center text-gray-400">
                        {commentDetails?.description}
            </p>
    </div>
    <div className="flex flex-col flex-1   items-center ">
      <form
        onSubmit={formik.handleSubmit}
        className="mt-10 flex max-w-sm m-auto"
      >
        <textarea
          onBlur={formik.handleBlur("description")}
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          type="text"
          name="text"
          id="text"
          className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md"
          placeholder={commentDetails?.description}
        />

        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      <div className="text-red-400 mb-2 mt-2">
        {formik.touched.description && formik.errors.description}
      </div>
    </div>
    
    </div>
  );
};

export default UpdateComment;
