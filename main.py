"""
Project Kassandra - Main Entry Point

INPUT CONTRACT:
    - STOCK_NAME: str (e.g., "AAPL", "GOOGL")
    - TIMELINE: tuple (start_date, end_date) in format "YYYY-MM-DD"

OUTPUT CONTRACT:
    - Predicted closing price for the next trading day: float
"""
import sys
from services.predict_service import run_prediction


def main(stock_name: str, start_date: str, end_date: str):
    """
    CLI entry point for stock prediction.
    
    Args:
        stock_name: Stock ticker symbol
        start_date: Start date in YYYY-MM-DD format
        end_date: End date in YYYY-MM-DD format
    """
    # Execute prediction pipeline
    result = run_prediction(stock_name, start_date, end_date)
    
    # Print structured results
    print(f"\n{'='*60}")
    print(f"PREDICTION RESULTS FOR {stock_name}")
    print(f"{'='*60}")
    print(f"\nPredicted Next-Day Close: ${result['predicted_close']:.2f}")
    print(f"\nSentiment Breakdown:")
    print(f"  News Sentiment:        {result['sentiment_breakdown']['news_sentiment']:.4f}")
    print(f"  News Article Count:    {result['sentiment_breakdown']['news_article_count']}")
    print(f"  Google Trends Score:   {result['sentiment_breakdown']['google_trends_score']:.2f}")
    print(f"  Google Trends Δ (7d):  {result['sentiment_breakdown']['google_trends_delta_7d']:.2f}")
    print(f"  Wikipedia Views:       {result['sentiment_breakdown']['wikipedia_views']:.0f}")
    print(f"  Wikipedia Views Δ:     {result['sentiment_breakdown']['wikipedia_views_delta']:.0f}")
    print(f"  Combined Sentiment:    {result['sentiment_breakdown']['combined_sentiment']:.4f}")
    print(f"\nExported Files:")
    print(f"  Features CSV:    {result['feature_csv_path']}")
    print(f"  Predictions CSV: {result['prediction_csv_path']}")
    print(f"\nLast Updated: {result['last_updated']}")
    print(f"{'='*60}")


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
