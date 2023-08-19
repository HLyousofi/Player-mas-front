import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import api from "../services/posts";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const {user, token} = useAuth();
   
    
    return (
            
            token ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;