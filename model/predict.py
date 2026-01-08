"""
Model prediction module.
"""
import pandas as pd
import numpy as np


def predict_next_close(model, latest_features: pd.Series) -> float:
    """
    Predict the closing price for the next trading day.
    
    Args:
        model: Trained model object
        latest_features: Series containing the most recent feature values
    
    Returns:
        Predicted closing price
    """
    # Extract feature values in correct order
    feature_cols = ['daily_return', 'ma_5', 'ma_10', 'volatility_5']
    
    X = latest_features[feature_cols].values.reshape(1, -1)
    
    prediction = model.predict(X)[0]
    
    return prediction


def predict_next_day(model: object, features: dict) -> float:
    """
    Predict the closing price for the next trading day.
    
    Args:
        model: Trained model object
        features: Dictionary of features for the most recent day
    
    Returns:
        Predicted closing price
    """
    pass
