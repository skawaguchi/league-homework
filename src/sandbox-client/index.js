import React from 'react';
import ReactDOM from 'react-dom';
import SandboxClient from './SandboxClient';

import '../../styles/sandbox-client.css';

function SandboxClientApp() {
    return (
        <main>
            <h1>{'Time Range Parser'}</h1>

            <SandboxClient
                defaultBaseRangeText={'9:00-11:00, 13:00-15:00'}
                defaultSubtractiveRangeText={'9:00-9:15, 10:00-10:15, 12:30-16:00'}
            />

            <h3>{'Instructions'}</h3>
            <p>
                {'Enter base ranges in the first input, and ranges to be subtracted in the second input. You may click on the Calculate button or hit Enter on your keyboard. You must follow the format (items in the braces are optional):'}
            </p>
            <p>
                <code>{'hh:mm-hh:mm[, hh:mm-hh:mm]'}</code>
            </p>
            <p>
                For example:
            </p>
            <p>
                <code>{'9:35-10:00'}</code><br/>
                <code>{'9:35-10:00, 11:00-16:00'}</code>
            </p>

            <h2>{'Notes on Date Formats'}</h2>
            <ul>
                <li>{'Use 24-hour times. AM/PM is not supported'}</li>
            </ul>

            <code>
                {'(9:00-10:00) "minus" (9:00-9:30) = (9:30-10:00)'}
                <br/>
                {'(9:00-10:00) "minus" (9:00-10:00) = ()'}<br/>
                {'(9:00-9:30) "minus" (9:30-15:00) = (9:00-9:30)'}<br/>
                {'(9:00-9:30, 10:00-10:30) "minus" (9:15-10:15) = (9:00-9:15, 10:15-10:30)'}<br/>
                {'(9:00-11:00, 13:00-15:00) "minus" (9:00-9:15, 10:00-10:15, 12:30-16:00) = (9:15-10:00, 10:15-11:00)'}
            </code>
        </main>
    );
}

const mountNode = global.document.getElementById('sandbox-client-app');
ReactDOM.render(<SandboxClientApp/>, mountNode);
