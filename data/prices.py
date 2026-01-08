"""
Historical stock price data fetching module.
"""
import yfinance as yf
import pandas as pd


def fetch_historical_prices(stock_name: str, start_date: str, end_date: str) -> pd.DataFrame:
    """
    Fetch historical stock prices for given stock and date range.
    
    Args:
        stock_name: Stock ticker symbol
        start_date: Start date in YYYY-MM-DD format
        end_date: End date in YYYY-MM-DD format
    
    Returns:
        DataFrame containing OHLCV data (Open, High, Low, Close, Volume)
    """
    try:
        ticker = yf.Ticker(stock_name)
        df = ticker.history(start=start_date, end=end_date)
        
        if df.empty:
            raise ValueError(f"No data found for ticker '{stock_name}' in the given date range")
        
        # Ensure datetime index
        df.index = pd.to_datetime(df.index)
        
        # Keep only OHLCV columns
        df = df[['Open', 'High', 'Low', 'Close', 'Volume']]
        
        return df
    
    except Exception as e:
        raise ValueError(f"Error fetching data for '{stock_name}': {str(e)}")
