import React, {useEffect} from "react";
import {GameState} from "../core/games/state";
import {useGameState} from "../components/hooks";
import {Text} from "../components/text";
import {Margin} from "../components/margin";
import Awkward from "../image/Awkward.png"
import {Button} from "react-bootstrap";
import styled from "@emotion/styled";
import {useLocation, useNavigate} from "react-router-dom";
import {GameResult} from "../components/basicGame";
import {RoutePaths} from "../router";

const Second = 1000;
const Center = styled.div`text-align: center`;

const GameResultDisplay: React.FC<{ result: GameResult }> = ({result}) => {
    const secondTotalTime = (result.totalTime / Second).toFixed(2);
    const cps = (result.score / result.totalTime * Second).toFixed(2);
    return <>
        <Text size='2.2em' color='white' weight='bold'>
            你一共吃掉了 {result.score} 个小鹿乃
        </Text>
        <Text size='2.2em' color='white' weight='bold'>
            CPS: {cps}
        </Text>
        <Text size='2.2em' color='white' weight='bold'>
            耗时: {secondTotalTime} 秒
        </Text>
    </>
}

export const Result: React.FC = () => {
    const [, setGameState] = useGameState();
    const navigate = useNavigate();
    const {state} = useLocation();
    useEffect(() => {
        if (state === null) {
            console.log(state);
            setGameState(GameState.NotStarted);
            navigate(RoutePaths.welcome);
        }
    }, [state]);
    const typedState = state as GameResult | undefined;
    const startGame = () => {
        setGameState(GameState.InProgress);
    };
    return <Center>
        <Text size='2.6em' color='yellow' weight='bold'>
            <img src={Awkward} alt="game over" style={{width: 30}}/>
            {!!state && typedState?.totalTime !== 20 * Second ? '寄汤来喽~' : '牛呀牛呀！'}
        </Text>
        <Margin top='20px'>
            {!!state && <GameResultDisplay result={state as GameResult}/>}
        </Margin>
        <Margin top='15px'>
            <Button variant="primary" onClick={startGame}>点击重试</Button>
        </Margin>
    </Center>;
};