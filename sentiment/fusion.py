"""
Explainable sentiment fusion module.
"""
import pandas as pd
import numpy as np


def compute_combined_sentiment(news_df: pd.DataFrame, trends_df: pd.DataFrame, wiki_df: pd.DataFrame) -> pd.DataFrame:
    """
    Combine multiple sentiment sources with explicit, explainable weights.
    
    Args:
        news_df: DataFrame with columns [date, avg_sentiment, article_count]
        trends_df: DataFrame with columns [date, trend_score, trend_delta_7d]
        wiki_df: DataFrame with columns [date, wiki_views, wiki_views_delta]
    
    Returns:
        DataFrame with columns [date, combined_sentiment]
    """
    # Start with an empty list to collect all dates
    all_dfs = []
    
    # Process news sentiment
    if not news_df.empty:
        news_processed = news_df[['date', 'avg_sentiment']].copy()
        news_processed.columns = ['date', 'news_sentiment']
        all_dfs.append(news_processed)
    
    # Process trends delta
    if not trends_df.empty:
        trends_processed = trends_df[['date', 'trend_delta_7d']].copy()
        trends_processed.columns = ['date', 'trend_delta']
        all_dfs.append(trends_processed)
    
    # Process wiki delta
    if not wiki_df.empty:
        wiki_processed = wiki_df[['date', 'wiki_views_delta']].copy()
        wiki_processed.columns = ['date', 'wiki_delta']
        all_dfs.append(wiki_processed)
    
    # If no data sources available, return empty
    if not all_dfs:
        return pd.DataFrame(columns=['date', 'combined_sentiment'])
    
    # Merge all sources on date (outer join to keep all dates)
    combined = all_dfs[0]
    for df in all_dfs[1:]:
        combined = pd.merge(combined, df, on='date', how='outer')
    
    # Sort by date
    combined = combined.sort_values('date').reset_index(drop=True)
    
    # Fill missing values with 0 (neutral)
    combined = combined.fillna(0)
    
    # Normalize trend_delta and wiki_delta using z-score
    if 'trend_delta' in combined.columns:
        trend_std = combined['trend_delta'].std()
        if trend_std > 0:
            combined['normalized_trend_delta'] = (combined['trend_delta'] - combined['trend_delta'].mean()) / trend_std
        else:
            combined['normalized_trend_delta'] = 0
    else:
        combined['normalized_trend_delta'] = 0
    
    if 'wiki_delta' in combined.columns:
        wiki_std = combined['wiki_views_delta'].std() if 'wiki_views_delta' in combined.columns else combined['wiki_delta'].std()
        if wiki_std > 0:
            combined['normalized_wiki_delta'] = (combined['wiki_delta'] - combined['wiki_delta'].mean()) / wiki_std
        else:
            combined['normalized_wiki_delta'] = 0
    else:
        combined['normalized_wiki_delta'] = 0
    
    # News sentiment is already in [-1, 1] range, no normalization needed
    if 'news_sentiment' not in combined.columns:
        combined['news_sentiment'] = 0
    
    # Compute combined sentiment with explicit weights
    # Formula: 0.4 × news + 0.3 × trend + 0.3 × wiki
    combined['combined_sentiment'] = (
        0.4 * combined['news_sentiment'] +
        0.3 * combined['normalized_trend_delta'] +
        0.3 * combined['normalized_wiki_delta']
    )
    
    # Return only date and combined_sentiment
    result = combined[['date', 'combined_sentiment']].copy()
    
    return result
