import React from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router, 
    Route 
} from 'react-router-dom';


const App = () => { 
    return <div> 
        Hello World
    </div>
}


ReactDOM.render(
    <App />,
    document.getElementById('app'),
);