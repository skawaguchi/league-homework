function noOp() {
    /* noOp */
}

export function mockStore(state, dispatchStub) {
    return {
        dispatch: dispatchStub || noOp,
        getState: () => state,
        subscribe: noOp
    };
}
