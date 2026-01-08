"""
Sentiment feature extraction module.
"""
import pandas as pd
import numpy as np


def align_sentiment_features(sentiment_df: pd.DataFrame, price_df: pd.DataFrame) -> pd.DataFrame:
    """
    Align sentiment data with trading days and forward-fill missing values.
    
    Args:
        sentiment_df: DataFrame with daily sentiment (date, avg_sentiment, article_count)
        price_df: DataFrame with price data (datetime index)
    
    Returns:
        DataFrame aligned to trading days with sentiment features
    """
    # Create a DataFrame with trading day dates
    trading_dates = pd.DataFrame({'date': price_df.index.date})
    trading_dates['date'] = pd.to_datetime(trading_dates['date'])
    
    # Merge sentiment data with trading dates
    if sentiment_df.empty:
        # No sentiment data available, use neutral values
        trading_dates['avg_sentiment'] = 0.0
        trading_dates['article_count'] = 0
    else:
        # Ensure sentiment_df has datetime index
        sentiment_df = sentiment_df.copy()
        sentiment_df['date'] = pd.to_datetime(sentiment_df['date'])
        
        # Merge on date
        trading_dates = trading_dates.merge(sentiment_df, on='date', how='left')
        
        # Forward-fill missing sentiment values, then fill remaining with neutral
        trading_dates['avg_sentiment'] = trading_dates['avg_sentiment'].fillna(method='ffill').fillna(0.0)
        trading_dates['article_count'] = trading_dates['article_count'].fillna(method='ffill').fillna(0)
    
    # Set index to match price_df
    trading_dates.index = price_df.index
    
    # Return only sentiment columns
    return trading_dates[['avg_sentiment', 'article_count']]


def extract_features(news_data: dict) -> dict:
    """
    Extract sentiment features from news articles.
    
    Args:
        news_data: Dictionary containing news articles
    
    Returns:
        Dictionary of sentiment features
    """
    pass
