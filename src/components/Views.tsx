import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./login/SignIn";
import SignUp from "./login/SignUp";

const Views = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Views;
