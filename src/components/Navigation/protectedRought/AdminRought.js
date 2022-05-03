import React from 'react'
import { useSelector } from 'react-redux';

import {
  
  Navigate
} from "react-router-dom";

const AdminRought = ({Children, ...rest}) => {

const user = useSelector(state=> state?.users)

const {userAuth} = user
//console.log(user)
return !userAuth?.isAdmin ? <Navigate to="/login"  replace /> : Children 
}

export default AdminRought