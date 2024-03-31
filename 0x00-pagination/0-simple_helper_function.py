#!/usr/bin/env python3
"""
Module: 0-simple_helper_function.py

this module contains a function that takes 2 integers
and returns a tuple of size two conatining a start index
"""


from typing import Tuple


def index_range(page: int, page_size: int) -> tuple:
    """
    This module takes two integers: page and page_size

    Return a tuple size two conatining a start index and an index
    correspondiign to the range of indexes to return a list for those
    particular pagination parameters.

    Page numbers are 1-indexed, i.e the first page is page one
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size

    return (start_index, end_index)
