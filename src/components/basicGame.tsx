import React, {useState} from "react";
import styled from "@emotion/styled";
import ClickBefore from "../image/BeforeClick.png";
import ClickAfter from "../image/AfterClick.png";
import {DtWhiteBlock, SequenceGenerator} from "../core/games/dtWhiteBlock/dtWhiteBlock";
import {GameState} from "../core/games/state";
import {useGameState} from "./hooks";

const stageWidth = Math.min(window.innerWidth, 640);
const blockSize = stageWidth / 4;

const Stage = styled.div`
  height: calc(100vh + ${blockSize * 2}px);
  bottom: ${-blockSize}px;
  width: ${stageWidth}px;
  overflow: hidden;
  position: fixed;
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
        return '#ff0000';
      case BlockStatus.BeforeWrong:
        return '#ff0000';
    }
  }};
  background-size: auto 100%;
  animation: ${props => props.blockStatus === BlockStatus.BeforeWrong ? 'fade 0.3s infinite' : 'null'};
`;

const genGame = () => {
    return new DtWhiteBlock(new SequenceGenerator(4).generator(), 8);
};


export const BasicGame: React.FC = () => {
    const [game, setGame] = useState(genGame);
    const [gameState, setGameState] = useGameState();
    const [gameStep, setGameStep] = useState(0);
    const [beforeFail, setBeforeFail] = useState(false);
    const [currentClick, setCurrentClick] = useState(-1);
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
        setCurrentClick(columnIndex);
        const gameState = game.step(columnIndex);
        if (gameState === GameState.Lose) {
            setBeforeFail(true);
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
    return <Stage>
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
};