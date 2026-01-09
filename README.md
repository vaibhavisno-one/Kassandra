# Project Kassandra

A Universal Sentiment Engine for Stock Prediction

## Overview

Project Kassandra is a stock price prediction pipeline that combines traditional technical analysis with multi-source sentiment data. The system fetches live market data, aggregates sentiment signals from news, Wikipedia, and Google Trends, and uses machine learning to predict next-day closing prices.

## Features

- **Live Data Fetching**: Historical stock prices via yfinance
- **Technical Indicators**: Moving averages, volatility, daily returns
- **Multi-Source Sentiment**:
  - News sentiment (Google News RSS + VADER)
  - Wikipedia pageview trends
  - Google Trends search interest
- **Explainable Fusion**: Fixed-weight sentiment aggregation (0.4 news, 0.3 trends, 0.3 wiki)
- **Rolling Predictions**: Day-by-day training with no future data leakage
- **CSV Artifacts**: Exportable features and prediction logs

## Tech Stack

- Python 3.8+
- pandas, numpy
- scikit-learn (RandomForestRegressor)
- yfinance (stock prices)
- feedparser, nltk (news sentiment)
- pytrends (Google Trends)
- requests (Wikipedia API)

## Installation

```bash
pip install -r requirements.txt
```

## Quick Start

Run the pipeline for any stock and date range:

```bash
python -m uvicorn app.main:app --reload --port 8000                             
```

The system will:
1. Fetch historical prices
2. Build technical features
3. Fetch sentiment from news, Wikipedia, and Google Trends
4. Compute combined sentiment
5. Train a sentiment-aware model
6. Generate next-day prediction
7. Export CSV artifacts

## Outputs

The pipeline generates two CSV files in the project root:

### 1. Features CSV
`features_<STOCK>_<START>_to_<END>.csv`

Contains all engineered features:
- Date
- OHLCV (Open, High, Low, Close, Volume)
- Technical indicators (daily_return, ma_7, ma_21, volatility_7, volatility_21)
- Sentiment features (avg_news_sentiment, news_article_count, trend_score, trend_delta_7d, wiki_views, wiki_views_delta, combined_sentiment)

### 2. Predictions CSV
`predictions_<STOCK>_<START>_to_<END>.csv`

Contains rolling predictions:
- Date
- Actual_Closing_Price
- Predicted_Closing_Price

Each prediction is generated using only data available before that date (minimum 30-day training window).

## Live Data Notes

All data is fetched at runtime from public, free sources:
- Stock prices: Yahoo Finance
- News: Google News RSS
- Wikipedia: Wikimedia Pageviews API
- Trends: Google Trends (via pytrends)

No API keys required. Data availability depends on external services.

## Limitations & Future Work

**Current Limitations**:
- News sentiment limited to recent articles (Google News RSS)
- Google Trends data may have rate limits
- Model uses fixed hyperparameters (no tuning)
- Single-day prediction horizon

**Future Enhancements**:
- Hyperparameter optimization
- Multi-day forecasting
- Additional sentiment sources (Twitter, Reddit)
- Deep learning models
- Real-time prediction API


MADE BY [vaibhavisno-one](https://github.com/vaibhavisno-one)