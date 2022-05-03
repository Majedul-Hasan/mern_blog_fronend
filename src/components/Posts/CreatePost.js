import { useDispatch,  useSelector  } from "react-redux";

import { useFormik } from 'formik';
import Dropzone, {useDropzone} from 'react-dropzone'

 import * as Yup from "yup";

import { createPostAction } from "../../Redux/Slices/posts/postSlices";
import CategoryDropdown from "../Categories/CategoryDropdown";

import styled from 'styled-components'
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";


 // form schema

 const formSchema = Yup.object({
   

     title: Yup.string().required('title is required'),
     description: Yup.string().required('description is required'),
     image: Yup.string().required('image field is required'),

     category: Yup.object().required('Category is required'),
     


 })

 const Container = styled.div`
  flex:1 ;
  display: flex ;
  flex-direction:column ;
  align-items: center;
  padding:20px;
  border-width: 2px;
  border-radius:2px ;
  border-style: dashed ;
  background-color: #fafafa;
  color: #bdbdbd ;
  border-color: red ;
  transition: border 0.24s ease-in-out;

 `

const CreatePost= ()=> {
 const dispatch = useDispatch()

  const navigate = useNavigate()


 // select store state

 const posts = useSelector(state=>state.post)

 const {serverErr, loading, appErr, isCreated} = posts


     useEffect(() => {
      
    if(isCreated){
      //<Navigate to="/profile" replace={true} />
      navigate("/posts")
      
    }
    }, [ isCreated, navigate])

    // formic

    const formik = useFormik({
        initialValues:{
            title: '',
            description: '',
            category: "",
            image: ""
           
        },
        onSubmit: (values)=>{
            //console.log(values)

            const data = {
              category : values?.category,
              title: values?.title,
              description: values?.description,
              image: values?.image,

              

            }
             dispatch(createPostAction(data))
    //console.log(data)
        },
        validationSchema: formSchema
    })


  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Create Post
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-green-600 hover:text-indigo-500">
              Share your ideas to the word. Your post must be free from
              profanity
            </p>
          </p>

          {appErr|| serverErr ? <p className="mt-2 text-center text-lg text-sm text-red-600">
            
              {serverErr} { appErr}
            
          </p> : null }




        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  {/* Title */}
                  <input
                  value={formik.values.title}
                      onChange={formik.handleChange('title')}
                      onBlur={formik.handleBlur('title')}
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                  {/* {formik.touched.title && formik.errors.title} */}
                  {formik?.touched?.title && formik?.errors?.title }
                </div>
              </div>
              <label >select a category</label>
              <CategoryDropdown 
                value={formik.values.category?.label} 
                onChange={formik.setFieldValue}
                onBlur = {formik.setFieldTouched}
                error = {formik.errors.category}
                touched = {formik.touched.category}

               />

            
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                {/* Description */}
                <textarea
                value={formik.values.description}
                      onChange={formik.handleChange('description')}
                      onBlur={formik.handleBlur('description')}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                ></textarea>
                {/* image component */}

              <label >select image to upload</label>



                {/* Err msg */}
                <div className="text-red-500">{formik?.touched?.description &&  formik?.errors?.description }</div>
              </div>
              <div>
                {/* Submit btn */}
                
                <Container className="container bg-gray-700">
                  <Dropzone
                    onBlur={formik.handleBlur("image")}
                    accept='image/jpeg, image/png' onDrop={acceptedFiles => {formik.setFieldValue("image", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="container">
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: event => event.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                            Click here to select image
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </Container>

                
               {loading ? <button
                  disabled
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 "
                >
                  ... loading Please wait
                </button> : <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create
                </button>}
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


export default  CreatePost