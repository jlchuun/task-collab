import { Routes, Route } from "react-router-dom";
import SignIn from "./Login/SignIn";
import SignUp from "./Login/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home/Home";

const Views = () => {
    return (
        <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="*" element={<SignIn />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    );
};

export default Views;
