import React from 'react';
import generateUniqueRandomNumber from '../Functions/GenerateUniqueRandomNumber';
import { GeneratorContext } from '../Providers/GeneratorProvider';
import { Table } from './Table';
import Button from '@mui/material/Button';

const styles = {
    ballDrawed : {
        color: 'white',
        backgroundColor: 'green',
    }
};
const maxTicketColCount = 5;

function CreateTicket(props: any) {
    const generatorContext = React.useContext(GeneratorContext);

    const generateTicket = (maxNumber: number, ticketLength: number) => {
        let generatedNumbers: number[] = [];

        while(ticketLength > 0) {
            // Generate a new random number until it is unique
            let randomNumber: number = generateUniqueRandomNumber(generatedNumbers, maxNumber);
            generatedNumbers.push(randomNumber);
            ticketLength--;
        }

        return generatedNumbers;
    }

    const createTicket = () => {
        if(generatorContext.resetBalls) {
            generatorContext.resetBalls();
        }
        props.updateTicket(generateTicket(generatorContext.maximumValue, generatorContext.ticketLength).sort((a,b) => a-b));
    }

    return <div>
        <Button variant='contained' onClick={createTicket} disabled={generatorContext.isBallsDrawing}>
            Create a Ticket
        </Button>
        <br/>
        <br/>
        <div>
            {props.ticket.length > 0 && 
                <Table 
                    title='Ticket' 
                    rowCount={
                        generatorContext.ticketLength / maxTicketColCount + 
                        (generatorContext.ticketLength % maxTicketColCount != 0 ? 1 : 0)
                    } 
                    columnsCount={
                        (generatorContext.ticketLength < maxTicketColCount ? generatorContext.ticketLength : 5)
                    }
                    cellStyles={(rowIndex: number, colIndex: number) => {
                        let index = rowIndex * maxTicketColCount + colIndex;
                        let value = props.ticket[index];
                        let isBallDrawed = generatorContext.ballsDrawn[value];
                        return (isBallDrawed ? styles.ballDrawed : {})
                    }}
                    fetchData={(rowIndex: number, colIndex: number) => {
                        let index = rowIndex * maxTicketColCount + colIndex;
                        let value = props.ticket[index];
                        return <span key={index}>{value}</span>;
                    }}
                />
            }
        </div>
    </div>;
}

export default CreateTicket;