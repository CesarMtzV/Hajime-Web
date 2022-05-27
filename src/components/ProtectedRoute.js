import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ token, children}) => {

    if(!token) { 
        return <Navigate to="/" replace />;
    }

    return children;
};
