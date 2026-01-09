'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { runPrediction, getFeaturesCsvUrl, getPredictionsCsvUrl, type PredictionResponse, type ApiError } from '@/lib/api';
import { format } from 'date-fns';

type PredictionStatus = 'idle' | 'loading' | 'success' | 'error';

interface PredictionState {
    status: PredictionStatus;
    data: PredictionResponse | null;
    error: string | null;
}

export default function DashboardPage() {
    const [stock, setStock] = useState('');
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [predictionState, setPredictionState] = useState<PredictionState>({
        status: 'idle',
        data: null,
        error: null,
    });
    const { toast, toasts, dismiss } = useToast();

    const handleRunPrediction = async () => {
        if (!stock || !startDate || !endDate) return;

        setPredictionState({
            status: 'loading',
            data: null,
            error: null,
        });

        try {
            const prediction = await runPrediction(
                stock,
                format(startDate, 'yyyy-MM-dd'),
                format(endDate, 'yyyy-MM-dd')
            );
            setPredictionState({
                status: 'success',
                data: prediction,
                error: null,
            });
        } catch (err) {
            const apiError = err as ApiError;
            setPredictionState({
                status: 'idle',
                data: null,
                error: apiError.message,
            });

            // Show error toast
            toast({
                variant: 'error',
                description: apiError.message,
            });
        }
    };

    const handleDownloadFeatures = async () => {
        if (!predictionState.data?.feature_csv_path) return;

        try {
            const url = getFeaturesCsvUrl(predictionState.data.feature_csv_path);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Download failed');
            }

            // If successful, open in new tab
            window.open(url, '_blank');
        } catch (error) {
            toast({
                variant: 'error',
                description: 'Failed to download feature CSV. The file may not be available.',
            });
        }
    };

    const handleDownloadPredictions = async () => {
        if (!predictionState.data?.prediction_csv_path) return;

        try {
            const url = getPredictionsCsvUrl(predictionState.data.prediction_csv_path);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Download failed');
            }

            // If successful, open in new tab
            window.open(url, '_blank');
        } catch (error) {
            toast({
                variant: 'error',
                description: 'Failed to download prediction CSV. The file may not be available.',
            });
        }
    };

    const isLoading = predictionState.status === 'loading';
    const hasData = predictionState.status === 'success' && predictionState.data !== null;

    return (
        <div className="min-h-screen bg-background">
            <Toaster toasts={toasts} onDismiss={dismiss} />

            <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
                <header className="mb-8">
                    <p className="text-xxl uppercase md:text-2xl tracking-wider font-bold text-foreground font-medium mb-1">Dashboard</p>
                    <h1 className="text-xl md:text-xl font-semibold tracking-tight text-muted-foreground">
                        Predictions
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <Card className="md:col-span-4 border border-border rounded-2xl">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium tracking-tight">Ticker</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                id="stock"
                                placeholder="NYSE"
                                value={stock}
                                onChange={(e) => setStock(e.target.value.toUpperCase())}
                                className="h-10 text-lg font-mono tracking-wide border-border bg-muted/30 focus-visible:ring-1 focus-visible:ring-ring transition-colors rounded-xl"
                                disabled={isLoading}
                            />
                            <Button
                                onClick={handleRunPrediction}
                                disabled={isLoading || !stock || !startDate || !endDate}
                                className="w-full h-10 text-sm font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <svg
                                            className="mr-2 h-3.5 w-3.5 animate-spin"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Running…
                                    </>
                                ) : (
                                    'Run Prediction'
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-4 border border-border rounded-2xl">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium tracking-tight">Start Date</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                className="
    rounded-xl
    border border-border/60
    bg-background
    p-3
    text-sm
  "
                                classNames={{
                                    months: "space-y-3",
                                    month: "space-y-2",
                                    caption:
                                        "flex items-center justify-between px-1 text-sm font-medium",
                                    caption_label: "text-sm tracking-tight",
                                    nav: "flex items-center gap-1",
                                    nav_button:
                                        "h-7 w-7 rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                                    table: "w-full border-collapse",
                                    head_row: "flex",
                                    head_cell:
                                        "w-9 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground",
                                    row: "flex w-full mt-1",
                                    cell:
                                        "relative h-9 w-9 p-0 text-center text-sm font-mono tabular-nums",
                                    day:
                                        "h-9 w-9 rounded-md hover:bg-muted transition-colors",
                                    day_selected:
                                        "bg-foreground text-background hover:bg-foreground",
                                    day_today:
                                        "border border-border text-foreground",
                                    day_outside:
                                        "text-muted-foreground opacity-40",
                                    day_disabled:
                                        "text-muted-foreground opacity-30",
                                }}
                            />

                        </CardContent>
                    </Card>

                    <Card className="md:col-span-4 border border-border rounded-2xl">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium tracking-tight">End Date</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                className="
    rounded-xl
    border border-border/60
    bg-background
    p-3
    text-sm
  "
                                classNames={{
                                    months: "space-y-3",
                                    month: "space-y-2",
                                    caption:
                                        "flex items-center justify-between px-1 text-sm font-medium",
                                    caption_label: "text-sm tracking-tight",
                                    nav: "flex items-center gap-1",
                                    nav_button:
                                        "h-7 w-7 rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                                    table: "w-full border-collapse",
                                    head_row: "flex",
                                    head_cell:
                                        "w-9 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground",
                                    row: "flex w-full mt-1",
                                    cell:
                                        "relative h-9 w-9 p-0 text-center text-sm font-mono tabular-nums",
                                    day:
                                        "h-9 w-9 rounded-md hover:bg-muted transition-colors",
                                    day_selected:
                                        "bg-foreground text-background hover:bg-foreground",
                                    day_today:
                                        "border border-border text-foreground",
                                    day_outside:
                                        "text-muted-foreground opacity-40",
                                    day_disabled:
                                        "text-muted-foreground opacity-30",
                                }}
                            />

                        </CardContent>
                    </Card>

                    <Card className="md:col-span-8 border border-border rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs text-muted-foreground uppercase tracking-wider">Predicted Close</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            {isLoading ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-16 w-56" />
                                    <Skeleton className="h-3 w-40" />
                                </div>
                            ) : hasData ? (
                                <div className="space-y-1">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl md:text-6xl font-semibold tracking-tighter text-foreground tabular-nums font-mono">
                                            ${predictionState.data!.predicted_close.toFixed(2)}
                                        </span>
                                        <span className="text-sm text-muted-foreground font-medium">USD</span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground/70 font-mono tabular-nums">
                                        {new Date(predictionState.data!.last_updated).toLocaleString()}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <span className="text-5xl md:text-6xl font-semibold text-muted-foreground/20 tabular-nums font-mono">—</span>
                                    <p className="text-[11px] text-muted-foreground/50">
                                        Awaiting prediction
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-4 border border-border rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs text-muted-foreground uppercase tracking-wider">Sentiment</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            {isLoading ? (
                                <div className="space-y-2.5">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <Skeleton className="h-3 w-16" />
                                            <Skeleton className="h-4 w-14" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between py-0.5">
                                        <span className="text-xs text-muted-foreground">News</span>
                                        <span className="text-xs font-mono tabular-nums text-foreground">
                                            {hasData ? predictionState.data!.sentiment_breakdown.news_sentiment.toFixed(4) : '—'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-0.5">
                                        <span className="text-xs text-muted-foreground">Wikipedia</span>
                                        <span className="text-xs font-mono tabular-nums text-foreground">
                                            {hasData ? predictionState.data!.sentiment_breakdown.wikipedia_views.toFixed(0) : '—'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-0.5">
                                        <span className="text-xs text-muted-foreground">Trends</span>
                                        <span className="text-xs font-mono tabular-nums text-foreground">
                                            {hasData ? predictionState.data!.sentiment_breakdown.google_trends_score.toFixed(2) : '—'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-1 mt-1.5 pt-1.5 border-t border-border/50">
                                        <span className="text-xs font-medium text-foreground">Combined</span>
                                        <span className="text-xs font-mono font-medium tabular-nums text-foreground">
                                            {hasData ? predictionState.data!.sentiment_breakdown.combined_sentiment.toFixed(4) : '—'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-6 border border-border rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs text-muted-foreground uppercase tracking-wider">Export</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    disabled={!hasData}
                                    onClick={handleDownloadFeatures}
                                    className="flex-1 h-9 text-xs font-medium rounded-lg border-border/70 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted/50"
                                >
                                    Features CSV
                                </Button>
                                <Button
                                    variant="outline"
                                    disabled={!hasData}
                                    onClick={handleDownloadPredictions}
                                    className="flex-1 h-9 text-xs font-medium rounded-lg border-border/70 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted/50"
                                >
                                    Predictions CSV
                                </Button>
                            </div>
                            {!hasData && (
                                <p className="text-[10px] text-muted-foreground/60 mt-2">
                                    Run a prediction first
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-6 border border-border rounded-2xl">
                        <CardContent className="py-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60">Updated</p>
                                    {isLoading ? (
                                        <Skeleton className="h-4 w-28" />
                                    ) : (
                                        <p className="text-xs font-mono tabular-nums text-foreground">
                                            {hasData ? new Date(predictionState.data!.last_updated).toLocaleString() : '—'}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Badge variant="outline" className="text-[12px] font-normal px-1.5 py-0 h-10 rounded-md bg-muted/50 border-0">
                                        <span className={`mr-1 h-2 w-2 rounded-full inline-block ${hasData ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                                        Yahoo
                                    </Badge>
                                    <Badge variant="outline" className="text-[12px] font-normal px-1.5 py-0 h-10 rounded-md bg-muted/50 border-0">
                                        <span className={`mr-1 h-2 w-2 rounded-full inline-block ${hasData ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                                        News
                                    </Badge>
                                    <Badge variant="outline" className="text-[12px] font-normal px-1.5 py-0 h-10 rounded-md bg-muted/50 border-0">
                                        <span className={`mr-1 h-2 w-2 rounded-full inline-block ${hasData ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                                        Trends
                                    </Badge>
                                    <Badge variant="outline" className="text-[12px] font-normal px-1.5 py-0 h-10 rounded-md bg-muted/50 border-0">
                                        <span className={`mr-1 h-2 w-2 rounded-full inline-block ${hasData ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                                        Wiki
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
