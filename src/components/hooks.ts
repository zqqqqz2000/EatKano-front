import {useContext, useState} from "react";
import {GameStateContext, SetGameStateContext} from "./contexts";
import {GameState} from "../core/games/state";

export const useGameState: () => [GameState, (gameState: GameState) => void] = () => {
    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);
    return [gameState, setGameState];
};

export const useOperate = (callback: () => void) => {
    const [down, setDown] = useState(false);
    const doUp = () => {
        setDown(false);
    };
    const doDown = () => {
        if (down) {
            return;
        } else {
            callback();
            setDown(true);
        }
    };
};
