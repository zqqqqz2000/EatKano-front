import {useContext} from "react";
import {GameStateContext, SetGameStateContext} from "./contexts";
import {GameState} from "../core/games/state";

export const useGameState: () => [GameState, (gameState: GameState) => void] = () => {
    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);
    return [gameState, setGameState];
};
