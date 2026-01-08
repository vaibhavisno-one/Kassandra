'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface Toast {
    id: string;
    title?: string;
    description?: string;
    variant?: 'default' | 'error' | 'success';
}

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
    toast: Toast;
    onDismiss: (id: string) => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
    ({ toast, onDismiss, className, ...props }, ref) => {
        React.useEffect(() => {
            const timer = setTimeout(() => {
                onDismiss(toast.id);
            }, 4500);

            return () => clearTimeout(timer);
        }, [toast.id, onDismiss]);

        return (
            <div
                ref={ref}
                className={cn(
                    'pointer-events-auto relative flex w-full max-w-md items-start gap-3 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all',
                    'animate-in slide-in-from-top-full duration-300',
                    {
                        'bg-background border-border': toast.variant === 'default',
                        'bg-destructive/10 border-destructive text-destructive': toast.variant === 'error',
                        'bg-green-500/10 border-green-500 text-green-600': toast.variant === 'success',
                    },
                    className
                )}
                {...props}
            >
                <div className="flex-1 space-y-1">
                    {toast.title && (
                        <div className="text-sm font-semibold">{toast.title}</div>
                    )}
                    {toast.description && (
                        <div className="text-sm opacity-90">{toast.description}</div>
                    )}
                </div>
                <button
                    onClick={() => onDismiss(toast.id)}
                    className="absolute right-2 top-2 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        );
    }
);
Toast.displayName = 'Toast';

interface ToasterProps {
    toasts: Toast[];
    onDismiss: (id: string) => void;
}

export function Toaster({ toasts, onDismiss }: ToasterProps) {
    return (
        <div className="fixed top-0 right-0 z-50 flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]">
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
            ))}
        </div>
    );
}

export { Toast };
