"""
FastAPI Application - Stock Prediction API

Main application entry point for the Kassandra ML prediction service.
"""
import os
from datetime import datetime
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from app.schemas import PredictionRequest, PredictionResponse, HealthResponse
from services.predict_service import run_prediction

# Initialize FastAPI application
app = FastAPI(
    title="Kassandra Stock Prediction API",
    description="ML-powered stock prediction service with multi-source sentiment analysis",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS - Allow all origins for now
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """
    Health check endpoint.
    
    Returns:
        HealthResponse: Service health status and timestamp
    """
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now().isoformat()
    )


@app.post("/predict", response_model=PredictionResponse, tags=["Prediction"])
async def predict(request: PredictionRequest):
    """
    Stock prediction endpoint.
    
    Executes the full ML pipeline including:
    - Historical price data fetching
    - Technical feature engineering
    - Multi-source sentiment analysis (news, trends, Wikipedia)
    - Model training and prediction
    - CSV export generation
    
    Args:
        request: PredictionRequest containing stock symbol and date range
    
    Returns:
        PredictionResponse: Prediction results with sentiment breakdown
    
    Raises:
        HTTPException: 500 if prediction pipeline fails
    """
    try:
        # Execute ML prediction pipeline
        result = run_prediction(
            stock=request.stock,
            start_date=request.start_date,
            end_date=request.end_date
        )
        
        # Return result as PredictionResponse
        return PredictionResponse(**result)
    
    except Exception as e:
        # Return HTTP 500 with error details
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


@app.get("/download/features", tags=["Download"])
async def download_features(path: str = Query(..., description="Path to features CSV file")):
    """
    Download features CSV file.
    
    Args:
        path: Path to the features CSV file
    
    Returns:
        FileResponse: CSV file download
    
    Raises:
        HTTPException: 404 if file not found
    """
    # Validate file exists
    if not os.path.exists(path):
        raise HTTPException(
            status_code=404,
            detail=f"File not found: {path}"
        )
    
    # Extract filename from path
    filename = os.path.basename(path)
    
    # Return file as download
    return FileResponse(
        path=path,
        media_type="text/csv",
        filename=filename
    )


@app.get("/download/predictions", tags=["Download"])
async def download_predictions(path: str = Query(..., description="Path to predictions CSV file")):
    """
    Download predictions CSV file.
    
    Args:
        path: Path to the predictions CSV file
    
    Returns:
        FileResponse: CSV file download
    
    Raises:
        HTTPException: 404 if file not found
    """
    # Validate file exists
    if not os.path.exists(path):
        raise HTTPException(
            status_code=404,
            detail=f"File not found: {path}"
        )
    
    # Extract filename from path
    filename = os.path.basename(path)
    
    # Return file as download
    return FileResponse(
        path=path,
        media_type="text/csv",
        filename=filename
    )


@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint - API information.
    
    Returns:
        dict: API metadata
    """
    return {
        "name": "Kassandra Stock Prediction API",
        "version": "1.0.0",
        "status": "operational",
        "endpoints": {
            "health": "/health",
            "predict": "/predict",
            "download_features": "/download/features",
            "download_predictions": "/download/predictions",
            "docs": "/docs",
            "redoc": "/redoc"
        },
        "timestamp": datetime.now().isoformat()
    }
