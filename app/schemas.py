"""
API Schemas

Pydantic models for request/response validation.
"""
from pydantic import BaseModel, Field
from typing import Dict


class PredictionRequest(BaseModel):
    """
    Request model for stock prediction endpoint.
    
    Attributes:
        stock: Stock ticker symbol (e.g., "TSLA", "NVDA")
        start_date: Start date in YYYY-MM-DD format
        end_date: End date in YYYY-MM-DD format
    """
    stock: str = Field(..., description="Stock ticker symbol", example="TSLA")
    start_date: str = Field(..., description="Start date (YYYY-MM-DD)", example="2025-01-01")
    end_date: str = Field(..., description="End date (YYYY-MM-DD)", example="2025-12-31")
    
    class Config:
        json_schema_extra = {
            "example": {
                "stock": "NVDA",
                "start_date": "2025-02-01",
                "end_date": "2025-06-30"
            }
        }


class PredictionResponse(BaseModel):
    """
    Response model for stock prediction endpoint.
    
    Attributes:
        predicted_close: Predicted next-day closing price
        sentiment_breakdown: Breakdown of sentiment sources
        feature_csv_path: Path to exported features CSV
        prediction_csv_path: Path to exported prediction log CSV
        last_updated: ISO timestamp of prediction generation
    """
    predicted_close: float = Field(..., description="Predicted next-day closing price")
    sentiment_breakdown: Dict[str, float] = Field(..., description="Sentiment source breakdown")
    feature_csv_path: str = Field(..., description="Path to features CSV")
    prediction_csv_path: str = Field(..., description="Path to predictions CSV")
    last_updated: str = Field(..., description="ISO timestamp")
    
    class Config:
        json_schema_extra = {
            "example": {
                "predicted_close": 134.61,
                "sentiment_breakdown": {
                    "news_sentiment": 0.0,
                    "news_article_count": 0,
                    "google_trends_score": 42.0,
                    "google_trends_delta_7d": 7.86,
                    "wikipedia_views": 5699.0,
                    "wikipedia_views_delta": 686.0,
                    "combined_sentiment": 0.3149
                },
                "feature_csv_path": "features_NVDA_2025-02-01_to_2025-06-30.csv",
                "prediction_csv_path": "predictions_NVDA_2025-02-01_to_2025-06-30.csv",
                "last_updated": "2026-01-09T00:00:06.574844"
            }
        }


class HealthResponse(BaseModel):
    """
    Response model for health check endpoint.
    
    Attributes:
        status: Service health status
        timestamp: ISO timestamp of health check
    """
    status: str = Field(..., description="Service status")
    timestamp: str = Field(..., description="ISO timestamp")
    
    class Config:
        json_schema_extra = {
            "example": {
                "status": "healthy",
                "timestamp": "2026-01-09T00:00:00.000000"
            }
        }
