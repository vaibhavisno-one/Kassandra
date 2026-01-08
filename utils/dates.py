"""
Date utility functions.
"""
from datetime import datetime


def validate_and_normalize_dates(start_date: str, end_date: str) -> tuple:
    """
    Validate and normalize the input date range.
    
    Args:
        start_date: Start date in YYYY-MM-DD format
        end_date: End date in YYYY-MM-DD format
    
    Returns:
        Tuple of (start_date, end_date) as strings
    
    Raises:
        ValueError: If dates are invalid or in wrong order
    """
    try:
        start = datetime.strptime(start_date, "%Y-%m-%d")
        end = datetime.strptime(end_date, "%Y-%m-%d")
        
        if start >= end:
            raise ValueError("start_date must be before end_date")
        
        if end > datetime.now():
            raise ValueError("end_date cannot be in the future")
        
        return start_date, end_date
    
    except ValueError as e:
        if "does not match format" in str(e):
            raise ValueError("Dates must be in YYYY-MM-DD format")
        raise


def validate_date_format(date_str: str) -> bool:
    """
    Validate date string is in YYYY-MM-DD format.
    
    Args:
        date_str: Date string to validate
    
    Returns:
        True if valid, False otherwise
    """
    pass


def is_trading_day(date_str: str) -> bool:
    """
    Check if given date is a valid trading day (not weekend/holiday).
    
    Args:
        date_str: Date string in YYYY-MM-DD format
    
    Returns:
        True if trading day, False otherwise
    """
    pass


def get_next_trading_day(date_str: str) -> str:
    """
    Get the next trading day after given date.
    
    Args:
        date_str: Date string in YYYY-MM-DD format
    
    Returns:
        Next trading day in YYYY-MM-DD format
    """
    pass
