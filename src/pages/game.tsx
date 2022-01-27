import React from "react";
import {Outlet} from "react-router-dom";
import styled from "@emotion/styled";
import {useGameState} from "../components/hooks";
import {GameState} from "../core/games/state";
import {BasicGame} from "../components/basicGame";

const FloatLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
`;

const FullScreen = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Game: React.FC = () => {
    const [gameState] = useGameState();
    return <FullScreen>
        <BasicGame />
        {gameState === GameState.InProgress || <FloatLayer>
            <FullScreen>
                <Outlet/>
            </FullScreen>
        </FloatLayer>}
    </FullScreen>;
};
