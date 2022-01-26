import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Index from "./pages";
import {Game} from "./pages/game";

export const MainRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Game />}>
                    <Route path='welcome' element={<Index/>}/>
                    <Route path='score' element={<div>score</div>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
