import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    console.log(location)
    if(loading){
        return <span className="text-3xl loading loading-ring loading-lg"></span>
    }
    if(user)
    {
       return children
    }
    return <Navigate to={'/signIn'} state={location?.pathname}></Navigate>
};

export default PrivateRouter;