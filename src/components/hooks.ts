import {useContext, useEffect, useState} from "react";
import {GameStateContext, SetGameStateContext} from "./contexts";
import {GameState} from "../core/games/state";

export const useGameState: () => [GameState, (gameState: GameState) => void] = () => {
    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);
    return [gameState, setGameState];
};

export const useGameTicker = (
    callback: (remaining: number) => void,
    stopCallback: () => void,
    intervalTime: number,
    totalTime: number
) => {
    const [currentInterval, setCurrentInterval] = useState<undefined | NodeJS.Timer>();
    // [remaining, lastCalcTime] in State
    const [, setRemainingWithLastTime] = useState<[number, number]>([totalTime, new Date().getTime()]);
    const stopTick = () => {
        setCurrentInterval(currentInterval => {
            if (currentInterval) {
                clearInterval(currentInterval);
                return undefined;
            }
            return currentInterval;
        });
    };
    useEffect(() => {
        stopTick();
    }, []);
    const callbackHelper = () => {
        setRemainingWithLastTime(remainingWithLastTime => {
            const [remaining, lastTime] = remainingWithLastTime;
            const currentTime = new Date().getTime();
            const realIntervalTime = currentTime - lastTime;
            const currentRemaining = remaining - realIntervalTime;
            if (currentRemaining > 0) {
                callback(currentRemaining);
                return [currentRemaining, currentTime];
            } else {
                stopTick();
                stopCallback();
                return [0, currentTime];
            }
        });
    };
    const startTick = () => {
        if (currentInterval) {
            stopTick();
        }
        setRemainingWithLastTime([totalTime, new Date().getTime()]);
        const intervalId = setInterval(callbackHelper, intervalTime);
        setCurrentInterval(intervalId);
    };
    return {startTick, stopTick};
};
