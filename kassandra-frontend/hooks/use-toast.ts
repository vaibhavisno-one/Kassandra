'use client';

import * as React from 'react';
import type { Toast } from '@/components/ui/toast';

type ToasterToast = Toast;

const TOAST_LIMIT = 3;

interface State {
    toasts: ToasterToast[];
}

type Action =
    | { type: 'ADD_TOAST'; toast: ToasterToast }
    | { type: 'DISMISS_TOAST'; toastId: string };

let count = 0;

function genId() {
    count = (count + 1) % Number.MAX_VALUE;
    return count.toString();
}

const toastReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_TOAST':
            return {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            };

        case 'DISMISS_TOAST':
            return {
                ...state,
                toasts: state.toasts.filter((t) => t.id !== action.toastId),
            };

        default:
            return state;
    }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
    memoryState = toastReducer(memoryState, action);
    listeners.forEach((listener) => {
        listener(memoryState);
    });
}

interface ToastOptions {
    title?: string;
    description?: string;
    variant?: 'default' | 'error' | 'success';
}

function toast(options: ToastOptions) {
    const id = genId();

    dispatch({
        type: 'ADD_TOAST',
        toast: {
            ...options,
            id,
        },
    });

    return {
        id,
        dismiss: () => dispatch({ type: 'DISMISS_TOAST', toastId: id }),
    };
}

export function useToast() {
    const [state, setState] = React.useState<State>(memoryState);

    React.useEffect(() => {
        listeners.push(setState);
        return () => {
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [state]);

    return {
        ...state,
        toast,
        dismiss: (toastId: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
    };
}
