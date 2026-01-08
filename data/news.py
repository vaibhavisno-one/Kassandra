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
    
    # Get company name
    company_name = TICKER_TO_COMPANY.get(stock.upper(), stock)
    
    # Create multiple query patterns for better coverage
    query_patterns = [
        f"{company_name} stock",
        f"{company_name} shares",
        f"{company_name} earnings",
        f"{stock} stock price",
        f"{company_name} financial"
    ]
    
    all_articles = []
    start_dt = datetime.strptime(start_date, "%Y-%m-%d")
    end_dt = datetime.strptime(end_date, "%Y-%m-%d")
    
    # Fetch from multiple queries
    for query in query_patterns:
        try:
            print("News queries being used:", query_patterns)
            rss_url = f"https://news.google.com/rss/search?q={query.replace(' ', '+')}&hl=en-US&gl=US&ceid=US:en"
            feed = feedparser.parse(rss_url)
            
            for entry in feed.entries:
                # Parse publication date
                if hasattr(entry, 'published_parsed'):
                    pub_date = datetime(*entry.published_parsed[:6])
                else:
                    continue
                
                # Filter by date range (relaxed to get more recent data)
                if pub_date <= end_dt + timedelta(days=30):  # Allow recent articles
                    # Get headline
                    headline = entry.title if hasattr(entry, 'title') else ""
                    
                    if headline:
                        # Compute sentiment
                        sentiment_scores = sia.polarity_scores(headline)
                        compound_score = sentiment_scores['compound']
                        
                        all_articles.append({
                            'date': pub_date.date(),
                            'headline': headline,
                            'sentiment': compound_score
                        })
        except Exception as e:
            continue
    
    if not all_articles:
        # Return empty DataFrame with proper structure
        return pd.DataFrame(columns=['date', 'avg_sentiment', 'article_count'])
    
    # Convert to DataFrame
    df = pd.DataFrame(all_articles)
    
    # Deduplicate by headline and date
    df = df.drop_duplicates(subset=['headline', 'date'], keep='first')
    
    # Aggregate by day
    daily_sentiment = df.groupby('date').agg({
        'sentiment': 'mean',
        'headline': 'count'
    }).reset_index()
    
    daily_sentiment.columns = ['date', 'avg_sentiment', 'article_count']
    daily_sentiment['date'] = pd.to_datetime(daily_sentiment['date'])
    
    return daily_sentiment


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
