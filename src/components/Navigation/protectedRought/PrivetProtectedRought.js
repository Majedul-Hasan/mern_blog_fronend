import React from 'react'
import { useSelector } from 'react-redux';

import {
  
  Navigate
} from "react-router-dom";

const PrivetProtectedRought = ({Children, ...rest}) => {

const user = useSelector(state=> state?.users)

const {userAuth} = user
console.log(userAuth)
return !userAuth ?  <Navigate to="/login"/>:   Children 
 
}

export default PrivetProtectedRought