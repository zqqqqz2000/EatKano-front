import React from "react";
import styled from "@emotion/styled";
import {Button} from "react-bootstrap";
import { Margin } from "../components/margin";
import {useGameState} from "../components/hooks";
import {GameState} from "../core/games/state";

const Text = styled.div<{ color?: string, size?: string, weight?: number | string }>`
  color: ${props => props.color ?? 'black'};
  font-size: ${props => props.size ?? '100%'};
  font-weight: ${props => props.weight ?? 'normal'};
  font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
`;

const Center = styled.div`text-align: center`;

const Index: React.FC = () => {
    const [, setGameState] = useGameState();

    const startGame = () => {
        setGameState(GameState.InProgress);
    };

    return <Center>
        <Text size='2.6em' color='#FEF002' weight='bold'>
            新概念音游
        </Text>
        <Margin top='20px'>
            <Text size='2.2em' color='white' weight='bold'>
                从最底下的开始
            </Text>
        </Margin>
        <Margin top='10px'>
            <Text size='2.2em' color='white' weight='bold' style={{marginTop: 10}}>
                看你20秒多少分
            </Text>
        </Margin>
        <Margin top='15px'>
            <Button variant="primary" onClick={startGame}>点击开始</Button>
        </Margin>
    </Center>
};

export default Index;
