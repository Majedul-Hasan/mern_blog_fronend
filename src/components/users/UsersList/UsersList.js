
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAction } from "../../../Redux/Slices/users/userSlices";
import LoadingComponent from "../../../utils/LoadingComponent";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";





const UsersList = () => {
  const dispatch = useDispatch()

  const users = useSelector(state=>state.users)
  const {serverErr, loading, appErr, usersList, block, unblock} = users  


  useEffect(()=>{
    dispatch(fetchAllUsersAction())
  },[dispatch, unblock, block])






  return (
    <>
  
      <section className="py-8 bg-gray-900 min-h-screen">
      {
      serverErr || appErr ? <h2>{serverErr} {appErr} </h2> : usersList?.length <=0 ? <h2>no user</h2> :  <> <UsersListHeader length={usersList?.length}  />
        <div className="container px-4 mx-auto">
        {usersList?.map(user=> <UsersListItem key={user._id} user={user} />)}

          
        </div></>  }
       
      </section>
    </>
  );
};

export default UsersList;
