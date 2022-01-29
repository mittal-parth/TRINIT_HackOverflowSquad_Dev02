
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
    return (
         (
          isLoggedIn ?
              <Component {...rest} />
            : <Navigate to="/login" />
        )
    );
};

export default PrivateRoute;