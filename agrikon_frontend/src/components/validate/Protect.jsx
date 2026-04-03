import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { validatelogin } from "../../Reducers/loginReducers/loginSlice";

const Protect = () => {
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.login); // Adjust state path as needed

  // Dispatch validatelogin on component mount
  useEffect(() => {
    dispatch(validatelogin());
  }, [dispatch]);

  // Show a loading state while login validation is in progress
  if (islogin === null) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated, otherwise render children
  return islogin ? <Outlet /> : <Navigate to="/login" />;
};

export default Protect;
