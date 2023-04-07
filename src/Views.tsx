import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/login/SignIn";

const Views = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" />
            </Routes>
        </BrowserRouter>
    );
};

export default Views;
