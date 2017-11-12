import React from 'react';
import { Provider as StoreProvider } from 'react-redux';

import SandboxClientConnector from './SandboxClientConnector';
import TestExamplesConnector from './TestExamplesConnector';

import { makeStore } from '../factories/store-factory';

function SandboxApp() {
    const store = makeStore();

    return (
        <StoreProvider store={store}>
            <main className='sandbox-client-app'>
                <h1>{'Time Range Parser'}</h1>
                <section className='instructions'>
                    <p>{'This tool allows you to subtract time ranges from a set of time ranges. ' +
                    'Simply enter dates in either of the first two inputs. '}</p>
                    <ul>
                        <li>{'Follow this input format:'} <code>{'hh:mm-hh:mm'}</code></li>
                        <li>{'You may only use 24-hour formatting.'} <code>{'1:00-21:00'}</code> {'is equal to "1am ' +
                        'to 9pm"'}</li>
                        <li>{'For multiple ranges, separate your ranges with a comma.'} <code>{'9:30-13:00, ' +
                        '12:00-18:00'}</code></li>
                    </ul>
                </section>

                <SandboxClientConnector/>

                <h2>{'Example Cases'}</h2>
                <TestExamplesConnector/>
            </main>
        </StoreProvider>
    );
}

export default SandboxApp;
