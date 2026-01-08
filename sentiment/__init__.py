"""
Sentiment package initialization.
"""
from sentiment.trends import fetch_google_trends
from sentiment.wikipedia import fetch_wikipedia_pageviews
from sentiment.fusion import compute_combined_sentiment

__all__ = [
    'fetch_google_trends',
    'fetch_wikipedia_pageviews',
    'compute_combined_sentiment'
]
