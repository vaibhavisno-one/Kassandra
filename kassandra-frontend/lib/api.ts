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

export interface HealthResponse {
    status: string;
    timestamp: string;
}

/**
 * Check backend health status
 */
export async function checkHealth(): Promise<HealthResponse> {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
        throw new Error(`Health check failed: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Get stock prediction from ML pipeline
 */
export async function getPrediction(request: PredictionRequest): Promise<PredictionResponse> {
    const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || `Prediction failed: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Download features CSV file
 */
export function downloadFeatures(path: string): string {
    return `${API_BASE_URL}/download/features?path=${encodeURIComponent(path)}`;
}

/**
 * Download predictions CSV file
 */
export function downloadPredictions(path: string): string {
    return `${API_BASE_URL}/download/predictions?path=${encodeURIComponent(path)}`;
}
