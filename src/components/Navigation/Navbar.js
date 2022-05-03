import React  from "react";
import {  useSelector } from "react-redux";

import AdminNavbar from "./AdminNavbar/AdminNavbar";
import PrivateNavbar from "./PrivateNavbar/PrivateNavbar";
import PublicNavbar from "./PublicNavbar/PublicNavbar";

import AccountVerificationAlertWarning from "./Alert/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "./Alert/AccountVerificationSuccessAlert";




const Navbar = () => {


  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  const isAdmin = userAuth?.isAdmin;
  const isAccountVerified = userAuth?.isAccountVerified

  const account = useSelector((state) => state?.accountVarification);

  const {token: accToken, loading, appErr, serverErr} = account  


  return (
      
    <>
      {isAdmin ? (<>

        <AdminNavbar isLogin={userAuth} />
         {!isAccountVerified && <AccountVerificationAlertWarning />}
         {/* display success msg */}
      {loading && <h2 className="text-center">Loading please wait...</h2>}
      {accToken && <AccountVerificationSuccessAlert />}
      {appErr || serverErr ? (
        <h2 className="text-center text-red-500">
          {serverErr} {appErr}
        </h2>
      ) : null}
      </>
      ) : userAuth ? (
        <>
        <PrivateNavbar isLogin={userAuth} />
         {!isAccountVerified && <AccountVerificationAlertWarning />}   
         {/* display success msg */}
      {loading && <h2 className="text-center">Loading please wait...</h2>}
      {accToken && <AccountVerificationSuccessAlert />}
      {appErr || serverErr ? (
        <h2 className="text-center text-red-500">
          {serverErr} {appErr}
        </h2>
      ) : null}     
        </>
      ) : (
        <PublicNavbar />
      )}
    


    </>
  );
};

export default Navbar;
