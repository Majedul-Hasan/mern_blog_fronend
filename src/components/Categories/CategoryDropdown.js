import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Select from 'react-select'
import { fetchCategoriesAction } from '../../Redux/Slices/category/categorySlice'






const CategoryDropdown = (props) => {

  //console.log(props)

    //dispatch action
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategoriesAction())
    }, [dispatch])

    // select category

    const categories = useSelector(state => state?.category) 
    const {loading, category, appErr, serverErr} = categories


    const allCategories = category?.map(categoryItem=>{
        return {
            label: categoryItem?.title,
            value: categoryItem?._id,
        }
    })

    //console.log(allCategories)
    //console.clear(allCategories)

// handel change
const handleChange =(value)=>{
  props.onChange("category" , value)

}

// handel blur
const handleBlur = ()=>{
  props.onBlur("category", true)

}

  return (
    <div style={{margin: "1rem 0" }}>
    {loading ? <h3>Product category list are loading, please wait... </h3> : <Select 
    onChange={handleChange} 
    onBlur = {handleBlur}
    id='category' 
    options={allCategories}
    value = {props?.value?.label}
    
     />}
     {
       props?.error && <div style={{color: "red", marginTop:"0.5rem" }}>{props?.error}</div>
     }
     
    </div>
  )
}

export default CategoryDropdown
