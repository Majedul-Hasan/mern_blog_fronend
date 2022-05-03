import {
  BrowserRouter,
  Routes,
  Route, Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux';

import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/updateCategory";

import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Navbar";
import AdminRought from "./components/Navigation/protectedRought/AdminRought";
import PrivetProtectedRought from "./components/Navigation/protectedRought/PrivetProtectedRought";

import Login from "./components/users/login/Login";
import Register from "./components/users/register/Register";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostsList";
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/UpdatePost";
import UpdateComment from "./components/Comments/UpdateComment";
import Profile from "./components/users/Profile/Profile";
import UploadProfilePhoto from "./components/users/Profile/UploadProfilePhoto";
import UpdateProfileForm from "./components/users/Profile/UpdateProfileForm";
import SendEmail from "./components/users/Emailing/SendEmail";
import AccountVerified from "./components/users/AccountVerification/AccountVerified";
import UsersList from "./components/users/UsersList/UsersList";
import UpdatePassword from "./components/users/PasswordManagement/UpdatePassword";
import ResetPaswordToken from "./components/users/PasswordManagement/ResetPaswordToken";
import ResetPassword from "./components/users/PasswordManagement/ResetPassword";







function App() {
  const user = useSelector(state=> state?.users)

const {userAuth} = user


  return (
    < BrowserRouter >
      <Navbar />

      <Routes > 
        <Route path="/" element={
        <HomePage />
        
         } />  
         <Route path ="/posts" element = {<PostsList />} />
         <Route path ="/recover-password" element = {<ResetPaswordToken />} />
          <Route path ="/reset-password/:token" element = {<ResetPassword />} />         
         
        

         <Route path ="/users" element={!userAuth?.isAdmin ? <Navigate to="/login"  replace /> : <UsersList />} />
         <Route path ="/update-password" element={!userAuth ? <Navigate to="/login"  replace /> : <UpdatePassword />} />


         <Route path ="/profile/:id" element={!userAuth ? <Navigate to="/login"  replace /> : <Profile />} />
         <Route path ="/upload-profile-photo" element={!userAuth ? <Navigate to="/login"  replace /> : <UploadProfilePhoto />} />
         <Route path ="/update-profile" element={!userAuth ? <Navigate to="/login"  replace /> : <UpdateProfileForm />} />
         <Route path ="/send-mail" element={!userAuth ? <Navigate to="/login"  replace /> : <SendEmail user={userAuth} />} />
         <Route path ="/verify-account/:token" element={!userAuth ? <Navigate to="/login"  replace /> : <AccountVerified />} />
         <Route path ="/posts/:id" element = {<PostDetails />} />
         <Route path="update-comment/:id" element={!userAuth ? <Navigate to="/login"  replace /> : <UpdateComment />}/>
         <Route path="/create-post" element={!userAuth ? <Navigate to="/login"  replace /> : <CreatePost />} /> 
         <Route path="/update-post/:id" element={!userAuth ? <Navigate to="/login"  replace /> : <UpdatePost />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 

        <Route path="/add-category" element={!userAuth?.isAdmin ? <Navigate to="/login"  replace /> : <AddNewCategory />} />
        {/*<Route path="/add-category" element={
        <PrivetProtectedRought>
          <AddNewCategory />
        </PrivetProtectedRought>} /> */}


        {/*<PrivetProtectedRought path="/add-category" element={<AddNewCategory />} />*/}
        {/*<Route path="/category-list" element={<CategoryList />} />  */}
        {/*<Route path="/category-list" element={
        <PrivetProtectedRought>
          <CategoryList />
        </PrivetProtectedRought>} /> */}
        <Route path="/category-list" element={!userAuth?.isAdmin ? <Navigate to="/login"  replace /> : <CategoryList />  }/>
        

        <Route path="/update-category/:id" element={!userAuth?.isAdmin ? <Navigate to="/login"  replace /> : <UpdateCategory />} />  

        <Route
          path="*"
          element={
            <main className="text-red-500, bg-red-600">
              <h2 className=" text-white">There's nothing here!</h2> 
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
      
 
  );
}

export default App;
