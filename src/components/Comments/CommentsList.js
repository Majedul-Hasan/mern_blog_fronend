import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import { deleteCommentAction, updateCommentAction } from "../../Redux/Slices/comments/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";








const  CommentsList=({ comments }) => {

const dispatch = useDispatch()

const comment = useSelector(state => state.comment)




 const users = useSelector(state => state?.users )
  const {userAuth} = users 
  //const isCreatedBy = postDetails?.user?._id === _id

  if(userAuth){
  var _id = userAuth?._id

  }
  


  
  return (
    <div>
      <ul className="divide-y bg-gray-00 w-96 divide-gray-200 p-3 mt-5">
        <div className="text-gray-300 text-lg font-bold ">Comments</div>
        {
          comments?.length <= 0 ? <h2 className="text-lg text-red-600 "> No comments</h2> : <>
          
          
           <p className="text-gray-300 py-2"> Total {comments?.length} Comments  </p>
           {
             comments?.map(comment=>(
               
               <li key={comment?._id}  className="py-4  w-full">
                <div className="flex space-x-3">
                  <img className="h-6 w-6 rounded-full"  src={comment?.user?.profilePhoto}
                      alt={comment?.user?.firstName}/>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                    <Link to={`/profile/${comment?.user?._id}`}>
                      <h3 className="text-sm font-medium text-green-400">  {comment?.user?.firstName} {comment?.user?.lastName} </h3>
                    </Link>
                      <p className="text-bold text-yellow-500 text-base ml-5">                      
                      <Moment fromNow ago>{comment?.createdAt}</Moment>                    
                      </p>
                    </div>
                    <p className="text-sm text-gray-400">
                        {comment?.description}
                    </p>
                     {
                      //Check if is the same user created this comment 
                      _id && (comment.user._id === _id) ? <p className="flex">
                      <Link to={`/update-comment/${comment?._id}`}><PencilAltIcon className="h-5 mt-3 text-yellow-300" /></Link>
                      <button onClick={()=>dispatch(deleteCommentAction(comment?._id))}  className="ml-3">
                          <TrashIcon className="h-5 mt-3 text-red-600" />
                      </button>
                     </p> : null
                     }
                     



                  
                  </div>

               
                </div>
               
               </li>
             ))
           }


          
          </> 
        }

        
          
      
      </ul>
    </div>
  );
}


export default CommentsList