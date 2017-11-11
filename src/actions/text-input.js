import { UPDATE_TEXT } from './list';

export function updateText(target, text) {
    return {
        payload: {
            target,
            text
        },
        type: UPDATE_TEXT
    };
}
