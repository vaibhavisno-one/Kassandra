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


def train_with_ablation(features_df: pd.DataFrame):
    """
    Train models with ablation study: baseline (price-only) vs sentiment-aware.
    
    Args:
        features_df: DataFrame with all features including sentiment
    
    Returns:
        Tuple of (sentiment_aware_model, baseline_metrics, sentiment_metrics)
    """
    # Create supervised dataset
    df = features_df.copy()
    df['target'] = df['Close'].shift(-1)
    df = df.dropna()
    
    # Identify all numeric feature columns (exclude OHLCV, target)
    exclude_cols = ['Open', 'High', 'Low', 'Close', 'Volume', 'target']
    all_feature_cols = [col for col in df.columns if col not in exclude_cols and df[col].dtype in ['float64', 'int64']]
    
    # Baseline features (price-only)
    baseline_feature_cols = ['daily_return', 'ma_5', 'ma_10', 'volatility_5']
    
    # Sentiment-aware features (price + sentiment)
    sentiment_feature_cols = all_feature_cols
    
    y = df['target'].values
    
    # Time-based split
    split_idx = int(len(df) * 0.8)
    
    # Train baseline model (price-only)
    X_baseline = df[baseline_feature_cols].values
    X_train_base, X_val_base = X_baseline[:split_idx], X_baseline[split_idx:]
    y_train, y_val = y[:split_idx], y[split_idx:]
    
    baseline_model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
    baseline_model.fit(X_train_base, y_train)
    
    y_pred_base = baseline_model.predict(X_val_base)
    baseline_mae = mean_absolute_error(y_val, y_pred_base)
    baseline_rmse = np.sqrt(mean_squared_error(y_val, y_pred_base))
    
    # Train sentiment-aware model (price + sentiment)
    X_sentiment = df[sentiment_feature_cols].values
    X_train_sent, X_val_sent = X_sentiment[:split_idx], X_sentiment[split_idx:]
    
    sentiment_model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
    sentiment_model.fit(X_train_sent, y_train)
    
    y_pred_sent = sentiment_model.predict(X_val_sent)
    sentiment_mae = mean_absolute_error(y_val, y_pred_sent)
    sentiment_rmse = np.sqrt(mean_squared_error(y_val, y_pred_sent))
    
    # Calculate improvement
    improvement = ((baseline_rmse - sentiment_rmse) / baseline_rmse) * 100
    
    baseline_metrics = {
        'mae': baseline_mae,
        'rmse': baseline_rmse,
        'train_size': len(X_train_base),
        'val_size': len(X_val_base),
        'features': baseline_feature_cols
    }
    
    sentiment_metrics = {
        'mae': sentiment_mae,
        'rmse': sentiment_rmse,
        'train_size': len(X_train_sent),
        'val_size': len(X_val_sent),
        'features': sentiment_feature_cols,
        'improvement': improvement
    }
    
    return sentiment_model, baseline_metrics, sentiment_metrics


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
