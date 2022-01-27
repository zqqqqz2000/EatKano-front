import React from 'react';
import './App.css';
import {GameStateContext, SetGameStateContext} from './components/contexts';
import {MainRouter} from './router';
import {GameState} from "./core/games/state";

function App() {
    const [gameState, setGameState] = React.useState<GameState>(GameState.NotStarted);
    return (
        <GameStateContext.Provider value={gameState}>
            <SetGameStateContext.Provider value={setGameState}>
                <MainRouter/>
            </SetGameStateContext.Provider>
        </GameStateContext.Provider>
    );
}

export default App;
