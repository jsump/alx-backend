#!/usr/bin/env python3
"""
Module: 0-basic_cache.py

This module contains a class that inherits from BaseCaching and
is a caching system
"""


from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    This class inherits from BaseCaching
    """
    def __init__(self):
        """
        This method is fo initialization
        """
        super().__init__()

    def put(self, key, item):
        """
        This method assigns they item value for the key
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """
        This method must return the value in self.cahe_data
        linked to key
        """
        if key is not None and key in self.cache_data:
            return self.cache_data[key]
        return None
