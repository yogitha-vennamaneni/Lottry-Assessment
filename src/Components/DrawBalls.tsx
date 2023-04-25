import React from 'react';
import { GeneratorContext } from '../Providers/GeneratorProvider';
import { Table } from './Table';
import "./Loader.scss";
import "./TableStyles.scss";
import Button from '@mui/material/Button';

const maxTBallChartColCount = 10;

function DrawBall () {
    const generatorContext = React.useContext(GeneratorContext);

    return <div>
        <Button variant='contained' onClick={generatorContext.drawBalls} disabled={generatorContext.isBallsDrawing}>
            Draw Balls
        </Button>
        <br/>
        <br/>
        <div>            
            <div>
                {generatorContext.isBallsDrawing && 
                    <div 
                        role="ball"
                        id="loader" 
                        className={
                            generatorContext.recentBall !== 0 ? 
                                "ball-color-" + Math.floor(generatorContext.recentBall / 10 + 1 ) 
                                : ""}>
                        {generatorContext.isBallRoatating && generatorContext.recentBall !== 0 ? generatorContext.recentBall : "" }
                    </div>
                }
            </div>
            <Table 
                title='Balls Drawn' 
                rowCount={
                    generatorContext.maximumValue / maxTBallChartColCount + 
                    (generatorContext.maximumValue % maxTBallChartColCount != 0 ? 1 : 0)
                } 
                columnsCount={(generatorContext.maximumValue < maxTBallChartColCount ? 
                    generatorContext.maximumValue : maxTBallChartColCount)
                }
                cellClassName={(rowIndex: number, colIndex: number) => {
                    let value = rowIndex * maxTBallChartColCount + colIndex + 1;
                    let isBallDrawed = generatorContext.ballsDrawn[value];
                    return (isBallDrawed ? "ballDrawed-"+(rowIndex+1) : "")
                }}
                fetchData={(rowIndex: number, colIndex: number) => { 
                    let value = rowIndex * maxTBallChartColCount + colIndex + 1;
                    if(generatorContext.ballsDrawn[value]) {
                        return <span>{value}</span>;
                    }
                }}
            />
        </div>
    </div>;
}


export default DrawBall