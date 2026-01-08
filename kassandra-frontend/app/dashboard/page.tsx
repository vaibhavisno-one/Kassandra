'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';

export default function DashboardPage() {
    const [stock, setStock] = useState('');
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const handleRunPrediction = () => {
        // No backend call - just UI interaction
        console.log('Prediction requested for:', { stock, startDate, endDate });
    };

    return (
        <div className="min-h-screen bg-background">
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
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">End Date</label>
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    className="rounded-md border"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleRunPrediction}
                            disabled={!stock || !startDate || !endDate}
                            size="lg"
                            className="w-full md:w-auto"
                        >
                            Run Prediction
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
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-bold text-muted-foreground">—</span>
                                <span className="text-sm text-muted-foreground">USD</span>
                            </div>
                            <p className="mt-4 text-xs text-muted-foreground">
                                Run a prediction to see results
                            </p>
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
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">News Sentiment</span>
                                <Badge variant="outline">—</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Wikipedia Views</span>
                                <Badge variant="outline">—</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Google Trends</span>
                                <Badge variant="outline">—</Badge>
                            </div>
                            <div className="flex items-center justify-between border-t pt-4">
                                <span className="text-sm font-medium">Combined Score</span>
                                <Badge variant="outline">—</Badge>
                            </div>
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
                            <Button variant="outline" disabled className="flex-1">
                                Download Feature CSV
                            </Button>
                            <Button variant="outline" disabled className="flex-1">
                                Download Prediction Log CSV
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            CSV downloads will be available after running a prediction
                        </p>
                    </CardContent>
                </Card>

                {/* Status Footer */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Last Updated</p>
                                <p className="text-sm text-muted-foreground">—</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Data Source Status</p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                        <div className="mr-1 h-2 w-2 rounded-full bg-muted" />
                                        Yahoo Finance
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        <div className="mr-1 h-2 w-2 rounded-full bg-muted" />
                                        Google News
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        <div className="mr-1 h-2 w-2 rounded-full bg-muted" />
                                        Google Trends
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        <div className="mr-1 h-2 w-2 rounded-full bg-muted" />
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
