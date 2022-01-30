import React, {useState} from "react";
import styled from "@emotion/styled";
import ClickBefore from "../image/BeforeClick.png";
import ClickAfter from "../image/AfterClick.png";
import Wrong from "../image/Wrong.png";
import {DtWhiteBlock, SequenceGenerator} from "../core/games/dtWhiteBlock/dtWhiteBlock";
import {GameState} from "../core/games/state";
import {useGameState, useGameTicker} from "./hooks";

const stageWidth = Math.min(window.innerWidth, 640);
const screenHeight = window.innerHeight;
const blockSize = stageWidth / 4;
const Second = 1000;

const Stage = styled.div<{rotate?: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh + ${blockSize * 10}px);
  bottom: ${-blockSize}px;
  width: ${stageWidth}px;
  overflow: hidden;
  position: fixed;
  transform-origin: bottom center;
  transform: rotateX(${props => props.rotate ?? 0});
  transform-style: preserve-3d;
`;

const Perspective = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  transform-style: preserve-3d;
`;

const Row = styled.div<{ bottom?: number }>`
  position: absolute;
  bottom: ${props => props.bottom ?? blockSize}px;
  display: flex;
  width: ${stageWidth}px;
  height: ${blockSize}px;
  justify-content: center;
  transition: .2s;
`;

enum BlockStatus {
    Empty,
    FullNotClicked,
    FullClicked,
    BeforeWrong,
    Wrong
}

type BlockProps = {
    noBorderLeft?: boolean,
    noBorderRight?: boolean,
    noBorderTop?: boolean,
    blockStatus?: BlockStatus
};

const Block = styled.div<BlockProps>`
  width: ${stageWidth / 4 - 1}px;
  height: ${stageWidth / 4}px;
  border: 1px solid #b8dfe6;
  border-left: ${props => props.noBorderLeft ? 'none' : '1px solid #b8dfe6'};
  border-right: ${props => props.noBorderRight ? 'none' : '1px solid #b8dfe6'};
  border-top: ${props => props.noBorderTop ? 'none' : '1px solid #b8dfe6'};
  padding: 10px;

  background: ${props => {
    switch (props.blockStatus) {
      case BlockStatus.FullNotClicked:
        return `url("${ClickBefore}") no-repeat center`;
      case BlockStatus.FullClicked:
        return `url("${ClickAfter}") no-repeat center`;
      case null:
        return 'null'
      case BlockStatus.Empty:
        return 'null';
      case BlockStatus.Wrong:
        return `url("${Wrong}") no-repeat center`;
      case BlockStatus.BeforeWrong:
        return `url("${Wrong}") no-repeat center`;
    }
  }};
  background-size: auto 100%;
  animation: ${props => props.blockStatus === BlockStatus.BeforeWrong ? 'fade 0.3s infinite' : 'null'};
`;

const RemainTimeBoard: React.FC<{ remaining: number }> = ({remaining}) => {
    const remainSecond = (remaining / Second).toFixed(2);
    return <div style={{position: "fixed", top: 10, color: 'red', zIndex: 999, fontWeight: 'bolder', fontSize: '2em'}}>
        {remainSecond}s.
    </div>
}

const genGame = () => {
    return new DtWhiteBlock(new SequenceGenerator(4).generator(), 20);
};


export const BasicGame: React.FC = () => {
    const totalGameTime = 20 * Second;
    const [game, setGame] = useState(genGame);
    const [gameState, setGameState] = useGameState();
    const [gameStep, setGameStep] = useState(0);
    const [beforeFail, setBeforeFail] = useState(false);
    const [currentClick, setCurrentClick] = useState(-1);
    const [currentRemain, setCurrentRemain] = useState(totalGameTime);
    const {startTick, stopTick} = useGameTicker(
        (remaining) => {
            setCurrentRemain(remaining)
        }, () => {
            setCurrentRemain(0);
        },
        Second / 100,
        totalGameTime
    );
    const column2props = (
        columnFullIndex: number,
        rowIndex: number,
        currentColumnIndex: number,
        clicked: boolean
    ) => {
        if (columnFullIndex === currentColumnIndex && gameStep > rowIndex) {
            return BlockStatus.FullClicked;
        } else if (columnFullIndex === currentColumnIndex && !(gameStep > rowIndex)) {
            return BlockStatus.FullNotClicked;
        } else if (gameState === GameState.Lose && gameStep === rowIndex && clicked) {
            return BlockStatus.Wrong;
        } else if (beforeFail && gameStep === rowIndex && clicked) {
            return BlockStatus.BeforeWrong;
        } else {
            return BlockStatus.Empty;
        }
    };
    const onBlockClick = (rowIndex: number, columnIndex: number) => {
        if (game.over) {
            return;
        }
        if (currentClick === -1) {
            startTick();
            console.log(new Date().getTime());
        }
        setCurrentClick(columnIndex);
        const gameState = game.step(columnIndex);
        if (gameState === GameState.Lose) {
            setBeforeFail(true);
            stopTick();
            setTimeout(() => {
                setGameStep(0);
                setBeforeFail(false);
                setCurrentClick(-1);
                setGameState(GameState.Lose);
                setGame(genGame);
            }, 1000);
        }
        setGameStep(game.currentStep);
    };
    return <Perspective>
        <RemainTimeBoard remaining={currentRemain}/>
        <Stage rotate={'60deg'}>
            {game.generated.map((indexColumnFull, rowIndex) => {
                if (rowIndex < gameStep - 3) {
                    return <></>
                }
                return <Row key={rowIndex} bottom={(rowIndex + 2 - gameStep) * blockSize}>
                    {
                        new Array(4).fill(0).map(
                            (_, columnIndex) =>
                                <Block
                                    key={columnIndex}
                                    onTouchStart={(e) => {
                                        onBlockClick(rowIndex, columnIndex);
                                    }}
                                    onMouseDown={(e) => {
                                        onBlockClick(rowIndex, columnIndex);
                                    }}
                                    onTouchEnd={(e) => e.preventDefault()}
                                    onMouseUp={(e) => e.preventDefault()}
                                    blockStatus={column2props(
                                        indexColumnFull,
                                        rowIndex,
                                        columnIndex,
                                        currentClick === columnIndex
                                    )}
                                />
                        )
                    }
                </Row>;
            })}
        </Stage>
    </Perspective>;
};