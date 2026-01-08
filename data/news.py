"""
News sentiment data fetching module.
"""
import pandas as pd
import feedparser
from datetime import datetime, timedelta
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk


# Download VADER lexicon if not already present
try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon', quiet=True)


def fetch_news_sentiment(stock: str, start_date: str, end_date: str) -> pd.DataFrame:
    """
    Fetch news headlines and compute sentiment scores.
    
    Args:
        stock: Stock ticker symbol
        start_date: Start date in YYYY-MM-DD format
        end_date: End date in YYYY-MM-DD format
    
    Returns:
        DataFrame with daily aggregated sentiment (avg_sentiment, article_count)
    """
    # Initialize VADER sentiment analyzer
    sia = SentimentIntensityAnalyzer()
    
    # Google News RSS feed URL
    query = f"{stock} stock"
    rss_url = f"https://news.google.com/rss/search?q={query.replace(' ', '+')}&hl=en-US&gl=US&ceid=US:en"
    
    try:
        # Fetch RSS feed
        feed = feedparser.parse(rss_url)
        
        articles = []
        start_dt = datetime.strptime(start_date, "%Y-%m-%d")
        end_dt = datetime.strptime(end_date, "%Y-%m-%d")
        
        for entry in feed.entries:
            # Parse publication date
            if hasattr(entry, 'published_parsed'):
                pub_date = datetime(*entry.published_parsed[:6])
            else:
                continue
            
            # Filter by date range
            if start_dt <= pub_date <= end_dt:
                # Get headline
                headline = entry.title if hasattr(entry, 'title') else ""
                
                # Compute sentiment
                sentiment_scores = sia.polarity_scores(headline)
                compound_score = sentiment_scores['compound']
                
                articles.append({
                    'date': pub_date.date(),
                    'headline': headline,
                    'sentiment': compound_score
                })
        
        if not articles:
            # Return empty DataFrame with proper structure
            return pd.DataFrame(columns=['date', 'avg_sentiment', 'article_count'])
        
        # Convert to DataFrame
        df = pd.DataFrame(articles)
        
        # Aggregate by day
        daily_sentiment = df.groupby('date').agg({
            'sentiment': 'mean',
            'headline': 'count'
        }).reset_index()
        
        daily_sentiment.columns = ['date', 'avg_sentiment', 'article_count']
        daily_sentiment['date'] = pd.to_datetime(daily_sentiment['date'])
        
        return daily_sentiment
    
    except Exception as e:
        print(f"Warning: Could not fetch news data: {e}")
        # Return empty DataFrame
        return pd.DataFrame(columns=['date', 'avg_sentiment', 'article_count'])


def fetch_news_data(stock_name: str, start_date: str, end_date: str) -> dict:
    """
    Fetch news articles and headlines for sentiment analysis.
    
    Args:
        stock_name: Stock ticker symbol
        start_date: Start date in YYYY-MM-DD format
        end_date: End date in YYYY-MM-DD format
    
    Returns:
        Dictionary containing news articles and metadata
    """
    pass
