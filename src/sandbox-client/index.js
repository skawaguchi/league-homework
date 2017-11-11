import React from 'react';
import ReactDOM from 'react-dom';
import SandboxClientApp from './SandboxClientApp';

import '../../styles/sandbox-client.css';

function App() {
    return (
        <SandboxClientApp/>
    );
}

const mountNode = global.document.getElementById('sandbox-client-app');

ReactDOM.render(<App/>, mountNode);
