import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,  } from "react-router-dom";
import * as Yup from 'yup'
import { sendEmailToUserAction } from "../../../Redux/Slices/email/emailSlice";
import { loginUserAction } from "../../../Redux/Slices/users/userSlices";





const formSchema = Yup.object({
  recipientEmail:Yup.string().required("recipent is required"), 
  message: Yup.string().required("Description is required"),
  subject : Yup.string().required("Subject is required"),

})



const SendEmail = ({user}) => {
  const {_id } = user

 
  
  


  const dispatch = useDispatch()
  const navigate = useNavigate()
  //const params = useSearchParams()

  //console.log(params);
  // console.log(window.location);
   const params = new URLSearchParams(window.location.search)
   const userMailId = params.getAll("email")[0]




  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      recipientEmail: userMailId,
      message:" ",
      subject: ""
    },
    onSubmit: values=>{
      //console.log(values);
      dispatch(sendEmailToUserAction(values))
    },
    validationSchema: formSchema

  })

 

  

  const email= useSelector(state=>state?.email)
  //console.log(email);
  const{isEmailSent, emailSent, loading, appErr, serverErr} = email

  
  useEffect(() => {
    if(isEmailSent) return  navigate(`/profile/${_id}`)
    
  }, [_id, navigate, isEmailSent]);
  



  return (
  <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8" >
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300 "> mail to { ' '} 
      <span className="text-green-300">{userMailId}</span>
      
      </h2>
      {
        appErr || serverErr ?  <p className="mt-2 text-center text-red-500  ">{serverErr} {appErr} </p> : null
      }
      {/*{
        emailSent ? <p className="mt-2 text-center text-green-500  ">sent
      </p>
         : null
      }*/}
      
      
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={formik.handleSubmit}  className="space-y-6">
        <div >
          <label htmlFor="email" className="block text-sm medium text-gray-700">
          Recipient Email

          
          </label>
          <div className="mt-1">
            <input 
              value={formik.values.recipientEmail}
              onChange={formik.handleChange("recipientEmail")}
              onBlur={formik.handleBlur("recipientEmail")}
              type="email"
              disabled
              id="email"
              name="email"
              
              autoComplete="email"
              className="appearance-none block w-full px-3 py-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

          </div>
          <div className="text-red-500">
                {formik.touched.recipientEmail && formik.errors.recipientEmail}
              </div>
        </div>
        <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <div className="mt-1">
                {/* Subject */}
                <input
                  value={formik.values.subject}
                  onChange={formik.handleChange("subject")}
                  onBlur={formik.handleBlur("subject")}
                  id="subject"
                  name="subject"
                  type="text"
                  autoComplete="subject"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.subject && formik.errors.subject}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              {/* email message */}
              <textarea
                value={formik.values.message}
                onChange={formik.handleChange("message")}
                onBlur={formik.handleBlur("message")}
                rows="5"
                cols="10"
                className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                type="text"
              ></textarea>
              {/* err here */}
              <div className="text-red-500">
                {formik.touched.message && formik.errors.message} 
              </div>
            </div>
            <div>
            {
              loading ? <button
                disabled
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 "
              >
                Loading Please wait....
              </button> : <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send
              </button>
            }
              
            </div>

        </form>
      </div>
    </div>
  </div>
  )
};

export default SendEmail;
