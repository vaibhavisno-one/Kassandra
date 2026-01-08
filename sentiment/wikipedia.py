"""
Wikipedia pageviews sentiment module.
"""
import pandas as pd
import requests
from datetime import datetime, timedelta


# Stock ticker to Wikipedia page title mapping
TICKER_TO_WIKI_PAGE = {
    'AAPL': 'Apple_Inc.',
    'GOOGL': 'Google',
    'MSFT': 'Microsoft',
    'AMZN': 'Amazon_(company)',
    'TSLA': 'Tesla,_Inc.',
    'META': 'Meta_Platforms',
    'NVDA': 'Nvidia',
    'NFLX': 'Netflix',
    'AMD': 'Advanced_Micro_Devices',
    'INTC': 'Intel'
}


def fetch_wikipedia_pageviews(stock: str, start_date: str, end_date: str) -> pd.DataFrame:
    """
    Fetch Wikipedia pageviews for a stock's company page.
    
    Args:
        stock: Stock ticker symbol
        start_date: Start date in YYYY-MM-DD format
        end_date: End date in YYYY-MM-DD format
    
    Returns:
        DataFrame with columns: date, wiki_views, wiki_views_delta
    """
    # Get Wikipedia page title
    page_title = TICKER_TO_WIKI_PAGE.get(stock.upper(), stock)
    
    # Convert dates to required format (YYYYMMDD)
    start_dt = datetime.strptime(start_date, "%Y-%m-%d")
    end_dt = datetime.strptime(end_date, "%Y-%m-%d")
    
    start_str = start_dt.strftime("%Y%m%d")
    end_str = end_dt.strftime("%Y%m%d")
    
    # Wikimedia Pageviews API endpoint
    url = f"https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/{page_title}/daily/{start_str}/{end_str}"
    
    try:
        # Make request
        headers = {'User-Agent': 'Kassandra/1.0 (Educational Project)'}
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code != 200:
            return pd.DataFrame(columns=['date', 'wiki_views', 'wiki_views_delta'])
        
        data = response.json()
        
        if 'items' not in data or not data['items']:
            return pd.DataFrame(columns=['date', 'wiki_views', 'wiki_views_delta'])
        
        # Parse response
        records = []
        for item in data['items']:
            date_str = item['timestamp']
            date = datetime.strptime(date_str, "%Y%m%d00")
            views = item['views']
            records.append({'date': date, 'wiki_views': views})
        
        # Convert to DataFrame
        df = pd.DataFrame(records)
        
        if df.empty:
            return pd.DataFrame(columns=['date', 'wiki_views', 'wiki_views_delta'])
        
        # Calculate 7-day rolling mean
        df['wiki_views_rolling_7d'] = df['wiki_views'].rolling(window=7, min_periods=1).mean()
        
        # Calculate delta from 7-day mean
        df['wiki_views_delta'] = df['wiki_views'] - df['wiki_views_rolling_7d']
        
        # Drop intermediate column
        df = df[['date', 'wiki_views', 'wiki_views_delta']]
        
        # Ensure date is datetime
        df['date'] = pd.to_datetime(df['date'])
        
        return df
        
    except Exception as e:
        print(f"Error fetching Wikipedia pageviews: {e}")
        return pd.DataFrame(columns=['date', 'wiki_views', 'wiki_views_delta'])
