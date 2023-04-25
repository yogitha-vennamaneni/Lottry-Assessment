import React, { useState, createContext, useEffect } from "react";
import generateUniqueRandomNumber from "../Functions/GenerateUniqueRandomNumber";

type generatorContextType = {
    maximumValue: number,
    ticketLength: number,
    maxBallsCount: number,
    balls: number[],
    ballsDrawn: boolean[],
    drawBalls?: () => void,
    resetBalls?: () => void,
    isBallsDrawing: boolean,
    isBallRoatating: boolean,
    recentBall: number,
}
const maximumValue = 80;
const defaultBallsValue : Array<boolean> = new Array<boolean>(maximumValue + 1);

for (let index = 0; index < maximumValue + 1; index++) {
    defaultBallsValue[index] = false;
}

const defaultValues : generatorContextType = {
    maxBallsCount: 20,
    maximumValue: maximumValue,
    ticketLength: 10,
    balls: [],
    ballsDrawn: defaultBallsValue,
    isBallsDrawing: false,
    isBallRoatating: false,
    recentBall: 0
};
const GeneratorContext = createContext(defaultValues);

function GeneratorProvider(props: any) { 
    const [balls, setBalls] = useState(Array<number>());
    const [ recentBall, setRecentBall] = useState(0);
    const [ballcount, setBallsCount] = useState(0);
    const [ballsDrawn, setBallsDrawn] = useState(defaultBallsValue);
    const [isBallsDrawing, setIsBallsDrawing] = useState(defaultValues.isBallsDrawing);
    const [isBallRoatating, setIsBallRotating] = useState(false);
    const [isReDraw, setIsReDraw] = useState(false);
    let interval: any = null;

    const drawBall = () => {
        let ball: number = generateUniqueRandomNumber(balls, defaultValues.maximumValue);
        setRecentBall(ball);
        let list: number[] = [...balls, ball].sort((a, b) => a - b);
        let drawList = [...ballsDrawn];
        drawList[ball] = true;
        setBalls(list);
        setBallsDrawn(drawList);
        setBallsCount(ballcount + 1);
    }
  
    const drawBalls = () => {
        if(ballcount == defaultValues.maxBallsCount) {
            setIsReDraw(true);
            resetBalls();
        }
        setIsBallsDrawing(true);
        triggerBallDraw();
    }

    const triggerBallDraw = () => {
        if (ballcount < defaultValues.maxBallsCount) {
            setIsBallRotating(true);
            interval = setTimeout(() => {
                setIsReDraw(false);
                drawBall();
                setIsBallRotating(false);
            }, 2000);
        } else if (ballcount == defaultValues.maxBallsCount) {
            setIsBallsDrawing(false);
            setRecentBall(0);
            clearTimeout(interval);
        }
        return () => clearTimeout(interval);
    }

    useEffect(() => {
        if(ballcount >= 1 || isReDraw) {
            if(isReDraw) {                
                setIsBallsDrawing(true);
            }
            triggerBallDraw();
        }
    }, [balls, isReDraw]);

    useEffect(() => {
        let setInterval = setTimeout(() => {
            setRecentBall(0);
            clearTimeout(setInterval);
        }, 1000);
    }, [isBallRoatating])

    const resetBalls = () => {
        clearTimeout(interval);
        setBallsCount(0);
        setBalls([]);
        setBallsDrawn(defaultBallsValue);
        setIsBallsDrawing(false);
        setRecentBall(0);
    }

    const contextValue: generatorContextType = { 
        maximumValue: defaultValues.maximumValue,
        ticketLength: defaultValues.ticketLength,
        maxBallsCount: defaultValues.maxBallsCount,
        balls: balls,
        ballsDrawn: ballsDrawn,
        drawBalls: drawBalls,
        resetBalls: resetBalls,
        isBallsDrawing: isBallsDrawing,
        isBallRoatating: isBallRoatating,
        recentBall: recentBall,
    };    
    
    return <GeneratorContext.Provider value={contextValue}>
        {props.children}
    </GeneratorContext.Provider>
}

export {GeneratorProvider, GeneratorContext};