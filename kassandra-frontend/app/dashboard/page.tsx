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
            {/* Toast Container */}
            <Toaster toasts={toasts} onDismiss={dismiss} />

            {/* Header */}
            <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 py-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Prediction Dashboard</h1>
                        <p className="text-muted-foreground">
                            Generate sentiment-aware stock predictions using multi-source data fusion
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Input Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Configure Prediction</CardTitle>
                        <CardDescription>
                            Enter stock symbol and date range to generate prediction
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="stock" className="text-sm font-medium">
                                Stock Ticker Symbol
                            </label>
                            <Input
                                id="stock"
                                placeholder="e.g., TSLA, NVDA, AAPL"
                                value={stock}
                                onChange={(e) => setStock(e.target.value.toUpperCase())}
                                className="max-w-md"
                                disabled={isLoading}
                            />
                            <p className="text-xs text-muted-foreground">
                                Enter a valid stock ticker symbol
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Start Date</label>
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    className="rounded-md border"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">End Date</label>
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    className="rounded-md border"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleRunPrediction}
                            disabled={isLoading || !stock || !startDate || !endDate}
                            size="lg"
                            className="w-full md:w-auto"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="mr-2 h-4 w-4 animate-spin"
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
                                    Running Model…
                                </>
                            ) : (
                                'Run Prediction'
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Predicted Price Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Predicted Next-Day Closing Price</CardTitle>
                            <CardDescription>
                                ML-generated forecast based on sentiment fusion
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <>
                                    <div className="flex items-baseline gap-2">
                                        <Skeleton className="h-14 w-40" />
                                        <Skeleton className="h-4 w-8" />
                                    </div>
                                    <Skeleton className="mt-4 h-3 w-48" />
                                </>
                            ) : hasData ? (
                                <>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold">${predictionState.data!.predicted_close.toFixed(2)}</span>
                                        <span className="text-sm text-muted-foreground">USD</span>
                                    </div>
                                    <p className="mt-4 text-xs text-muted-foreground">
                                        Generated on {new Date(predictionState.data!.last_updated).toLocaleString()}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold text-muted-foreground">—</span>
                                        <span className="text-sm text-muted-foreground">USD</span>
                                    </div>
                                    <p className="mt-4 text-xs text-muted-foreground">
                                        Run a prediction to see results
                                    </p>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Sentiment Breakdown Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Sentiment Breakdown</CardTitle>
                            <CardDescription>
                                Multi-source sentiment analysis
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {isLoading ? (
                                <>
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-6 w-16" />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">News Sentiment</span>
                                        <Badge variant={hasData ? 'default' : 'outline'}>
                                            {hasData ? predictionState.data!.sentiment_breakdown.news_sentiment.toFixed(4) : '—'}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Wikipedia Views</span>
                                        <Badge variant="outline">
                                            {hasData ? predictionState.data!.sentiment_breakdown.wikipedia_views.toFixed(0) : '—'}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Google Trends</span>
                                        <Badge variant="outline">
                                            {hasData ? predictionState.data!.sentiment_breakdown.google_trends_score.toFixed(2) : '—'}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between border-t pt-4">
                                        <span className="text-sm font-medium">Combined Score</span>
                                        <Badge variant={hasData ? 'default' : 'outline'}>
                                            {hasData ? predictionState.data!.sentiment_breakdown.combined_sentiment.toFixed(4) : '—'}
                                        </Badge>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* CSV Download Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Export Data</CardTitle>
                        <CardDescription>
                            Download prediction results and feature data
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                variant="outline"
                                disabled={!hasData}
                                onClick={handleDownloadFeatures}
                                className="flex-1 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Download Feature CSV
                            </Button>
                            <Button
                                variant="outline"
                                disabled={!hasData}
                                onClick={handleDownloadPredictions}
                                className="flex-1 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Download Prediction Log CSV
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {hasData
                                ? 'Click buttons above to download CSV files'
                                : 'Run a prediction to enable CSV export'}
                        </p>
                    </CardContent>
                </Card>

                {/* Status Footer */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Last Updated</p>
                                {isLoading ? (
                                    <Skeleton className="h-4 w-48" />
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        {hasData ? new Date(predictionState.data!.last_updated).toLocaleString() : '—'}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Data Source Status</p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                        <div className={`mr-1 h-2 w-2 rounded-full ${hasData ? 'bg-green-500' : 'bg-muted'}`} />
                                        Yahoo Finance
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        <div className={`mr-1 h-2 w-2 rounded-full ${hasData ? 'bg-green-500' : 'bg-muted'}`} />
                                        Google News
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        <div className={`mr-1 h-2 w-2 rounded-full ${hasData ? 'bg-green-500' : 'bg-muted'}`} />
                                        Google Trends
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        <div className={`mr-1 h-2 w-2 rounded-full ${hasData ? 'bg-green-500' : 'bg-muted'}`} />
                                        Wikipedia
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
