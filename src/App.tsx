import React, { useState } from 'react';
import CreateTicket from './Components/CreateTicket';
import { GeneratorProvider } from './Providers/GeneratorProvider';
import DrawBall from './Components/DrawBalls';
import Reset from './Components/Reset';

function App() {
    const [ticket, setTicket] = useState(Array<number>());

    return (
        <GeneratorProvider>
            <div>
                <Reset setTicket={setTicket} />
                <br/>
                <br/>
                <CreateTicket ticket={ticket} updateTicket={setTicket} />
                <br/>
                <br/>
                <DrawBall/>
            </div>
        </GeneratorProvider>
    )
}

export default App;