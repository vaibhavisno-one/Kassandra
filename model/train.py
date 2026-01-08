"""
Model training module.
"""
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error


def train_baseline_model(features_df: pd.DataFrame):
    """
    Train a baseline supervised learning model for next-day price prediction.
    
    Args:
        features_df: DataFrame with technical features and Close price
    
    Returns:
        Tuple of (trained_model, validation_metrics)
    """
    # Create supervised dataset: features at time t predict Close at t+1
    df = features_df.copy()
    
    # Shift target to create next-day prediction task
    df['target'] = df['Close'].shift(-1)
    
    # Drop last row (no target available)
    df = df.dropna()
    
    # Define feature columns (exclude original OHLCV and target)
    feature_cols = ['daily_return', 'ma_5', 'ma_10', 'volatility_5']
    
    X = df[feature_cols].values
    y = df['target'].values
    
    # Time-based split: 80% train, 20% validation (no shuffling)
    split_idx = int(len(X) * 0.8)
    
    X_train, X_val = X[:split_idx], X[split_idx:]
    y_train, y_val = y[:split_idx], y[split_idx:]
    
    # Train baseline model
    model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
    model.fit(X_train, y_train)
    
    # Evaluate on validation set
    y_pred = model.predict(X_val)
    mae = mean_absolute_error(y_val, y_pred)
    rmse = np.sqrt(mean_squared_error(y_val, y_pred))
    
    metrics = {
        'mae': mae,
        'rmse': rmse,
        'train_size': len(X_train),
        'val_size': len(X_val)
    }
    
    return model, metrics


def train_model(features: dict) -> object:
    """
    Train the stock prediction model.
    
    Args:
        features: Dictionary of combined features (technical + sentiment + trends)
    
    Returns:
        Trained model object
    """
    pass


def save_model(model: object, filepath: str) -> None:
    """
    Save trained model to disk.
    
    Args:
        model: Trained model object
        filepath: Path to save model
    """
    pass


def load_model(filepath: str) -> object:
    """
    Load trained model from disk.
    
    Args:
        filepath: Path to saved model
    
    Returns:
        Loaded model object
    """
    pass
