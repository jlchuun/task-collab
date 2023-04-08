import { useContext } from "react";
import { AccountContext } from "./AccountContext";

import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";

const ProtectedRoute = () => {
    const { currentUser } = useContext(AccountContext);

    return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
