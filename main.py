"""
Project Kassandra - Main Entry Point

INPUT CONTRACT:
    - STOCK_NAME: str (e.g., "AAPL", "GOOGL")
    - TIMELINE: tuple (start_date, end_date) in format "YYYY-MM-DD"

OUTPUT CONTRACT:
    - Predicted closing price for the next trading day: float
"""
import sys
import pandas as pd
from data.prices import fetch_historical_prices
from utils.dates import validate_and_normalize_dates
from features.technical import build_technical_features
from model.train import train_baseline_model
from model.predict import predict_next_close


def main(stock_name: str, start_date: str, end_date: str):
    """
    Main execution flow for stock prediction.
    
    Args:
        stock_name: Stock ticker symbol
        start_date: Start date in YYYY-MM-DD format
        end_date: End date in YYYY-MM-DD format
    """
    # Step 1: Validate and normalize date range
    start_date, end_date = validate_and_normalize_dates(start_date, end_date)
    
    # Step 2: Fetch historical price data
    print(f"Fetching historical prices for {stock_name} from {start_date} to {end_date}...")
    prices = fetch_historical_prices(stock_name, start_date, end_date)
    
    # Step 3: Display fetched data
    print(f"\nSuccessfully fetched {len(prices)} trading days")
    print("\nLast 5 rows of raw price data:")
    print(prices.tail())
    
    # Step 4: Build technical features
    print(f"\nBuilding technical features...")
    features = build_technical_features(prices)
    
    # Step 5: Fetch news sentiment data
    print(f"\nFetching news sentiment...")
    from data.news import fetch_news_sentiment
    from features.sentiment import align_sentiment_features
    
    sentiment_df = fetch_news_sentiment(stock_name, start_date, end_date)
    
    if not sentiment_df.empty:
        print(f"Fetched sentiment for {len(sentiment_df)} days")
        
        # Show sentiment visibility check
        non_zero_sentiment = sentiment_df[sentiment_df['article_count'] > 0]
        if not non_zero_sentiment.empty:
            print(f"\nSample sentiment rows (non-zero):")
            print(non_zero_sentiment.head(5)[['date', 'avg_sentiment', 'article_count']].to_string(index=False))
        else:
            print("Warning: All sentiment values are zero")
    else:
        print("No sentiment data available, using neutral values")
    
    # Step 6: Align sentiment with trading days
    sentiment_features = align_sentiment_features(sentiment_df, features)
    
    # Step 7: Merge sentiment features with technical features
    features = pd.concat([features, sentiment_features], axis=1)
    
    # Step 8: Display merged feature statistics
    print(f"\nMerged Feature DataFrame shape: {features.shape}")
    print("\nLast 5 rows of merged features:")
    print(features.tail())
    
    # Step 9: Train models with ablation study
    print(f"\nTraining models with ablation study...")
    from model.train import train_with_ablation
    
    sentiment_model, baseline_metrics, sentiment_metrics = train_with_ablation(features)
    
    # Step 10: Display model comparison
    print(f"\n{'='*60}")
    print("MODEL COMPARISON")
    print(f"{'='*60}")
    print(f"\nBaseline Model (Price-only features):")
    print(f"  Features: {', '.join(baseline_metrics['features'])}")
    print(f"  Training samples: {baseline_metrics['train_size']}")
    print(f"  Validation samples: {baseline_metrics['val_size']}")
    print(f"  Validation MAE: ${baseline_metrics['mae']:.2f}")
    print(f"  Validation RMSE: ${baseline_metrics['rmse']:.2f}")
    
    print(f"\nSentiment-Aware Model (Price + Sentiment features):")
    print(f"  Features: {', '.join(sentiment_metrics['features'])}")
    print(f"  Training samples: {sentiment_metrics['train_size']}")
    print(f"  Validation samples: {sentiment_metrics['val_size']}")
    print(f"  Validation MAE: ${sentiment_metrics['mae']:.2f}")
    print(f"  Validation RMSE: ${sentiment_metrics['rmse']:.2f}")
    
    print(f"\n{'='*60}")
    print("IMPACT SUMMARY")
    print(f"{'='*60}")
    print(f"Baseline RMSE:  ${baseline_metrics['rmse']:.2f}")
    print(f"Sentiment RMSE: ${sentiment_metrics['rmse']:.2f}")
    if sentiment_metrics['improvement'] > 0:
        print(f"Improvement:    {sentiment_metrics['improvement']:.2f}% (sentiment helps!)")
    else:
        print(f"Improvement:    {sentiment_metrics['improvement']:.2f}% (sentiment doesn't help)")
    print(f"{'='*60}")
    
    # Step 11: Predict next trading day's closing price using sentiment-aware model
    latest_features = features.iloc[-1]
    prediction = predict_next_close(sentiment_model, latest_features, sentiment_metrics['features'])
    
    print(f"\n{'='*60}")
    print(f"Sentiment-aware predicted next-day closing price for {stock_name}: ${prediction:.2f}")
    print(f"{'='*60}")
    
    # Step 12: Fetch search trends data (TODO)
    # trends_data = data.trends.fetch_search_trends(stock_name, start_date, end_date)
    
    # Step 13: Combine all features (TODO)
    # combined_features = combine_features(technical_features, sentiment_features, trends_data)
    
    # Step 14: Retrain with all features (TODO)
    # model = model.train.train_model(combined_features)
    
    # Step 15: Make final prediction (TODO)
    # prediction = model.predict.predict_next_day(model, combined_features)


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python main.py STOCK_NAME START_DATE END_DATE")
        print("Example: python main.py TSLA 2020-01-01 2023-12-31")
        sys.exit(1)
    
    stock_name = sys.argv[1]
    start_date = sys.argv[2]
    end_date = sys.argv[3]
    
    try:
        main(stock_name, start_date, end_date)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
