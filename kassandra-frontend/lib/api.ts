/**
 * API Client for Kassandra Stock Prediction Backend
 * 
 * Provides typed functions to interact with the FastAPI backend endpoints.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface PredictionRequest {
    stock: string;
    start_date: string;
    end_date: string;
}

export interface SentimentBreakdown {
    news_sentiment: number;
    news_article_count: number;
    google_trends_score: number;
    google_trends_delta_7d: number;
    wikipedia_views: number;
    wikipedia_views_delta: number;
    combined_sentiment: number;
}

export interface PredictionResponse {
    predicted_close: number;
    sentiment_breakdown: SentimentBreakdown;
    feature_csv_path: string;
    prediction_csv_path: string;
    last_updated: string;
}

export interface ApiError {
    type: 'invalid_ticker' | 'invalid_date_range' | 'rate_limited' | 'generic';
    message: string;
}

/**
 * Calculate trading days between two dates (rough estimate)
 */
function calculateTradingDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // Rough estimate: ~70% of days are trading days (5/7)
    return Math.floor(diffDays * 0.7);
}

/**
 * Run stock prediction
 */
export async function runPrediction(
    stock: string,
    startDate: string,
    endDate: string
): Promise<PredictionResponse> {
    // Validate date range (minimum 30 trading days)
    const tradingDays = calculateTradingDays(startDate, endDate);
    if (tradingDays < 30) {
        const error: ApiError = {
            type: 'invalid_date_range',
            message: 'Minimum 30 trading days required for prediction'
        };
        throw error;
    }

    const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stock,
            start_date: startDate,
            end_date: endDate,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: response.statusText }));

        let error: ApiError;

        if (response.status === 404) {
            error = {
                type: 'invalid_ticker',
                message: 'Stock ticker not found'
            };
        } else if (response.status === 429) {
            error = {
                type: 'rate_limited',
                message: 'One or more data sources are temporarily unavailable'
            };
        } else if (response.status === 400) {
            // Check if it's a date range error from backend
            const detail = errorData.detail || '';
            if (detail.toLowerCase().includes('date') || detail.toLowerCase().includes('trading days')) {
                error = {
                    type: 'invalid_date_range',
                    message: 'Minimum 30 trading days required for prediction'
                };
            } else {
                error = {
                    type: 'invalid_ticker',
                    message: 'Stock ticker not found'
                };
            }
        } else {
            error = {
                type: 'generic',
                message: 'Prediction failed. Please try again.'
            };
        }

        throw error;
    }

    return response.json();
}

/**
 * Get download URL for features CSV
 */
export function getFeaturesCsvUrl(path: string): string {
    return `${API_BASE_URL}/download/features?path=${encodeURIComponent(path)}`;
}

/**
 * Get download URL for predictions CSV
 */
export function getPredictionsCsvUrl(path: string): string {
    return `${API_BASE_URL}/download/predictions?path=${encodeURIComponent(path)}`;
}
