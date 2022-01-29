
import React from 'react';
import { useSelector } from 'react-redux';
import {  Navigate } from 'react-router-dom';

const PublicRoute = ({component: Component, ...rest}) => {
  const isLoggedIn = useSelector(((state) => state.auth.loggedIn));
  console.log(isLoggedIn)
    return (

         (
          !isLoggedIn ?
                <Component {...rest} />
            : <Navigate to="/" />
        )
    );
};

export default PublicRoute;