import React from "react";

export enum GameState {
    NotStarted,
    InProgress,
    Finished
}

export const GameStateContext = React.createContext<GameState>(GameState.NotStarted);
export const SetGameStateContext = React.createContext<(gameState: GameState) => void>(
    () => {}
);
