import React from 'react';
import ReactDOM from 'react-dom';
import SandboxClient from './SandboxClient';

import '../../styles/sandbox-client.css';

function SandboxClientApp() {
    return (
        <main>
            <h1>{'Time Range Parser'}</h1>

            <p>{'This tool allows you to subtract time ranges from a set of time ranges. Simply enter dates in either of the first two inputs. You may only use 24-hour formatting. Follow this input format. For multiple ranges, separate your ranges with a comma.'}
            </p>
            <p>
                <code>{'hh:mm-hh:mm'}</code>
            </p>

            <SandboxClient
                defaultBaseRangeText={'9:00-11:00, 13:00-15:00'}
                defaultSubtractiveRangeText={'9:00-9:15, 10:00-10:15, 12:30-16:00'}
            />

            <h2>Test Ranges</h2>
            <p>{'These were the ranges provided with the challenge to test against.'}</p>
            <ul className="example-ranges">
                <li><code>{'(9:00-10:00) "minus" (9:00-9:30) = (9:30-10:00)'}</code></li>
                <li><code>{'(9:00-10:00) "minus" (9:00-10:00) = ()'}</code></li>
                <li><code>{'(9:00-9:30) "minus" (9:30-15:00) = (9:00-9:30)'}</code></li>
                <li><code>{'(9:00-9:30, 10:00-10:30) "minus" (9:15-10:15) = (9:00-9:15, 10:15-10:30)'}</code></li>
                <li><code>{'(9:00-11:00, 13:00-15:00) "minus" (9:00-9:15, 10:00-10:15, 12:30-16:00) = (9:15-10:00, 10:15-11:00)'}</code></li>
            </ul>
        </main>
    );
}

const mountNode = global.document.getElementById('sandbox-client-app');

ReactDOM.render(<SandboxClientApp/>, mountNode);
