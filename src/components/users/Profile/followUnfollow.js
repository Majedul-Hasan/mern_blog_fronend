import React, { useEffect } from "react";
import {
  HeartIcon,
  EmojiSadIcon,
 
} from "@heroicons/react/outline";

import { followAUserAction,unfollowAUserAction, userProfileAction } from "../../../Redux/Slices/users/userSlices";
import { useDispatch, useSelector } from "react-redux";


const FollowUnfollow = ({userId}) => {
    const dispatch = useDispatch()
     const clickFollow = React.useRef(null);
     const clickUnfollow = React.useRef(null);



  const users = useSelector(state => state?.users)

     const {userAuth, isFollowing,  serverErr, profile, loading, followProfile,unfollowProfile, appErr} = users

    // const {isFollowing} = profile.isFollowing
        //console.log(profile?.isFollowing );        

        useEffect(()=>{
            function handleClickFollow() {
                dispatch(followAUserAction(userId))     
                window.location.reload(false);           
            }      
            clickFollow.current = handleClickFollow;
            function handleClickUnfollow() {
                dispatch(unfollowAUserAction(userId))   
                window.location.reload(false);             
            }      
            
            clickUnfollow.current = handleClickUnfollow;


            
        },[dispatch,userId ])


  return <div>
  {
                userId === userAuth?._id ? null : !profile?.isFollowing  ?  <button
                    // onClick={followHandler}
                        onClick={()=>clickFollow.current()}
                    type="button"
                    className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                    <HeartIcon 
                    
                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                    <span>Follow </span>
                    </button> : <button
                    
                        onClick={()=>clickUnfollow.current()}

                    className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                    <EmojiSadIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                    />
                    <span>Unfollow</span>
                </button> 
                
                }
  
  
  </div>;
};

export default FollowUnfollow;
