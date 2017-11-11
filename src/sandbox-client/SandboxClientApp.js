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
                    <p>{'This tool allows you to subtract time ranges from a set of time ranges. Simply enter dates in either of the first two inputs. You may only use 24-hour formatting. Follow this input format. For multiple ranges, separate your ranges with a comma.'}
                    </p>
                    <p>
                        <code>{'hh:mm-hh:mm'}</code>
                    </p>
                </section>
                <SandboxClientConnector/>
                <TestExamplesConnector/>
            </main>
        </StoreProvider>
    );
}

export default SandboxApp;
