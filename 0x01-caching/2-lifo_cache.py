#!/usr/bin/env python3
"""
Module: 1-lifo_cache.py

This module contains a class that inherits from BaseCaching
"""


from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """
    This class inherits from BaseCaching
    """
    def __init__(self):
        """
        This method is for initializtion
        """
        super().__init__()
        self.keys_in_order = []

    def put(self, key, item):
        """
        This method checks if the number of items in cached data
        is higher and returns the data linked to key
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= self.MAX_ITEMS:
                discarded_key = self.keys_in_order.pop()
                del self.cache_data[discarded_key]
                print(f"DISCARD: {discarded_key}")
            self.cache_data[key] = item
            self.keys_in_order.append(key)

    def get(self, key):
        """
        This method returns value of data returned to key
        """
        if key is not None and key in self.cache_data:
            return self.cache_data[key]
        return None
