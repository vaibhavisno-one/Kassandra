"""
Prediction Service - Core ML Pipeline Execution

This service encapsulates the full ML pipeline logic for stock prediction.
It fetches data, builds features, trains models, and generates predictions.
"""
from datetime import datetime
import pandas as pd
from data.prices import fetch_historical_prices
from utils.dates import validate_and_normalize_dates
from features.technical import build_technical_features
from model.train import train_baseline_model
from model.predict import predict_next_close
from data.news import fetch_news_sentiment
from sentiment.trends import fetch_google_trends
from sentiment.wikipedia import fetch_wikipedia_pageviews
from sentiment.fusion import compute_combined_sentiment
from sklearn.ensemble import RandomForestRegressor


def normalize_date_column(df: pd.DataFrame) -> pd.DataFrame:
    """
    Normalize DataFrame to have timezone-naive date column.
    
    Args:
        df: DataFrame with date as index or column
    
    Returns:
        DataFrame with date as timezone-naive datetime column
    """
    if df.empty:
        return df
    
    df = df.copy()
    
    # If date is in index, reset it
    if df.index.name == 'date' or isinstance(df.index, pd.DatetimeIndex):
        df = df.reset_index()
        if 'index' in df.columns:
            df = df.rename(columns={'index': 'date'})
    
    # Ensure date column exists
    if 'date' not in df.columns:
        raise ValueError("DataFrame must have 'date' column or DatetimeIndex")
    
    # Convert to datetime and remove timezone
    df['date'] = pd.to_datetime(df['date'])
    if df['date'].dt.tz is not None:
        df['date'] = df['date'].dt.tz_localize(None)
    
    return df


def run_prediction(stock: str, start_date: str, end_date: str) -> dict:
    """
    Execute the full ML pipeline for stock prediction.
    
    This function orchestrates the entire prediction workflow:
    1. Validates dates and fetches historical price data
    2. Builds technical features from price data
    3. Fetches multi-source sentiment data (news, trends, Wikipedia)
    4. Computes combined sentiment scores
    5. Merges all features into a unified dataset
    6. Trains a regression model
    7. Predicts next-day closing price
    8. Exports feature CSV and prediction log CSV
    
    Args:
        stock: Stock ticker symbol (e.g., "TSLA", "AAPL")
        start_date: Start date in YYYY-MM-DD format
        end_date: End date in YYYY-MM-DD format
    
    Returns:
        dict: Structured result containing:
            - predicted_close: float - Predicted next-day closing price
            - sentiment_breakdown: dict - Individual sentiment source scores
            - feature_csv_path: str - Path to exported features CSV
            - prediction_csv_path: str - Path to exported predictions CSV
            - last_updated: str - ISO timestamp of prediction generation
    """
    # Step 1: Validate and normalize date range
    start_date, end_date = validate_and_normalize_dates(start_date, end_date)
    
    # Step 2: Fetch historical price data
    print(f"Fetching historical prices for {stock} from {start_date} to {end_date}...")
    prices = fetch_historical_prices(stock, start_date, end_date)
    
    # Step 3: Display fetched data
    print(f"\nSuccessfully fetched {len(prices)} trading days")
    print("\nLast 5 rows of raw price data:")
    print(prices.tail())
    
    # Step 4: Build technical features
    print(f"\nBuilding technical features...")
    features = build_technical_features(prices)
    
    # Normalize technical features index to timezone-naive datetime
    features.index = pd.to_datetime(features.index).tz_localize(None)
    
    # Step 5: Fetch news sentiment data
    print(f"\nFetching news sentiment...")
    news_df = fetch_news_sentiment(stock, start_date, end_date)
    
    if not news_df.empty:
        print(f"Fetched news sentiment for {len(news_df)} days")
        non_zero_sentiment = news_df[news_df['article_count'] > 0]
        if not non_zero_sentiment.empty:
            print(f"Sample news sentiment rows (non-zero):")
            print(non_zero_sentiment.head(3)[['date', 'avg_sentiment', 'article_count']].to_string(index=False))
    else:
        print("No news sentiment data available")
    
    # Step 6: Fetch Google Trends data
    print(f"\nFetching Google Trends...")
    trends_df = fetch_google_trends(stock, start_date, end_date)
    
    if not trends_df.empty:
        print(f"Fetched Google Trends for {len(trends_df)} days")
        print(f"Sample trends rows:")
        print(trends_df.head(3)[['date', 'trend_score', 'trend_delta_7d']].to_string(index=False))
    else:
        print("No Google Trends data available")
    
    # Step 7: Fetch Wikipedia pageviews
    print(f"\nFetching Wikipedia pageviews...")
    wiki_df = fetch_wikipedia_pageviews(stock, start_date, end_date)
    
    if not wiki_df.empty:
        print(f"Fetched Wikipedia pageviews for {len(wiki_df)} days")
        print(f"Sample wiki rows:")
        print(wiki_df.head(3)[['date', 'wiki_views', 'wiki_views_delta']].to_string(index=False))
    else:
        print("No Wikipedia pageviews data available")
    
    # Step 8: Compute combined sentiment
    print(f"\nComputing combined sentiment...")
    combined_sentiment_df = compute_combined_sentiment(news_df, trends_df, wiki_df)
    
    if not combined_sentiment_df.empty:
        print(f"Combined sentiment computed for {len(combined_sentiment_df)} days")
        non_zero_combined = combined_sentiment_df[combined_sentiment_df['combined_sentiment'].abs() > 0.01]
        if not non_zero_combined.empty:
            print(f"Sample combined sentiment rows (non-zero):")
            print(non_zero_combined.head(5)[['date', 'combined_sentiment']].to_string(index=False))
    
    # Step 9: Merge all sentiment features with technical features
    print(f"\nMerging all features...")
    
    # Prepare features for merging
    features_with_date = features.reset_index()
    features_with_date = features_with_date.rename(columns={'Date': 'date'})
    features_with_date = normalize_date_column(features_with_date)
    
    # Normalize all sentiment DataFrames
    news_df = normalize_date_column(news_df)
    trends_df = normalize_date_column(trends_df)
    wiki_df = normalize_date_column(wiki_df)
    combined_sentiment_df = normalize_date_column(combined_sentiment_df)
    
    # Merge news sentiment
    if not news_df.empty:
        news_df_renamed = news_df.rename(columns={'avg_sentiment': 'avg_news_sentiment', 'article_count': 'news_article_count'})
        features_with_date = pd.merge(features_with_date, news_df_renamed, on='date', how='left')
    else:
        features_with_date['avg_news_sentiment'] = 0.0
        features_with_date['news_article_count'] = 0
    
    # Merge trends
    if not trends_df.empty:
        features_with_date = pd.merge(features_with_date, trends_df, on='date', how='left')
    else:
        features_with_date['trend_score'] = 0.0
        features_with_date['trend_delta_7d'] = 0.0
    
    # Merge wiki
    if not wiki_df.empty:
        features_with_date = pd.merge(features_with_date, wiki_df, on='date', how='left')
    else:
        features_with_date['wiki_views'] = 0.0
        features_with_date['wiki_views_delta'] = 0.0
    
    # Merge combined sentiment
    if not combined_sentiment_df.empty:
        features_with_date = pd.merge(features_with_date, combined_sentiment_df, on='date', how='left')
    else:
        features_with_date['combined_sentiment'] = 0.0
    
    # Fill NaN values with 0
    features_with_date = features_with_date.fillna(0)
    
    # Set date back as index
    features_with_date = features_with_date.set_index('date')
    features = features_with_date
    
    # Step 10: Display merged feature statistics
    print(f"\nFinal Feature DataFrame shape: {features.shape}")
    print(f"Feature columns: {list(features.columns)}")
    print("\nLast 5 rows of merged features:")
    print(features.tail())
    
    # Step 11: Train model with all sentiment features
    print(f"\nTraining sentiment-aware model...")
    
    # Define feature columns
    sentiment_feature_cols = [
        'daily_return', 'ma_7', 'ma_21', 'volatility_7', 'volatility_21',
        'avg_news_sentiment', 'news_article_count',
        'trend_score', 'trend_delta_7d',
        'wiki_views', 'wiki_views_delta',
        'combined_sentiment'
    ]
    
    # Filter to only existing columns
    available_features = [col for col in sentiment_feature_cols if col in features.columns]
    
    model = train_baseline_model(features, feature_columns=available_features)
    
    # Step 12: Predict next trading day's closing price
    latest_features = features.iloc[-1]
    prediction = predict_next_close(model, latest_features, available_features)
    
    print(f"\n{'='*60}")
    print(f"Multi-source sentiment-aware predicted next-day closing price for {stock}: ${prediction:.2f}")
    print(f"{'='*60}")
    
    # Step 13: Export features to CSV
    csv_filename = f"features_{stock}_{start_date}_to_{end_date}.csv"
    features_export = features.reset_index()
    features_export = features_export.rename(columns={'date': 'Date'})
    features_export.to_csv(csv_filename, index=False)
    
    print(f"\n{'='*60}")
    print(f"Features exported to: {csv_filename}")
    print(f"Rows exported: {len(features_export)}")
    print(f"{'='*60}")
    
    # Step 14: Generate prediction log
    print(f"\nGenerating prediction log...")
    
    predictions_log = []
    min_train_size = 30
    
    df = features.copy()
    df['target'] = df['Close'].shift(-1)
    df = df.dropna()
    
    for i in range(min_train_size, len(df)):
        train_data = df.iloc[:i]
        test_row = df.iloc[i]
        
        X_train = train_data[available_features].values
        y_train = train_data['target'].values
        
        X_test = test_row[available_features].values.reshape(1, -1)
        actual_price = test_row['target']
        
        model_temp = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
        model_temp.fit(X_train, y_train)
        
        predicted_price = model_temp.predict(X_test)[0]
        
        predictions_log.append({
            'Date': test_row.name.strftime('%Y-%m-%d'),
            'Actual_Closing_Price': actual_price,
            'Predicted_Closing_Price': predicted_price
        })
    
    predictions_df = pd.DataFrame(predictions_log)
    predictions_csv = f"predictions_{stock}_{start_date}_to_{end_date}.csv"
    predictions_df.to_csv(predictions_csv, index=False)
    
    print(f"\n{'='*60}")
    print(f"Predictions exported to: {predictions_csv}")
    print(f"Total predictions generated: {len(predictions_df)}")
    print(f"{'='*60}")
    
    # Step 15: Build sentiment breakdown for response
    sentiment_breakdown = {
        'news_sentiment': float(latest_features.get('avg_news_sentiment', 0.0)),
        'news_article_count': int(latest_features.get('news_article_count', 0)),
        'google_trends_score': float(latest_features.get('trend_score', 0.0)),
        'google_trends_delta_7d': float(latest_features.get('trend_delta_7d', 0.0)),
        'wikipedia_views': float(latest_features.get('wiki_views', 0.0)),
        'wikipedia_views_delta': float(latest_features.get('wiki_views_delta', 0.0)),
        'combined_sentiment': float(latest_features.get('combined_sentiment', 0.0))
    }
    
    # Step 16: Return structured result
    return {
        'predicted_close': float(prediction),
        'sentiment_breakdown': sentiment_breakdown,
        'feature_csv_path': csv_filename,
        'prediction_csv_path': predictions_csv,
        'last_updated': datetime.now().isoformat()
    }
