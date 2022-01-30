import React, {useEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import {useGameState} from "../components/hooks";
import {GameState} from "../core/games/state";
import {BasicGame} from "../components/basicGame";
import {RoutePaths} from "../router";

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

const useRedirectDefault = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
      if (pathname === RoutePaths.empty) {
          navigate(RoutePaths.welcome);
      }
  }, [navigate, pathname])
}

export const Game: React.FC = () => {
    const [gameState] = useGameState();
    useRedirectDefault();
    return <FullScreen>
        <BasicGame />
        {gameState === GameState.InProgress || <FloatLayer>
            <FullScreen>
                <Outlet/>
            </FullScreen>
        </FloatLayer>}
    </FullScreen>;
};
