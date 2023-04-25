import React from 'react';
import { GeneratorContext } from '../Providers/GeneratorProvider';
import Button from '@mui/material/Button';

function Reset(props: any) {
    const generatorContext = React.useContext(GeneratorContext);

    const reset = () => {
        props.setTicket([]);
        if (generatorContext.resetBalls) {
            generatorContext.resetBalls();
        }
    }
    return <Button variant="contained" onClick={reset}>Reset</Button>;
}

export default Reset;