"""
Project Kassandra - Main Entry Point

INPUT CONTRACT:
    - STOCK_NAME: str (e.g., "AAPL", "GOOGL")
    - TIMELINE: tuple (start_date, end_date) in format "YYYY-MM-DD"

OUTPUT CONTRACT:
    - Predicted closing price for the next trading day: float
"""
import sys
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
    
    # Step 5: Display feature statistics
    print(f"\nFeature DataFrame shape: {features.shape}")
    print("\nLast 5 rows of features:")
    print(features.tail())
    
    # Step 6: Train baseline model
    print(f"\nTraining baseline model...")
    model, metrics = train_baseline_model(features)
    
    print(f"\nModel trained successfully!")
    print(f"Training samples: {metrics['train_size']}")
    print(f"Validation samples: {metrics['val_size']}")
    print(f"Validation MAE: ${metrics['mae']:.2f}")
    print(f"Validation RMSE: ${metrics['rmse']:.2f}")
    
    # Step 7: Predict next trading day's closing price
    latest_features = features.iloc[-1]
    prediction = predict_next_close(model, latest_features)
    
    print(f"\n{'='*60}")
    print(f"Predicted next-day closing price for {stock_name}: ${prediction:.2f}")
    print(f"{'='*60}")
    
    # Step 8: Fetch news sentiment data (TODO)
    # news_data = data.news.fetch_news_sentiment(stock_name, start_date, end_date)
    
    # Step 9: Fetch search trends data (TODO)
    # trends_data = data.trends.fetch_search_trends(stock_name, start_date, end_date)
    
    # Step 10: Extract sentiment features from news (TODO)
    # sentiment_features = features.sentiment.extract_features(news_data)
    
    # Step 11: Combine all features (TODO)
    # combined_features = combine_features(technical_features, sentiment_features, trends_data)
    
    # Step 12: Retrain with all features (TODO)
    # model = model.train.train_model(combined_features)
    
    # Step 13: Make final prediction (TODO)
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
