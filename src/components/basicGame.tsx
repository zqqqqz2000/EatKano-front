import React, {useState} from "react";
import styled from "@emotion/styled";
import {DtWhiteBlock, SequenceGenerator} from "../core/games/dtWhiteBlock/dtWhiteBlock";

const stageWidth = 640;

const Stage = styled.div`
  height: 100vh;
  width: ${stageWidth}px;
  overflow: hidden;
  position: fixed;
  bottom: 0;
`;

const Row = styled.div`
  display: flex;
  width: ${stageWidth}px;
  height: ${stageWidth / 4}px;
  justify-content: center;
`;

const Block = styled.div<{noBorderLeft?: boolean, noBorderRight?: boolean, noBorderTop?: boolean}>`
  width: ${stageWidth / 4 - 1}px;
  height: ${stageWidth / 4}px;
  border: 1px solid #b8dfe6;
  border-left: ${props => props.noBorderLeft ? 'none' : '1px solid #b8dfe6'};
  border-right: ${props => props.noBorderRight ? 'none' : '1px solid #b8dfe6'};
  border-top: ${props => props.noBorderTop ? 'none': '1px solid #b8dfe6'};
`;

export const BasicGame: React.FC = () => {
    const [game, setGame] = useState(new DtWhiteBlock(new SequenceGenerator(4).generator(), 8));
    return <Stage>
        {game.generated.slice(game.currentStep).map((row, i) => <Row key={i}>
            <Block noBorderLeft noBorderTop/>
            <Block noBorderLeft noBorderTop/>
            <Block noBorderLeft noBorderTop/>
            <Block noBorderRight noBorderLeft noBorderTop/>
        </Row>)}
    </Stage>
}