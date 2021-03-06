import React, {useEffect} from "react";
import { Link, useParams, useNavigate, Outlet } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

import { useDispatch, useSelector } from "react-redux";
import { deletePostAction, fetchPostDetailsAction } from "../../Redux/Slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";
import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";






const PostDetails = () => {

 
  const params = useParams()

  const dispatch = useDispatch()
    const navigate = useNavigate()


  const post = useSelector(state=>state?.post)

  const {postDetails, serverErr, loading, appErr, isDeleted} = post

  const users = useSelector(state => state?.users )
  
  const {userAuth} = users 
  
  if(userAuth){
  var isCreatedBy = postDetails?.user?._id === userAuth?._id

  }


  const comment = useSelector(state=>state?.comment)
  const {commentCreated, commentDeleted} =comment




 
  useEffect(() => {
    dispatch(fetchPostDetailsAction(params.id))
   
    
  }, [dispatch, params, commentCreated, commentDeleted ]) 

      if(isDeleted) return navigate("/posts")
  
  return (
    <>
    {
      loading ? < LoadingComponent /> : serverErr|| appErr ? <h1>{serverErr} {appErr}</h1> : <section key={postDetails?._id} className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
        <div className="container px-4 mx-auto">
          {/* Post Image */}
          <img
            className="mb-24 w-full h-96 object-cover"
            src={postDetails?.image}
            alt=""
          />
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
              {postDetails?.title}
            </h2>

            {/* User */}
            <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
              <img
                className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                src={postDetails?.user?.profilePhoto}
                alt=""
              />
              <div className="text-left">
                <h4 className="mb-1 text-2xl font-bold text-gray-50">
                  <Link to={`/profile/${postDetails?.user?._id}`} className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                    {postDetails?.user?.firstName} {postDetails?.user?.lastName}
                  </Link>
                </h4>
                <p className="text-gray-500">
                  <DateFormatter date={postDetails?.createdAt} />
                  
                </p>
              </div>
            </div>
            {/* Post description */}
            <div className="max-w-xl mx-auto">
              <p className="mb-6 text-left  text-xl text-gray-200">
                {postDetails?.description}
                
                {/* Show delete and update btn if created user */}
                {
                  !isCreatedBy ? null : <p className="flex">
                  <Link to={`/update-post/${postDetails?._id}`} className="p-3">
                    <PencilAltIcon className="h-8 mt-3 text-yellow-300" />
                  </Link>
                  <button onClick={()=>dispatch(deletePostAction(postDetails?._id))} className="ml-3">
                    <TrashIcon className="h-8 mt-3 text-red-600" />
                  </button>
                </p> 
                }
                
              </p>
            </div>
          </div>
        </div>
        {/* Add comment Form component here */}
        {
          userAuth?._id && <AddComment postId={params.id} />
        }
        

        <div className="flex justify-center  items-center">
          <CommentsList comments={postDetails?.comments} postId={postDetails?._id} />
          
        </div>
      </section>
    }
      <Outlet />
    </>
  );
};

export default PostDetails;
