"""
Google Trends sentiment module.
"""
import pandas as pd
from pytrends.request import TrendReq
from datetime import datetime


# Stock ticker to company name mapping
TICKER_TO_COMPANY = {
    'AAPL': 'Apple',
    'GOOGL': 'Google',
    'MSFT': 'Microsoft',
    'AMZN': 'Amazon',
    'TSLA': 'Tesla',
    'META': 'Meta',
    'NVDA': 'Nvidia',
    'NFLX': 'Netflix',
    'AMD': 'AMD',
    'INTC': 'Intel'
}


def fetch_google_trends(stock: str, start_date: str, end_date: str) -> pd.DataFrame:
    """
    Fetch Google Trends data for a stock.
    
    Args:
        stock: Stock ticker symbol
        start_date: Start date in YYYY-MM-DD format
        end_date: End date in YYYY-MM-DD format
    
    Returns:
        DataFrame with columns: date, trend_score, trend_delta_7d
    """
    # Get company name
    company_name = TICKER_TO_COMPANY.get(stock.upper(), stock)
    
    # Initialize pytrends
    pytrends = TrendReq(hl='en-US', tz=360)
    
    # Build timeframe string
    timeframe = f'{start_date} {end_date}'
    
    try:
        # Build payload
        pytrends.build_payload([company_name], timeframe=timeframe, geo='US')
        
        # Get interest over time
        trends_df = pytrends.interest_over_time()
        
        if trends_df.empty or company_name not in trends_df.columns:
            # Return empty DataFrame with proper structure
            return pd.DataFrame(columns=['date', 'trend_score', 'trend_delta_7d'])
        
        # Extract the trend data
        trends_df = trends_df[[company_name]].copy()
        trends_df.columns = ['trend_score']
        trends_df = trends_df.reset_index()
        trends_df.columns = ['date', 'trend_score']
        
        # Calculate 7-day rolling mean
        trends_df['trend_rolling_7d'] = trends_df['trend_score'].rolling(window=7, min_periods=1).mean()
        
        # Calculate delta from 7-day mean
        trends_df['trend_delta_7d'] = trends_df['trend_score'] - trends_df['trend_rolling_7d']
        
        # Drop intermediate column
        trends_df = trends_df[['date', 'trend_score', 'trend_delta_7d']]
        
        # Ensure date is datetime
        trends_df['date'] = pd.to_datetime(trends_df['date'])
        
        return trends_df
        
    except Exception as e:
        print(f"Error fetching Google Trends: {e}")
        return pd.DataFrame(columns=['date', 'trend_score', 'trend_delta_7d'])
