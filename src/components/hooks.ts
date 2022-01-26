import {useContext} from "react";
import {GameState, GameStateContext, SetGameStateContext} from "./contexts";

export const useGameState: () => [GameState, (gameState: GameState) => void] = () => {
    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);
    return [gameState, setGameState];
};
