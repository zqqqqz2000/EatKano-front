import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Index from "./pages";
import {Game} from "./pages/game";
import {Failed} from "./pages/failed";

export enum RoutePaths {
    welcome = 'welcome',
    score = 'score',
    failed = 'failed'
}

export const MainRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Game/>}>
                    <Route path={RoutePaths.welcome} element={<Index/>}/>
                    <Route path={RoutePaths.score} element={<div>score</div>}/>
                    <Route path={RoutePaths.failed} element={<Failed/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
