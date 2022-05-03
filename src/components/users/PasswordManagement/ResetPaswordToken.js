import React from "react";
import * as Yup from 'yup'
import {  useFormik } from "formik";
import { emailPasswordTokenAction } from "../../../Redux/Slices/accountVarification/accountVarificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";




//formSchema


const formSchema = Yup.object({
    email: Yup.string().required("email is required")
})



const ResetPaswordToken = () => {
    const dispatch = useDispatch()


    //Formik
    const  formik = useFormik({
        initialValues:{
            email: ""
        },
        onSubmit: values=>{

            //console.log(values);
            dispatch(emailPasswordTokenAction(values))
            
        },
        validationSchema: formSchema
    })

    const  accountVarification = useSelector(state=>state?.accountVarification)
   const {passwordResetToken, appErr, loading, serverErr}= accountVarification

  // console.log(passwordResetToken);




  return (
      <div className="min-h-screen bg-gray-700  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 pb-4 mb-3 text-center text-3xl border-b-2 border-solid border-gray-400 font-extrabold text-gray-300">
          Find Your Account
        </h2>
        <p className="text-gray-300">
        Please enter your email address or mobile number to search for your account.</p>
        {
          appErr|| serverErr ? <h2 className="mt-1 text-center text-xl  text-red-500">
         {serverErr} {appErr}
        </h2>: null
        }
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit} >
                <div className="flex items-center pl-6 mb-6 border border-gray-50 bg-white rounded-full">
              
           

              <input
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                className="w-full border-gray-300 border-2 pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                type="email"
                placeholder=" Email address"
              />
            </div>
             {/* Err msg */}
            <div className="text-red-400 mb-2">
              {formik.touched.email && formik.errors.email}
            
            </div>
            
           
            <div className="pl-6 text-sm"> {passwordResetToken ? <span >a verification message is sent to <b style={{color: "blue"}}>{formik.values.email},</b>  reset now within 10 minutes</span> : <div className="pl-6">
            <h4>or update your <Link className=" text-blue-600 hover:underline" to='/update-password'>Password</Link> </h4>
            </div>}
            </div>
            
            {
              loading? <button
                disabled
                className="inline-flex bg-gray-500 justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-200 " 
              >
                <span>Please wait...</span>
                </button> : <button
                type="submit"
                className="inline-flex bg-indigo-500 justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-200  hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <span>submit</span>
                </button>
            }
            
          


            <div>
            </div>

            </form>

        </div>
      
      </div>
      </div>
  );
};

export default ResetPaswordToken;
