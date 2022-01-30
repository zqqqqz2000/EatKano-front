import React from "react";
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import Index from "./pages";
import {Game} from "./pages/game";
import {Result} from "./pages/result";

export enum RoutePaths {
    empty = '/',
    welcome = '/welcome',
    result = '/result'
}

export const MainRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Game/>}>
                    <Route path={RoutePaths.welcome} element={<Index/>}/>
                    <Route path={RoutePaths.result} element={<Result/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
