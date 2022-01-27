import React from "react";
import {GameState} from "../core/games/state";

export const GameStateContext = React.createContext<GameState>(GameState.NotStarted);
export const SetGameStateContext = React.createContext<(gameState: GameState) => void>(
    () => {}
);
